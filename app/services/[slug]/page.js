import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, Check, Target, Users, LifeBuoy } from 'lucide-react'
import { getServiceBySlug, getServices, getSettings } from '@/lib/db'
import PageShell from '@/components/site/PageShell'
import ServiceIcon from '@/components/site/ServiceIcon'
import Reveal from '@/components/site/Reveal'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Service not found' }
  return {
    title: service.title,
    description: service.tagline,
    openGraph: { title: `${service.title} — Infynod Tech`, description: service.tagline },
  }
}

const ENGAGEMENT_MODELS = [
  { icon: Target, title: 'Fixed Scope Project', text: 'A clearly defined scope, a fixed quote and a committed delivery date. Best for well-understood builds and MVPs.' },
  { icon: Users, title: 'Dedicated Team', text: 'A senior squad working as an extension of your team, month over month. Best for evolving products and roadmaps.' },
  { icon: LifeBuoy, title: 'Support & Maintenance', text: 'SLA-backed retainer covering monitoring, fixes, upgrades and small enhancements after launch.' },
]

export default async function ServicePage({ params }) {
  const { slug } = await params
  const [service, allServices, settings] = await Promise.all([getServiceBySlug(slug), getServices(), getSettings()])
  if (!service) notFound()

  const others = (allServices || []).filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <PageShell>
      <article className="pb-24" data-testid="service-detail">
        {/* Hero */}
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Link href="/#services" className="hover:text-foreground transition-colors">Services</Link>
                <span>/</span>
                <span className="text-foreground font-medium">{service.title}</span>
              </div>
              <div className="mt-8 w-14 h-14 rounded-2xl gold-bg text-white flex items-center justify-center">
                <ServiceIcon name={service.icon} size={26} />
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight" data-testid="service-title">
                {service.title}
              </h1>
              <p className="mt-4 text-xl text-amber-800/90 font-medium">{service.tagline}</p>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-foreground/75">{service.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="pill gold-bg text-white font-semibold px-7 py-3.5 inline-flex items-center gap-2 hover:opacity-90 transition-opacity gold-glow" data-testid="service-cta">
                  Discuss your project <ArrowRight size={16} />
                </Link>
                <a href={`tel:${(settings?.phone || '').replace(/\s/g, '')}`} className="pill border border-foreground/20 font-semibold px-7 py-3.5 hover:bg-secondary transition-colors">
                  Call {settings?.phone}
                </a>
              </div>
            </div>

            {/* Image + Outcomes */}
            <div className="lg:col-span-5 space-y-6">
              {service.image_url && (
                <div className="card-22 img-zoom overflow-hidden border-[5px] border-white shadow-2xl gold-glow" data-testid="service-image">
                  <img src={service.image_url} alt={service.title} className="w-full h-56 md:h-64 object-cover" />
                </div>
              )}
              {(service.outcomes || []).length > 0 && (
                <div className="card-22 bg-[#0d0c09] text-white p-8 md:p-9 gold-glow" data-testid="service-outcomes">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-amber-400/90">What you get</p>
                  <ul className="mt-6 space-y-4">
                    {service.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 rounded-full gold-bg flex items-center justify-center shrink-0">
                          <Check size={12} strokeWidth={3} className="text-white" />
                        </span>
                        <span className="text-sm leading-relaxed text-white/85">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="container mt-20">
          <h2 className="text-2xl md:text-3xl font-semibold">What&apos;s <span className="gold-text">included</span></h2>
          <div className="mt-7 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(service.features || []).map((f, i) => (
              <Reveal key={f} delay={i * 60}>
                <div className="card-22 hover-lift bg-white border border-border p-6 flex items-start gap-3 h-full">
                  <CheckCircle2 size={19} className="text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium leading-relaxed">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Tools */}
        {(service.tools || []).length > 0 && (
          <div className="container mt-20" data-testid="service-tools">
            <h2 className="text-2xl md:text-3xl font-semibold">Tools & <span className="gold-text">technologies</span></h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {service.tools.map((t) => (
                <span key={t} className="pill bg-white border border-border px-5 py-2.5 text-sm font-medium hover:border-amber-500/50 transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Engagement models */}
        <div className="container mt-20" data-testid="service-engagement">
          <h2 className="text-2xl md:text-3xl font-semibold">How we <span className="gold-text">work together</span></h2>
          <div className="mt-7 grid md:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((m, i) => {
              const Icon = m.icon
              return (
                <Reveal key={m.title} delay={i * 80}>
                  <div className="card-22 hover-lift bg-white border border-border p-8 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-accent text-amber-700 flex items-center justify-center">
                      <Icon size={21} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{m.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* Other services */}
        {others.length > 0 && (
          <div className="container mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold">Other <span className="gold-text">services</span></h2>
            <div className="mt-7 grid md:grid-cols-3 gap-6">
              {others.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group card-22 hover-lift bg-white border border-border p-7 block hover:border-amber-500/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl gold-bg text-white flex items-center justify-center">
                    <ServiceIcon name={s.icon} size={18} />
                  </div>
                  <h3 className="mt-4 font-semibold group-hover:gold-text transition-all">{s.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{s.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA banner */}
        <div className="container mt-20">
          <div className="card-22 bg-[#0d0c09] text-white p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">Ready to start with <span className="gold-text">{service.title}?</span></h2>
            <p className="mt-3 text-white/60 max-w-md mx-auto">Tell us where you are today — we will map the fastest, safest route to launch.</p>
            <Link href="/contact" className="mt-8 pill gold-bg text-white font-semibold px-8 py-3.5 inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
              Get a free consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  )
}
