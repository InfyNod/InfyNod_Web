'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from './Logo'

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-xl border-b border-border shadow-sm' : 'bg-transparent'
      }`}
      data-testid="main-nav"
    >
      <div className="container flex items-center justify-between h-16 md:h-[72px]">
        <Link href="/" aria-label="Infynod home" data-testid="nav-logo">
          <Logo size={32} />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              data-testid={`nav-link-${l.label.toLowerCase()}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="pill gold-bg text-white text-sm font-semibold px-5 py-2.5 inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity gold-glow"
            data-testid="nav-cta"
          >
            Start a project <ArrowRight size={15} />
          </Link>
        </nav>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-border px-6 pb-6 pt-2 space-y-1" data-testid="nav-mobile-menu">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-base font-medium text-foreground/80"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="pill gold-bg text-white text-sm font-semibold px-5 py-3 inline-flex items-center gap-1.5 mt-2"
          >
            Start a project <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </header>
  )
}
