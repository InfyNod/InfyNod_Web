import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { ensureSeeded } from '@/lib/db'
import { signToken, getAuthUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const CRUD_COLLECTIONS = ['services', 'projects', 'team', 'jobs', 'blog', 'settings', 'leads', 'testimonials', 'faqs', 'process_steps']

function json(data, status = 200) {
  return NextResponse.json(data, { status })
}

function requireAdmin(request) {
  const user = getAuthUser(request)
  if (!user || user.role !== 'admin') return null
  return user
}

// ---- simple in-memory IP rate limiter for lead submissions ----
const rateMap = new Map()
function rateLimited(ip) {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000
  const entry = rateMap.get(ip) || []
  const recent = entry.filter((t) => now - t < windowMs)
  if (recent.length >= 5) {
    rateMap.set(ip, recent)
    return true
  }
  recent.push(now)
  rateMap.set(ip, recent)
  return false
}

function getIp(request) {
  return (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
}

export async function GET(request, { params }) {
  try {
    const { path = [] } = await params
    const db = await ensureSeeded()
    const [root, id] = path

    if (!root) return json({ message: 'Infynod API v1' })

    if (root === 'auth' && id === 'me') {
      const user = getAuthUser(request)
      if (!user) return json({ error: 'Unauthorized' }, 401)
      return json({ user })
    }

    if (CRUD_COLLECTIONS.includes(root)) {
      const admin = requireAdmin(request)

      if (root === 'leads') {
        if (!admin) return json({ error: 'Unauthorized' }, 401)
        const leads = await db.collection('leads').find({}, { projection: { _id: 0 } }).sort({ created_at: -1 }).toArray()
        return json({ items: leads })
      }

      if (root === 'settings') {
        const doc = await db.collection('settings').findOne({}, { projection: { _id: 0 } })
        return json({ item: doc })
      }

      // Public gets only active/published; admin gets everything
      let filter = {}
      if (!admin) {
        if (root === 'services') filter = { active: true }
        if (root === 'blog') filter = { published: true }
        if (root === 'jobs') filter = { status: 'open' }
      }
      let sort = { order: 1 }
      if (root === 'blog' || root === 'jobs') sort = { created_at: -1 }

      if (id) {
        const doc = await db.collection(root).findOne({ $or: [{ id }, { slug: id }], ...filter }, { projection: { _id: 0 } })
        if (!doc) return json({ error: 'Not found' }, 404)
        return json({ item: doc })
      }
      const items = await db.collection(root).find(filter, { projection: { _id: 0 } }).sort(sort).toArray()
      return json({ items })
    }

    return json({ error: 'Not found' }, 404)
  } catch (e) {
    console.error('GET error:', e)
    return json({ error: 'Server error' }, 500)
  }
}

export async function POST(request, { params }) {
  try {
    const { path = [] } = await params
    const db = await ensureSeeded()
    const [root, sub] = path
    const body = await request.json().catch(() => ({}))

    // ---- AUTH ----
    if (root === 'auth' && sub === 'login') {
      const { email, password } = body
      if (!email || !password) return json({ error: 'Email and password required' }, 400)
      const user = await db.collection('users').findOne({ email: String(email).toLowerCase().trim() })
      if (!user || !bcrypt.compareSync(password, user.password_hash)) {
        return json({ error: 'Invalid credentials' }, 401)
      }
      const token = signToken(user)
      return json({ token, user: { id: user.id, email: user.email, role: user.role } })
    }

    if (root === 'auth' && sub === 'change-password') {
      const admin = requireAdmin(request)
      if (!admin) return json({ error: 'Unauthorized' }, 401)
      const { current_password, new_password } = body
      if (!new_password || new_password.length < 8) return json({ error: 'New password must be at least 8 characters' }, 400)
      const user = await db.collection('users').findOne({ id: admin.id })
      if (!user || !bcrypt.compareSync(current_password || '', user.password_hash)) {
        return json({ error: 'Current password is incorrect' }, 401)
      }
      await db.collection('users').updateOne({ id: admin.id }, { $set: { password_hash: bcrypt.hashSync(new_password, 10) } })
      return json({ success: true })
    }

    // ---- PUBLIC LEAD SUBMISSION ----
    if (root === 'leads') {
      // Honeypot: if hidden field filled, pretend success silently
      if (body.website) return json({ success: true })

      const ip = getIp(request)
      if (rateLimited(ip)) return json({ error: 'Too many requests. Please try again later.' }, 429)

      const name = String(body.name || '').trim()
      const email = String(body.email || '').trim()
      const message = String(body.message || '').trim()
      if (name.length < 2) return json({ error: 'Please enter your name' }, 400)
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Please enter a valid email' }, 400)
      if (message.length < 10) return json({ error: 'Message should be at least 10 characters' }, 400)

      const lead = {
        id: uuidv4(),
        name,
        company: String(body.company || '').trim(),
        email,
        phone: String(body.phone || '').trim(),
        requirement: String(body.requirement || '').trim(),
        message,
        planner_selections: body.planner_selections || null,
        status: 'new',
        ip,
        created_at: new Date().toISOString(),
      }
      await db.collection('leads').insertOne(lead)
      return json({ success: true, id: lead.id }, 201)
    }

    // ---- ADMIN CRUD CREATE ----
    if (CRUD_COLLECTIONS.includes(root)) {
      const admin = requireAdmin(request)
      if (!admin) return json({ error: 'Unauthorized' }, 401)
      const doc = { ...body, id: uuidv4(), created_at: new Date().toISOString() }
      delete doc._id
      await db.collection(root).insertOne(doc)
      const { _id, ...clean } = doc
      return json({ item: clean }, 201)
    }

    return json({ error: 'Not found' }, 404)
  } catch (e) {
    console.error('POST error:', e)
    return json({ error: 'Server error' }, 500)
  }
}

export async function PUT(request, { params }) {
  try {
    const { path = [] } = await params
    const db = await ensureSeeded()
    const [root, id] = path
    const admin = requireAdmin(request)
    if (!admin) return json({ error: 'Unauthorized' }, 401)
    if (!CRUD_COLLECTIONS.includes(root)) return json({ error: 'Not found' }, 404)

    const body = await request.json().catch(() => ({}))
    delete body._id
    delete body.id

    if (root === 'settings' && !id) {
      await db.collection('settings').updateOne({}, { $set: body }, { upsert: true })
      const doc = await db.collection('settings').findOne({}, { projection: { _id: 0 } })
      return json({ item: doc })
    }

    if (!id) return json({ error: 'ID required' }, 400)
    const result = await db.collection(root).updateOne({ id }, { $set: body })
    if (result.matchedCount === 0) return json({ error: 'Not found' }, 404)
    const doc = await db.collection(root).findOne({ id }, { projection: { _id: 0 } })
    return json({ item: doc })
  } catch (e) {
    console.error('PUT error:', e)
    return json({ error: 'Server error' }, 500)
  }
}

export async function DELETE(request, { params }) {
  try {
    const { path = [] } = await params
    const db = await ensureSeeded()
    const [root, id] = path
    const admin = requireAdmin(request)
    if (!admin) return json({ error: 'Unauthorized' }, 401)
    if (!CRUD_COLLECTIONS.includes(root) || !id) return json({ error: 'Not found' }, 404)
    const result = await db.collection(root).deleteOne({ id })
    if (result.deletedCount === 0) return json({ error: 'Not found' }, 404)
    return json({ success: true })
  } catch (e) {
    console.error('DELETE error:', e)
    return json({ error: 'Server error' }, 500)
  }
}
