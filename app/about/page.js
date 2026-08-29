import Link from 'next/link'
import { ArrowRight, Target, Eye, HeartHandshake } from 'lucide-react'
import { getTeam } from '@/lib/db'
import PageShell from '@/components/site/PageShell'
import Reveal from '@/components/site/Reveal'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'About Us',
  description: 'Infynod Tech Private Limited is a Pune-based IT services and product company. Meet the team and learn what drives us.',
}

const VALUES = [
  { icon: Target, title: 'Outcomes over output', text: 'We measure success by the business results our software creates — not by hours billed or lines of code written.' },
  { icon: Eye, title: 'Radical transparency', text: 'Weekly demos, open backlogs and honest timelines. You always know exactly where your project stands.' },
  { icon: HeartHandshake, title: 'Long-term partnership', text: 'Most of our clients stay for years. We build software — and relationships — that are meant to last.' },
]

export default async function AboutPage() {
  const team = await getTeam()

  return (
    <PageShell>
      <div className="container pb-24" data-testid="about-page">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag text-amber-700">About Infynod</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
              A product-minded team from <span className="gold-text">Pune, India</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Infynod Tech Private Limited was founded on a simple belief: great software comes from small, senior teams who genuinely care about the businesses they build for.
            </p>
            <p className="mt-4 text-base text-foreground/75 leading-relaxed">
              We are an IT services and product company working with startups and established businesses across India and beyond. From custom platforms and mobile apps to cloud infrastructure and AI automation — we take products from a whiteboard sketch to production, and stay on to help them grow.
            </p>
          </div>
          <div className="card-22 img-zoom overflow-hidden border-[5px] border-white shadow-2xl gold-glow">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
              alt="Infynod team collaborating in the office"
              className="w-full h-[320px] md:h-[380px] object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon
            return (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card-22 bg-white border border-border p-8 h-full">
                  <div className="w-12 h-12 rounded-2xl gold-bg text-white flex items-center justify-center">
                    <Icon size={21} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-semibold">Meet the <span className="gold-text">team</span></h2>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {(team || []).map((m, i) => (
              <Reveal key={m.id} delay={i * 80}>
                <div className="card-22 bg-white border border-border p-7 text-center h-full">
                  <div className="w-20 h-20 mx-auto rounded-full gold-bg flex items-center justify-center text-white text-2xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {(m.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                  <h3 className="mt-4 font-semibold">{m.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-amber-700 uppercase tracking-wide">{m.role}</p>
                  <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 card-22 bg-[#0d0c09] text-white p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Want to work <span className="gold-text">with us?</span></h2>
          <p className="mt-3 text-white/60 max-w-md mx-auto">Whether you have a project in mind or want to join the team — we would love to hear from you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="pill gold-bg text-white font-semibold px-7 py-3.5 inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
              Start a project <ArrowRight size={16} />
            </Link>
            <Link href="/careers" className="pill border border-white/25 text-white font-semibold px-7 py-3.5 hover:bg-white/10 transition-colors">
              View open roles
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
