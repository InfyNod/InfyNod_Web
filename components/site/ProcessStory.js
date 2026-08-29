'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Search, PenTool, Hammer, Rocket, TrendingUp } from 'lucide-react'

const STEPS = [
  { icon: Search, title: 'Discover', text: 'We start with a deep-dive workshop — your goals, users, constraints and success metrics. You get a clear scope document and technical blueprint before any code is written.' },
  { icon: PenTool, title: 'Design', text: 'Wireframes become clickable prototypes within days. We test flows with real users and lock a pixel-perfect design system your product can grow with.' },
  { icon: Hammer, title: 'Build', text: 'Weekly sprints, weekly demos. You watch the product take shape in a staging environment — no black boxes, no surprises at the end.' },
  { icon: Rocket, title: 'Launch', text: 'Hardening, performance passes, analytics and error tracking wired in. We ship to production with rollback plans and zero-drama deployments.' },
  { icon: TrendingUp, title: 'Scale', text: 'Post-launch, we monitor, iterate and optimise. New features ship on a predictable cadence while infrastructure scales with your traffic.' },
]

export default function ProcessStory() {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.step)
            setActive((prev) => Math.max(prev, idx))
          }
        })
      },
      { threshold: 0.5, rootMargin: '-20% 0px -30% 0px' }
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="grid md:grid-cols-12 gap-10 md:gap-16" data-testid="process-story">
      <div className="md:col-span-4">
        <div className="md:sticky md:top-28">
          <p className="section-tag text-amber-700">04 — Process</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">
            How an idea becomes a <span className="gold-text">shipped product</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
            A transparent, five-stage journey. Scroll through — each stage lights up as you go.
          </p>
          <div className="mt-8 hidden md:block">
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full gold-bg rounded-full transition-all duration-700"
                style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
              Stage {active + 1} / {STEPS.length}
            </p>
          </div>
        </div>
      </div>

      <div className="md:col-span-8 space-y-6">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const isActive = i <= active
          return (
            <div
              key={s.title}
              ref={(el) => (refs.current[i] = el)}
              data-step={i}
              className={`card-22 border p-7 md:p-9 transition-all duration-700 ${
                isActive ? 'bg-white border-amber-500/40 gold-glow' : 'bg-secondary/50 border-border opacity-60'
              }`}
              data-testid={`process-step-${i + 1}`}
            >
              <div className="flex items-start gap-5">
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${isActive ? 'gold-bg text-white' : 'bg-muted text-muted-foreground'}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>STAGE 0{i + 1}</p>
                  <h3 className="mt-1 text-xl md:text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
