'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Inbox, Layers, FolderKanban, Users, Briefcase, FileText, Settings as SettingsIcon, LogOut, Plus, Pencil, Trash2, X, Loader2, ChevronDown, ChevronUp, Quote, HelpCircle, ListOrdered } from 'lucide-react'
import Logo from '@/components/site/Logo'

// ---------- collection field configs ----------
const CONFIGS = {
  services: {
    label: 'Services', icon: Layers,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'features', label: 'Features (one per line)', type: 'array' },
      { key: 'tools', label: 'Tools & technologies (one per line)', type: 'array' },
      { key: 'outcomes', label: 'Outcomes / What you get (one per line)', type: 'array' },
      { key: 'icon', label: 'Icon (code/globe/smartphone/pen/cloud/sparkles)', type: 'text' },
      { key: 'image_url', label: 'Page image URL', type: 'text' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'active', label: 'Active', type: 'checkbox' },
    ],
    columns: ['title', 'slug', 'order', 'active'],
  },
  projects: {
    label: 'Projects', icon: FolderKanban,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug (for case study URL, e.g. finsight)', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'industry', label: 'Industry', type: 'text' },
      { key: 'duration', label: 'Duration (e.g. 10 weeks)', type: 'text' },
      { key: 'description', label: 'Short description', type: 'textarea' },
      { key: 'challenge', label: 'Case study — The Challenge', type: 'textarea' },
      { key: 'solution', label: 'Case study — Our Solution', type: 'textarea' },
      { key: 'results', label: 'Case study — Results (one per line)', type: 'array' },
      { key: 'tech', label: 'Tech stack (one per line)', type: 'array' },
      { key: 'external_link', label: 'External link', type: 'text' },
      { key: 'image_url', label: 'Image URL', type: 'text' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    columns: ['title', 'category', 'order'],
  },
  team: {
    label: 'Team', icon: Users,
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'bio', label: 'Bio', type: 'textarea' },
      { key: 'image_url', label: 'Image URL', type: 'text' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    columns: ['name', 'role', 'order'],
  },
  jobs: {
    label: 'Jobs', icon: Briefcase,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'type', label: 'Type (Full-time / Contract)', type: 'text' },
      { key: 'experience', label: 'Experience', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'apply_email', label: 'Apply email', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['open', 'closed'] },
    ],
    columns: ['title', 'location', 'status'],
  },
  blog: {
    label: 'Blog', icon: FileText,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { key: 'content', label: 'Content (paragraphs separated by blank line)', type: 'textarea', rows: 10 },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'published', label: 'Published', type: 'checkbox' },
    ],
    columns: ['title', 'slug', 'published'],
  },
  testimonials: {
    label: 'Testimonials', icon: Quote,
    fields: [
      { key: 'quote', label: 'Quote', type: 'textarea' },
      { key: 'name', label: 'Name / Designation', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    columns: ['name', 'company', 'order'],
  },
  faqs: {
    label: 'FAQs', icon: HelpCircle,
    fields: [
      { key: 'question', label: 'Question', type: 'text' },
      { key: 'answer', label: 'Answer', type: 'textarea' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    columns: ['question', 'order'],
  },
  process_steps: {
    label: 'Process Steps', icon: ListOrdered,
    fields: [
      { key: 'title', label: 'Stage title', type: 'text' },
      { key: 'text', label: 'Stage description', type: 'textarea' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    columns: ['title', 'order'],
  },
}

const TABS = [
  { key: 'leads', label: 'Leads', icon: Inbox },
  ...Object.entries(CONFIGS).map(([key, c]) => ({ key, label: c.label, icon: c.icon })),
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
]

const inputCls = 'w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition-shadow'

function api(path, { method = 'GET', body, token } = {}) {
  return fetch(`/api/${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  }).then(async (res) => {
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
    return data
  })
}

// ---------- Login ----------
function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await api('auth/login', { method: 'POST', body: { email, password } })
      onLogin(data.token, data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="card-22 bg-white border border-border p-8 w-full max-w-sm gold-glow" data-testid="admin-login-form">
        <div className="flex justify-center"><Logo size={36} /></div>
        <h1 className="mt-5 text-xl font-semibold text-center">Admin Panel</h1>
        <p className="mt-1 text-xs text-muted-foreground text-center">Sign in to manage your website</p>
        <div className="mt-6 space-y-3">
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} data-testid="admin-email" />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} data-testid="admin-password" />
        </div>
        {error && <p className="mt-3 text-xs text-destructive" data-testid="admin-login-error">{error}</p>}
        <button type="submit" disabled={loading} className="mt-5 w-full pill gold-bg text-white font-semibold py-3 inline-flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60" data-testid="admin-login-submit">
          {loading && <Loader2 size={15} className="animate-spin" />} Sign in
        </button>
      </form>
    </div>
  )
}

// ---------- Leads ----------
function LeadsPanel({ token, onAuthError }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  const load = useCallback(async () => {
    try {
      const data = await api('leads', { token })
      setLeads(data.items || [])
    } catch (e) {
      if (String(e.message).includes('Unauthorized')) onAuthError()
    } finally {
      setLoading(false)
    }
  }, [token, onAuthError])

  useEffect(() => { load() }, [load])

  const setStatus = async (id, status) => {
    await api(`leads/${id}`, { method: 'PUT', token, body: { status } })
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
  }

  const remove = async (id) => {
    if (!confirm('Delete this lead?')) return
    await api(`leads/${id}`, { method: 'DELETE', token })
    setLeads((prev) => prev.filter((l) => l.id !== id))
  }

  if (loading) return <div className="p-10 text-center text-muted-foreground"><Loader2 className="animate-spin mx-auto" /></div>

  return (
    <div data-testid="admin-leads-panel">
      <h2 className="text-xl font-semibold mb-1">Leads</h2>
      <p className="text-xs text-muted-foreground mb-5">{leads.length} enquiries · newest first</p>
      {leads.length === 0 && <div className="card-22 bg-white border border-border p-10 text-center text-sm text-muted-foreground" data-testid="admin-leads-empty">No leads yet. They will appear here when someone submits the contact form.</div>}
      <div className="space-y-3">
        {leads.map((l) => (
          <div key={l.id} className="card-22 bg-white border border-border p-5" data-testid={`admin-lead-${l.id}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-sm">{l.name} {l.company ? <span className="text-muted-foreground font-normal">· {l.company}</span> : null}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{l.email}{l.phone ? ` · ${l.phone}` : ''} · {new Date(l.created_at).toLocaleString('en-IN')}</p>
              </div>
              <div className="flex items-center gap-2">
                <select value={l.status} onChange={(e) => setStatus(l.id, e.target.value)} className="text-xs rounded-lg border border-input px-2 py-1.5 bg-white" data-testid={`lead-status-${l.id}`}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                <button onClick={() => setExpanded(expanded === l.id ? null : l.id)} className="p-1.5 rounded-lg hover:bg-secondary" data-testid={`lead-expand-${l.id}`}>
                  {expanded === l.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
                <button onClick={() => remove(l.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-destructive"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-[11px] bg-accent text-amber-800 px-2 py-0.5 rounded-full font-medium">{l.requirement || 'General'}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${l.status === 'new' ? 'bg-amber-100 text-amber-800' : l.status === 'contacted' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>{l.status}</span>
            </div>
            {expanded === l.id && (
              <div className="mt-4 pt-4 border-t border-border text-sm">
                <p className="whitespace-pre-wrap text-foreground/80">{l.message}</p>
                {l.planner_selections && (
                  <div className="mt-3 text-xs bg-secondary rounded-xl p-3">
                    <p className="font-semibold mb-1">Planner selections</p>
                    <p>Type: {l.planner_selections.type} · Scale: {l.planner_selections.scale} · Est: {l.planner_selections.timeline_estimate}</p>
                    <p>Features: {(l.planner_selections.features || []).join(', ') || 'None'}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------- Generic CRUD ----------
function CrudPanel({ collection, token, onAuthError }) {
  const config = CONFIGS[collection]
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null | {} (new) | item
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api(collection, { token })
      setItems(data.items || [])
    } catch (e) {
      if (String(e.message).includes('Unauthorized')) onAuthError()
    } finally {
      setLoading(false)
    }
  }, [collection, token, onAuthError])

  useEffect(() => { load() }, [load])

  const openForm = (item) => {
    const init = {}
    config.fields.forEach((f) => {
      let v = item ? item[f.key] : undefined
      if (f.type === 'array') v = Array.isArray(v) ? v.join('\n') : ''
      if (f.type === 'checkbox') v = item ? !!v : true
      if (v === undefined || v === null) v = f.type === 'number' ? '' : f.type === 'checkbox' ? true : ''
      init[f.key] = v
    })
    setForm(init)
    setEditing(item || {})
    setError('')
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const body = {}
    config.fields.forEach((f) => {
      let v = form[f.key]
      if (f.type === 'array') v = String(v).split('\n').map((x) => x.trim()).filter(Boolean)
      if (f.type === 'number') v = Number(v) || 0
      body[f.key] = v
    })
    try {
      if (editing.id) {
        await api(`${collection}/${editing.id}`, { method: 'PUT', token, body })
      } else {
        await api(collection, { method: 'POST', token, body })
      }
      setEditing(null)
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this item?')) return
    await api(`${collection}/${id}`, { method: 'DELETE', token })
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  if (loading) return <div className="p-10 text-center text-muted-foreground"><Loader2 className="animate-spin mx-auto" /></div>

  return (
    <div data-testid={`admin-${collection}-panel`}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold">{config.label}</h2>
          <p className="text-xs text-muted-foreground">{items.length} items</p>
        </div>
        <button onClick={() => openForm(null)} className="pill gold-bg text-white text-sm font-semibold px-4 py-2.5 inline-flex items-center gap-1.5 hover:opacity-90" data-testid={`admin-${collection}-add`}>
          <Plus size={15} /> Add new
        </button>
      </div>

      <div className="card-22 bg-white border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60">
              {config.columns.map((c) => (
                <th key={c} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{c}</th>
              ))}
              <th className="px-5 py-3 w-24" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                {config.columns.map((c) => (
                  <td key={c} className="px-5 py-3.5">
                    {typeof item[c] === 'boolean' ? (
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${item[c] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{item[c] ? 'Yes' : 'No'}</span>
                    ) : (
                      <span className="line-clamp-1">{String(item[c] ?? '')}</span>
                    )}
                  </td>
                ))}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => openForm(item)} className="p-1.5 rounded-lg hover:bg-secondary" data-testid={`edit-${collection}-${item.id}`}><Pencil size={14} /></button>
                    <button onClick={() => remove(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-destructive"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="card-22 bg-white p-7 w-full max-w-lg max-h-[85vh] overflow-y-auto" data-testid={`admin-${collection}-form`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">{editing.id ? 'Edit' : 'New'} {config.label.slice(0, -1)}</h3>
              <button type="button" onClick={() => setEditing(null)} className="p-1.5 rounded-lg hover:bg-secondary"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              {config.fields.map((f) => (
                <div key={f.key}>
                  <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">{f.label}</label>
                  {f.type === 'textarea' || f.type === 'array' ? (
                    <textarea rows={f.rows || 4} value={form[f.key]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))} className={inputCls} data-testid={`field-${f.key}`} />
                  ) : f.type === 'checkbox' ? (
                    <input type="checkbox" checked={!!form[f.key]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.checked }))} className="w-4 h-4 accent-amber-600" data-testid={`field-${f.key}`} />
                  ) : f.type === 'select' ? (
                    <select value={form[f.key]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))} className={inputCls} data-testid={`field-${f.key}`}>
                      {(f.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type === 'number' ? 'number' : 'text'} value={form[f.key]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))} className={inputCls} data-testid={`field-${f.key}`} />
                  )}
                </div>
              ))}
            </div>
            {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
            <button type="submit" disabled={saving} className="mt-6 w-full pill gold-bg text-white font-semibold py-3 inline-flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60" data-testid={`admin-${collection}-save`}>
              {saving && <Loader2 size={15} className="animate-spin" />} Save
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

// ---------- Settings ----------
function SettingsPanel({ token, onAuthError }) {
  const [form, setForm] = useState({ phone: '', hr_phone: '', email: '', address: '', hero_tag: '', hero_heading: '', hero_highlight: '', hero_subtext: '', industries: '', tech_stack: '', stats: '' })
  const [pw, setPw] = useState({ current_password: '', new_password: '' })
  const [msg, setMsg] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('settings', { token })
      .then((d) => {
        if (d.item) {
          setForm({
            phone: d.item.phone || '',
            hr_phone: d.item.hr_phone || '',
            email: d.item.email || '',
            address: d.item.address || '',
            hero_tag: d.item.hero_tag || '',
            hero_heading: d.item.hero_heading || '',
            hero_highlight: d.item.hero_highlight || '',
            hero_subtext: d.item.hero_subtext || '',
            industries: (d.item.industries || []).join('\n'),
            tech_stack: (d.item.tech_stack || []).join('\n'),
            stats: (d.item.stats || []).map((s) => `${s.value} | ${s.label}`).join('\n'),
          })
        }
      })
      .catch((e) => { if (String(e.message).includes('Unauthorized')) onAuthError() })
      .finally(() => setLoading(false))
  }, [token, onAuthError])

  const save = async (e) => {
    e.preventDefault()
    setMsg('')
    const toLines = (s) => String(s).split('\n').map((x) => x.trim()).filter(Boolean)
    const body = {
      phone: form.phone,
      hr_phone: form.hr_phone,
      email: form.email,
      address: form.address,
      hero_tag: form.hero_tag,
      hero_heading: form.hero_heading,
      hero_highlight: form.hero_highlight,
      hero_subtext: form.hero_subtext,
      industries: toLines(form.industries),
      tech_stack: toLines(form.tech_stack),
      stats: toLines(form.stats).map((line) => {
        const [value, ...rest] = line.split('|')
        return { value: (value || '').trim(), label: rest.join('|').trim() }
      }).filter((s) => s.value && s.label),
    }
    try {
      await api('settings', { method: 'PUT', token, body })
      setMsg('Settings saved!')
    } catch (err) { setMsg(err.message) }
  }

  const changePw = async (e) => {
    e.preventDefault()
    setPwMsg('')
    try {
      await api('auth/change-password', { method: 'POST', token, body: pw })
      setPwMsg('Password changed successfully!')
      setPw({ current_password: '', new_password: '' })
    } catch (err) { setPwMsg(err.message) }
  }

  if (loading) return <div className="p-10 text-center text-muted-foreground"><Loader2 className="animate-spin mx-auto" /></div>

  return (
    <div className="max-w-2xl space-y-8" data-testid="admin-settings-panel">
      <form onSubmit={save} className="card-22 bg-white border border-border p-7">
        <h2 className="text-lg font-semibold mb-1">Contact details</h2>
        <p className="text-xs text-muted-foreground mb-5">Shown in header, footer and contact sections</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Phone (business)</label>
            <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} className={inputCls} data-testid="settings-phone" />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">HR & Careers phone</label>
            <input value={form.hr_phone} onChange={(e) => setForm((p) => ({ ...p, hr_phone: e.target.value }))} className={inputCls} data-testid="settings-hr-phone" />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Email</label>
            <input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={inputCls} data-testid="settings-email" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Address</label>
            <input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} className={inputCls} data-testid="settings-address" />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-1 mt-8">Home hero section</h2>
        <p className="text-xs text-muted-foreground mb-5">Main heading area on the home page</p>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Small tag line (above heading)</label>
            <input value={form.hero_tag} onChange={(e) => setForm((p) => ({ ...p, hero_tag: e.target.value }))} className={inputCls} data-testid="settings-hero-tag" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Heading (black part)</label>
              <input value={form.hero_heading} onChange={(e) => setForm((p) => ({ ...p, hero_heading: e.target.value }))} className={inputCls} data-testid="settings-hero-heading" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Heading highlight (gold part)</label>
              <input value={form.hero_highlight} onChange={(e) => setForm((p) => ({ ...p, hero_highlight: e.target.value }))} className={inputCls} data-testid="settings-hero-highlight" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Sub-text (below heading)</label>
            <textarea rows={3} value={form.hero_subtext} onChange={(e) => setForm((p) => ({ ...p, hero_subtext: e.target.value }))} className={inputCls} data-testid="settings-hero-subtext" />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-1 mt-8">Home page lists</h2>
        <p className="text-xs text-muted-foreground mb-5">One item per line</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Industries (scrolling bar)</label>
            <textarea rows={8} value={form.industries} onChange={(e) => setForm((p) => ({ ...p, industries: e.target.value }))} className={inputCls} data-testid="settings-industries" />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Tech stack — format: Category | item1, item2 (one category per line)</label>
            <textarea rows={8} value={form.tech_stack} onChange={(e) => setForm((p) => ({ ...p, tech_stack: e.target.value }))} className={inputCls} data-testid="settings-tech-stack" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Stats — format: value | label (e.g. 50+ | Projects shipped)</label>
            <textarea rows={4} value={form.stats} onChange={(e) => setForm((p) => ({ ...p, stats: e.target.value }))} className={inputCls} data-testid="settings-stats" />
          </div>
        </div>

        {msg && <p className="mt-4 text-xs text-amber-700" data-testid="settings-msg">{msg}</p>}
        <button type="submit" className="mt-5 pill gold-bg text-white text-sm font-semibold px-6 py-2.5 hover:opacity-90" data-testid="settings-save">Save settings</button>
      </form>

      <form onSubmit={changePw} className="card-22 bg-white border border-border p-7">
        <h2 className="text-lg font-semibold mb-5">Change password</h2>
        <div className="space-y-4">
          <input type="password" required placeholder="Current password" value={pw.current_password} onChange={(e) => setPw((p) => ({ ...p, current_password: e.target.value }))} className={inputCls} data-testid="pw-current" />
          <input type="password" required placeholder="New password (min 8 chars)" value={pw.new_password} onChange={(e) => setPw((p) => ({ ...p, new_password: e.target.value }))} className={inputCls} data-testid="pw-new" />
        </div>
        {pwMsg && <p className="mt-3 text-xs text-amber-700" data-testid="pw-msg">{pwMsg}</p>}
        <button type="submit" className="mt-5 pill bg-foreground text-white text-sm font-semibold px-6 py-2.5 hover:opacity-90" data-testid="pw-save">Update password</button>
      </form>
    </div>
  )
}

// ---------- Main ----------
function App() {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [tab, setTab] = useState('leads')

  useEffect(() => {
    const t = localStorage.getItem('infynod_admin_token')
    if (t) setToken(t)
    setReady(true)
  }, [])

  const onLogin = (t) => {
    localStorage.setItem('infynod_admin_token', t)
    setToken(t)
  }

  const logout = useCallback(() => {
    localStorage.removeItem('infynod_admin_token')
    setToken(null)
  }, [])

  if (!ready) return null
  if (!token) return <Login onLogin={onLogin} />

  return (
    <div className="min-h-screen bg-background flex" data-testid="admin-dashboard">
      <aside className="w-60 shrink-0 bg-[#0d0c09] text-white flex flex-col fixed inset-y-0">
        <div className="px-5 py-6 border-b border-white/10">
          <Logo size={28} dark={false} />
          <p className="mt-1.5 text-[10px] text-white/40 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>Admin Panel</p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {TABS.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === t.key ? 'gold-bg text-white' : 'text-white/55 hover:text-white hover:bg-white/5'}`}
                data-testid={`admin-tab-${t.key}`}
              >
                <Icon size={16} /> {t.label}
              </button>
            )
          })}
        </nav>
        <button onClick={logout} className="m-3 flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-colors" data-testid="admin-logout">
          <LogOut size={16} /> Logout
        </button>
      </aside>

      <main className="flex-1 ml-60 p-8 md:p-10">
        {tab === 'leads' && <LeadsPanel token={token} onAuthError={logout} />}
        {tab === 'settings' && <SettingsPanel token={token} onAuthError={logout} />}
        {CONFIGS[tab] && <CrudPanel key={tab} collection={tab} token={token} onAuthError={logout} />}
      </main>
    </div>
  )
}

export default App;
