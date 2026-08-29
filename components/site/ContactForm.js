'use client'

import React, { useState, useEffect } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'

const REQUIREMENTS = [
  'General inquiry',
  'Custom Software Development',
  'Web & Platform Engineering',
  'Mobile App Development',
  'UI/UX & Product Design',
  'Cloud & DevOps',
  'AI & Automation',
  'Project Planner estimate',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', requirement: 'General inquiry', message: '', website: '' })
  const [planner, setPlanner] = useState(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')

  useEffect(() => {
    const handler = (e) => {
      const d = e.detail
      setPlanner(d)
      setForm((prev) => ({
        ...prev,
        requirement: 'Project Planner estimate',
        message: `Hi, I used the project planner.\nProject: ${d.type} (${d.scale})\nFeatures: ${d.features.join(', ') || 'None selected'}\nEstimated timeline: ${d.timeline_estimate}\n\nPlease get back to me with next steps.`,
      }))
    }
    window.addEventListener('infynod-planner', handler)
    return () => window.removeEventListener('infynod-planner', handler)
  }, [])

  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, planner_selections: planner }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  if (status === 'success') {
    return (
      <div className="card-22 bg-white border border-border p-10 text-center" data-testid="contact-success">
        <CheckCircle2 size={48} className="mx-auto text-amber-600" />
        <h3 className="mt-4 text-2xl font-semibold">Message received!</h3>
        <p className="mt-2 text-muted-foreground">Thank you for reaching out. Our team will get back to you within 1 business day.</p>
      </div>
    )
  }

  const inputCls = 'w-full rounded-xl border border-input bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition-shadow placeholder:text-muted-foreground/60'

  return (
    <form onSubmit={submit} className="card-22 bg-white border border-border p-6 md:p-8 space-y-4" data-testid="contact-form">
      {/* Honeypot — hidden from humans */}
      <input type="text" name="website" value={form.website} onChange={set('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Full name *</label>
          <input required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} data-testid="contact-name" />
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Company</label>
          <input value={form.company} onChange={set('company')} placeholder="Company name" className={inputCls} data-testid="contact-company" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Email *</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputCls} data-testid="contact-email" />
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Phone</label>
          <input value={form.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" className={inputCls} data-testid="contact-phone" />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">What do you need? *</label>
        <select value={form.requirement} onChange={set('requirement')} className={inputCls} data-testid="contact-requirement">
          {REQUIREMENTS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Tell us about your project *</label>
        <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="A few lines about what you want to build, timelines and budget expectations…" className={inputCls} data-testid="contact-message" />
      </div>

      {planner && (
        <p className="text-xs text-amber-700 bg-accent rounded-xl px-4 py-2.5" data-testid="contact-planner-note">
          Planner selections attached: {planner.type} · {planner.scale} · est. {planner.timeline_estimate}
        </p>
      )}

      {status === 'error' && (
        <p className="text-sm text-destructive" data-testid="contact-error">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="pill gold-bg text-white font-semibold px-7 py-3.5 inline-flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
        data-testid="contact-submit"
      >
        {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
