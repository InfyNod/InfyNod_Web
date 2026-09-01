import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import Logo from './Logo'

export default function Footer({ settings, services = [] }) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0d0c09] text-white/80 mt-0" data-testid="site-footer">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Logo size={32} dark={false} />
            <p className="mt-5 text-sm leading-relaxed text-white/55 max-w-xs">
              Infynod Tech Private Limited — an IT services and product company from Pune, India. We design, build and scale digital products that move businesses forward.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-white/55 hover:text-amber-300 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-white/55 hover:text-amber-300 transition-colors">About us</Link></li>
              <li><Link href="/careers" className="text-sm text-white/55 hover:text-amber-300 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-sm text-white/55 hover:text-amber-300 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-white/55 hover:text-amber-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Get in touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <Phone size={15} className="mt-0.5 text-amber-400" />
                <a href={`tel:${(settings?.phone || '').replace(/\s/g, '')}`} className="hover:text-amber-300 transition-colors" data-testid="footer-phone">{settings?.phone}</a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <Mail size={15} className="mt-0.5 text-amber-400" />
                <a href={`mailto:${settings?.email}`} className="hover:text-amber-300 transition-colors" data-testid="footer-email">{settings?.email}</a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <MapPin size={30} className="mt-0.5 text-amber-400" />
                <span data-testid="footer-address">{settings?.address}</span>
              </li>
            </ul>
          </div>
        </div>
//ghjgh
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {year} Infynod Tech Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-xs text-white/40 hover:text-amber-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-amber-300 transition-colors">Terms of Service</Link>
            {/* <Link href="/admin" className="text-xs text-white/25 hover:text-white/50 transition-colors">Admin</Link> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
