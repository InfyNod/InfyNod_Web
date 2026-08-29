import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { getServiceBySlug, getServices } from '@/lib/db'
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

export default async function ServicePage({ params }) {
  const { slug } = await params
  const [service, allServices] = await Promise.all([getServiceBySlug(slug), getServices()])
  if (!service) notFound()

  const others = (allServices || []).filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <PageShell>
      <article className="container pb-24" data-testid="service-detail">
        <div className="max-w-3xl">
          <div className="w-14 h-14 rounded-2xl gold-bg text-white flex items-center justify-center">
            <ServiceIcon name={service.icon} size={26} />
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight" data-testid="service-title">
            {service.title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">{service.tagline}</p>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">{service.description}</p>
          <Link href="/contact" className="pill gold-bg text-white font-semibold px-7 py-3.5 inline-flex items-center gap-2 mt-8 hover:opacity-90 transition-opacity gold-glow" data-testid="service-cta">
            Discuss your project <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold">What&apos;s included</h2>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(service.features || []).map((f, i) => (
              <Reveal key={f} delay={i * 60}>
                <div className="card-22 bg-white border border-border p-6 flex items-start gap-3 h-full">
                  <CheckCircle2 size={19} className="text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-semibold">Other services</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              {others.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group card-22 bg-white border border-border p-7 block hover:border-amber-500/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl gold-bg text-white flex items-center justify-center">
                    <ServiceIcon name={s.icon} size={18} />
                  </div>
                  <h3 className="mt-4 font-semibold group-hover:gold-text transition-all">{s.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{s.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageShell>
  )
}
