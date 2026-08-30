import { MongoClient } from 'mongodb'
import { seedDatabase } from './seedData'

let clientPromise = null

function getClient() {
  if (!clientPromise) {
    const client = new MongoClient(process.env.MONGO_URL)
    clientPromise = client.connect()
  }
  return clientPromise
}

export async function getDb() {
  const client = await getClient()
  return client.db(process.env.DB_NAME || 'infynod')
}

let seedPromise = null
export async function ensureSeeded() {
  const db = await getDb()
  if (!seedPromise) {
    seedPromise = (async () => {
      // Atomic lock document prevents double-seeding across parallel requests/processes
      try {
        const lock = await db.collection('meta').findOneAndUpdate(
          { _id: 'seed_lock' },
          { $setOnInsert: { _id: 'seed_lock', seeded_at: new Date().toISOString() } },
          { upsert: true, returnDocument: 'before' }
        )
        const alreadySeeded = lock && (lock.value !== undefined ? lock.value : lock)
        if (!alreadySeeded) {
          const count = await db.collection('users').countDocuments()
          if (count === 0) await seedDatabase(db)
        }
      } catch (e) {
        // Duplicate lock insert race — another process is seeding; ignore
      }
    })()
  }
  await seedPromise
  return db
}

// ---- Public data fetchers used by server components (SSR) ----
export async function getServices() {
  const db = await ensureSeeded()
  return db.collection('services').find({ active: true }, { projection: { _id: 0 } }).sort({ order: 1 }).toArray()
}

export async function getServiceBySlug(slug) {
  const db = await ensureSeeded()
  return db.collection('services').findOne({ slug, active: true }, { projection: { _id: 0 } })
}

export async function getProjects() {
  const db = await ensureSeeded()
  return db.collection('projects').find({}, { projection: { _id: 0 } }).sort({ order: 1 }).toArray()
}

export async function getProjectBySlug(slug) {
  const db = await ensureSeeded()
  return db.collection('projects').findOne({ slug }, { projection: { _id: 0 } })
}

export async function getTeam() {
  const db = await ensureSeeded()
  return db.collection('team').find({}, { projection: { _id: 0 } }).sort({ order: 1 }).toArray()
}

export async function getJobs() {
  const db = await ensureSeeded()
  return db.collection('jobs').find({ status: 'open' }, { projection: { _id: 0 } }).toArray()
}

export async function getBlogPosts(limit = 0) {
  const db = await ensureSeeded()
  let cursor = db.collection('blog').find({ published: true }, { projection: { _id: 0, content: 0 } }).sort({ created_at: -1 })
  if (limit) cursor = cursor.limit(limit)
  return cursor.toArray()
}

export async function getBlogPostBySlug(slug) {
  const db = await ensureSeeded()
  return db.collection('blog').findOne({ slug, published: true }, { projection: { _id: 0 } })
}

export async function getSettings() {
  const db = await ensureSeeded()
  return db.collection('settings').findOne({}, { projection: { _id: 0 } })
}

export async function getTestimonials() {
  const db = await ensureSeeded()
  return db.collection('testimonials').find({}, { projection: { _id: 0 } }).sort({ order: 1 }).toArray()
}

export async function getFaqs() {
  const db = await ensureSeeded()
  return db.collection('faqs').find({}, { projection: { _id: 0 } }).sort({ order: 1 }).toArray()
}

export async function getProcessSteps() {
  const db = await ensureSeeded()
  return db.collection('process_steps').find({}, { projection: { _id: 0 } }).sort({ order: 1 }).toArray()
}
