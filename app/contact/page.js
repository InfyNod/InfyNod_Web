import { Phone, Mail, MapPin } from 'lucide-react'
import { getSettings } from '@/lib/db'
import PageShell from '@/components/site/PageShell'
import ContactForm from '@/components/site/ContactForm'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Infynod Tech — tell us about your project and we will reply within one business day.',
}

export default async function ContactPage() {
  const settings = await getSettings()

  return (
    <PageShell>
      <div className="container pb-24" data-testid="contact-page">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="section-tag text-amber-700">Contact</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
              Tell us about <span className="gold-text">your project</span>
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Share a few details and our team will reply within one business day — usually much faster. Prefer talking? Call or email us directly.
            </p>
            <ul className="mt-9 space-y-4">
              <li className="flex items-center gap-3.5">
                <span className="w-11 h-11 rounded-2xl gold-bg text-white flex items-center justify-center shrink-0"><Phone size={18} /></span>
                <a href={`tel:${(settings?.phone || '').replace(/\s/g, '')}`} className="text-sm font-medium hover:text-amber-700 transition-colors" data-testid="contact-page-phone">{settings?.phone}</a>
              </li>
              <li className="flex items-center gap-3.5">
                <span className="w-11 h-11 rounded-2xl gold-bg text-white flex items-center justify-center shrink-0"><Mail size={18} /></span>
                <a href={`mailto:${settings?.email}`} className="text-sm font-medium hover:text-amber-700 transition-colors" data-testid="contact-page-email">{settings?.email}</a>
              </li>
              <li className="flex items-center gap-3.5">
                <span className="w-11 h-11 rounded-2xl gold-bg text-white flex items-center justify-center shrink-0"><MapPin size={18} /></span>
                <span className="text-sm font-medium" data-testid="contact-page-address">{settings?.address}</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
