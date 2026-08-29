'use client'

import React, { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

const TYPES = [
  { key: 'website', label: 'Business Website', base: 3 },
  { key: 'webapp', label: 'Web App / SaaS', base: 6 },
  { key: 'mobile', label: 'Mobile App', base: 8 },
  { key: 'ai', label: 'AI / Automation', base: 6 },
]

const FEATURES = [
  'Admin dashboard',
  'Payments & billing',
  'User accounts & roles',
  'Third-party integrations',
  'AI features',
  'Analytics & reports',
]

const SCALES = [
  { key: 'mvp', label: 'MVP', mult: 1 },
  { key: 'standard', label: 'Standard', mult: 1.4 },
  { key: 'enterprise', label: 'Enterprise', mult: 2 },
]

export default function Planner() {
  const [type, setType] = useState(TYPES[1])
  const [features, setFeatures] = useState([])
  const [scale, setScale] = useState(SCALES[0])

  const toggleFeature = (f) =>
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))

  const rawWeeks = (type.base + features.length) * scale.mult
  const low = Math.max(2, Math.round(rawWeeks))
  const high = low + Math.max(1, Math.round(low * 0.25))

  const sendToContact = () => {
    const detail = {
      type: type.label,
      features,
      scale: scale.label,
      timeline_estimate: `${low}\u2013${high} weeks`,
    }
    window.dispatchEvent(new CustomEvent('infynod-planner', { detail }))
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="card-22 bg-white border border-border p-6 md:p-10 gold-glow" data-testid="project-planner">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div>
            <p className="text-sm font-semibold mb-3">1. What are you building?</p>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setType(t)}
                  className={`pill px-4 py-2 text-sm font-medium border transition-all ${
                    type.key === t.key ? 'gold-bg text-white border-transparent' : 'bg-secondary text-foreground/70 border-border hover:border-foreground/30'
                  }`}
                  data-testid={`planner-type-${t.key}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">2. Which features do you need?</p>
            <div className="flex flex-wrap gap-2">
              {FEATURES.map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFeature(f)}
                  className={`pill px-4 py-2 text-sm font-medium border transition-all inline-flex items-center gap-1.5 ${
                    features.includes(f) ? 'bg-foreground text-white border-transparent' : 'bg-secondary text-foreground/70 border-border hover:border-foreground/30'
                  }`}
                  data-testid={`planner-feature-${f.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                >
                  {features.includes(f) && <Check size={13} />} {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">3. What stage is this?</p>
            <div className="flex flex-wrap gap-2">
              {SCALES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setScale(s)}
                  className={`pill px-4 py-2 text-sm font-medium border transition-all ${
                    scale.key === s.key ? 'gold-bg text-white border-transparent' : 'bg-secondary text-foreground/70 border-border hover:border-foreground/30'
                  }`}
                  data-testid={`planner-scale-${s.key}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card-22 bg-[#0d0c09] text-white p-8 flex flex-col justify-between">
          <div>
            <p className="section-tag text-amber-400/80">Estimated timeline</p>
            <p className="mt-4 text-5xl md:text-6xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }} data-testid="planner-estimate">
              {low}–{high}
              <span className="text-xl text-white/50 ml-2">weeks</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/60">
              <li>• {type.label} · {scale.label} scope</li>
              <li>• {features.length} feature module{features.length === 1 ? '' : 's'} selected</li>
              <li>• Weekly demos · dedicated team</li>
            </ul>
          </div>
          <button
            onClick={sendToContact}
            className="pill gold-bg text-white font-semibold px-6 py-3.5 mt-8 inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            data-testid="planner-cta"
          >
            Discuss this plan <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
