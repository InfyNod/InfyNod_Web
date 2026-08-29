import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Phone, Mail, MapPin, Quote } from 'lucide-react'
import { getServices, getProjects, getTeam, getBlogPosts, getSettings } from '@/lib/db'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import Reveal from '@/components/site/Reveal'
import ServiceIcon from '@/components/site/ServiceIcon'
import Planner from '@/components/site/Planner'
import ContactForm from '@/components/site/ContactForm'
import ProcessStory from '@/components/site/ProcessStory'
import CountUp from '@/components/site/CountUp'

export const dynamic = 'force-dynamic'

const INDUSTRIES = ['FinTech', 'HealthTech', 'Logistics', 'E-Commerce', 'EdTech', 'SaaS', 'Manufacturing', 'Real Estate']

const TECH = ['Next.js', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'React Native', 'Flutter', 'AWS', 'Docker', 'Kubernetes', 'OpenAI']

const STATS = [
  { value: '50+', label: 'Projects shipped' },
  { value: '30+', label: 'Happy clients' },
  { value: '8+', label: 'Industries served' },
  { value: '95%', label: 'Client retention' },
]

const TESTIMONIALS = [
  { quote: 'Infynod took our messy spreadsheet-driven operations and turned them into a clean internal platform. The weekly demos meant zero surprises — we always knew exactly where the project stood.', name: 'Operations Head', company: 'Logistics client, Pune' },
  { quote: 'They shipped our MVP in six weeks flat. What impressed us most was how ruthlessly they helped us cut scope to what actually mattered for launch.', name: 'Founder', company: 'SaaS startup, Bengaluru' },
  { quote: 'Our website went from a 40 Lighthouse score to 95+. Organic traffic doubled within a quarter. The SSR migration paid for itself faster than we expected.', name: 'Marketing Director', company: 'D2C brand, Mumbai' },
]

const FAQS = [
  { q: 'How do you price projects?', a: 'Fixed-scope projects get a fixed quote after a discovery call. Ongoing product work runs on a monthly dedicated-team model. Either way, you get a detailed proposal before committing a rupee.' },
  { q: 'How quickly can we start?', a: 'Discovery calls happen within 2 business days of your enquiry. Most projects kick off within 1–2 weeks of proposal sign-off.' },
  { q: 'Do you work with early-stage startups?', a: 'Yes — MVPs are one of our specialities. We help founders scope ruthlessly and ship a testable product in about six weeks.' },
  { q: 'Who owns the code and IP?', a: 'You do, fully. All code, designs and infrastructure credentials are handed over with documentation at every milestone.' },
  { q: 'Do you provide support after launch?', a: 'Every project includes a free stabilisation window, after which most clients move to a maintenance retainer with guaranteed response SLAs.' },
]

function SectionTag({ num, label }) {
  return <p className="section-tag text-amber-700">{num} — {label}</p>
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto mt-6 md:mt-0" aria-hidden="true">
      {/* Orbit rings behind */}
      <div className="absolute -inset-10 opacity-70 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="og" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8a5a08" />
              <stop offset="0.5" stopColor="#d4a017" />
              <stop offset="1" stopColor="#eec453" />
            </linearGradient>
          </defs>
          <g className="orbit-ring-2" style={{ transformBox: 'fill-box' }}>
            <circle cx="200" cy="200" r="190" fill="none" stroke="#dcc98f" strokeWidth="1.2" strokeDasharray="3 8" />
            <circle cx="200" cy="10" r="7" fill="url(#og)" />
            <circle cx="390" cy="200" r="5" fill="#111" className="pulse-node" />
          </g>
          <g className="orbit-ring-3" style={{ transformBox: 'fill-box' }}>
            <circle cx="200" cy="200" r="150" fill="none" stroke="#e6d7ac" strokeWidth="1" strokeDasharray="2 7" />
            <circle cx="350" cy="200" r="6" fill="url(#og)" className="pulse-node" />
          </g>
        </svg>
      </div>

      {/* Main image frame */}
      <div className="relative card-22 img-zoom overflow-hidden border-[5px] border-white shadow-2xl gold-glow">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
          alt="Infynod engineers building software products"
          className="w-full h-[340px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 text-white">
          <p className="text-[11px] text-amber-300" style={{ fontFamily: 'var(--font-mono)' }}>infynod.build( idea )</p>
          <p className="text-sm font-semibold mt-0.5">From whiteboard to production</p>
        </div>
      </div>

      {/* Floating chip — Lighthouse score */}
      <div className="absolute -left-4 md:-left-10 top-8 float-a card-22 bg-white border border-border shadow-xl px-5 py-3.5">
        <p className="text-2xl font-semibold gold-text" style={{ fontFamily: 'var(--font-heading)' }}>95+</p>
        <p className="text-[11px] text-muted-foreground font-medium">Lighthouse score</p>
      </div>

      {/* Floating chip — delivery velocity mini chart */}
      <div className="absolute -right-2 md:-right-8 -bottom-10 float-b card-22 bg-[#0d0c09] text-white shadow-2xl px-5 py-4">
        <p className="text-[10px] text-white/60 mb-2" style={{ fontFamily: 'var(--font-mono)' }}>DELIVERY VELOCITY</p>
        <div className="flex items-end gap-1.5 h-12">
          {[35, 55, 45, 70, 60, 85, 100].map((h, i) => (
            <span key={i} className="w-2.5 rounded-t-sm gold-bg bar-anim" style={{ height: `${h}%`, animationDelay: `${i * 120}ms` }} />
          ))}
        </div>
      </div>

      {/* Floating chip — projects */}
      <div className="absolute -right-1 md:-right-6 top-2 float-b card-22 bg-white border border-border shadow-xl px-4 py-2.5" style={{ animationDelay: '1.2s' }}>
        <p className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>50+ <span className="text-[11px] font-normal text-muted-foreground">projects shipped</span></p>
      </div>
    </div>
  )
}

export default async function HomePage() {
  const [services, projects, team, posts, settings] = await Promise.all([
    getServices(),
    getProjects(),
    getTeam(),
    getBlogPosts(3),
    getSettings(),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Infynod Tech Private Limited',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    email: settings?.email,
    telephone: settings?.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' },
    description: 'IT services and product company building custom software, web, mobile, cloud and AI solutions.',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        {/* 01 — HERO */}
        <section className="relative pt-32 md:pt-44 pb-24 md:pb-32 overflow-hidden" data-testid="section-hero">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(212,160,23,0.12),transparent_55%)]" />
          <div className="absolute inset-0 -z-10 hero-grid-bg" />
          <div className="container grid md:grid-cols-2 gap-14 items-center">
            <div className="animate-fade-up">
              <p className="section-tag text-amber-700">Infynod Tech Private Limited · Pune, India</p>
              <h1 className="mt-5 text-4xl md:text-6xl font-semibold leading-[1.08] tracking-tight">
                We engineer digital products that <span className="gold-text-shimmer">move business forward</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                Custom software, web platforms, mobile apps and AI automation — designed, built and scaled by a team that treats your product like its own.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="pill gold-bg text-white font-semibold px-7 py-3.5 inline-flex items-center gap-2 hover:opacity-90 transition-opacity gold-glow" data-testid="hero-cta-primary">
                  Start a project <ArrowRight size={17} />
                </Link>
                <Link href="/#planner" className="pill border border-foreground/20 font-semibold px-7 py-3.5 inline-flex items-center gap-2 hover:bg-secondary transition-colors" data-testid="hero-cta-secondary">
                  Try the project planner
                </Link>
              </div>
            </div>
            <div className="animate-fade-up-delay">
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* 02 — TRUST BAR */}
        <section className="border-y border-border bg-white/60 py-5 overflow-hidden" data-testid="section-trustbar">
          <div className="flex whitespace-nowrap marquee-track w-max">
            {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
              <span key={i} className="mx-8 inline-flex items-center gap-3 text-sm font-medium text-foreground/50">
                <span className="w-1.5 h-1.5 rounded-full gold-bg inline-block" /> {ind}
              </span>
            ))}
          </div>
        </section>

        {/* 03 — SERVICES */}
        <section id="services" className="py-20 md:py-28 scroll-mt-24" data-testid="section-services">
          <div className="container">
            <Reveal>
              <SectionTag num="03" label="Services" />
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-2xl leading-tight">
                Everything you need to <span className="gold-text">ship & scale</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(services || []).map((s, i) => (
                <Reveal key={s.slug} delay={i * 80}>
                  <Link href={`/services/${s.slug}`} className="group card-22 hover-lift bg-white border border-border p-8 block h-full hover:border-amber-500/50 transition-all duration-300" data-testid={`service-card-${s.slug}`}>
                    <div className="w-12 h-12 rounded-2xl gold-bg text-white flex items-center justify-center">
                      <ServiceIcon name={s.icon} size={22} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold group-hover:gold-text transition-all">{s.title}</h3>
                    <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{s.tagline}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                      Learn more <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — PROCESS STORY (scroll-driven) */}
        <section id="process" className="py-20 md:py-28 bg-white border-y border-border scroll-mt-24" data-testid="section-process">
          <div className="container">
            <ProcessStory />
          </div>
        </section>

        {/* 05 — PROJECTS */}
        <section id="projects" className="py-20 md:py-28 scroll-mt-24" data-testid="section-projects">
          <div className="container">
            <Reveal>
              <SectionTag num="05" label="Selected work" />
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-2xl leading-tight">
                Products we are <span className="gold-text">proud of</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(projects || []).map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <div className="card-22 hover-lift img-zoom bg-white border border-border overflow-hidden h-full flex flex-col hover:border-amber-500/50 transition-colors" data-testid={`project-card-${i}`}>
                    {p.image_url ? (
                      <div className="h-44 overflow-hidden relative">
                        <img src={p.image_url} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-4 pill bg-white/90 backdrop-blur text-amber-800 text-xs font-semibold px-3 py-1">{p.category}</span>
                      </div>
                    ) : null}
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        {!p.image_url && <span className="pill bg-accent text-amber-800 text-xs font-semibold px-3 py-1">{p.category}</span>}
                        <h3 className="text-2xl font-semibold">{p.title}</h3>
                        <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>0{i + 1}</span>
                      </div>
                      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {(p.tech || []).map((t) => (
                          <span key={t} className="text-[11px] text-foreground/60 bg-secondary px-2.5 py-1 rounded-full" style={{ fontFamily: 'var(--font-mono)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 06 — PROJECT PLANNER */}
        <section id="planner" className="py-20 md:py-28 bg-white border-y border-border scroll-mt-24" data-testid="section-planner">
          <div className="container">
            <Reveal>
              <SectionTag num="06" label="Project planner" />
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-2xl leading-tight">
                Plan your project in <span className="gold-text">30 seconds</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl">Pick what you are building and get an instant ballpark timeline. Send it straight to our team when you are ready.</p>
            </Reveal>
            <div className="mt-12">
              <Reveal><Planner /></Reveal>
            </div>
          </div>
        </section>

        {/* 07 — TECH STACK */}
        <section className="py-20 md:py-28" data-testid="section-tech">
          <div className="container">
            <Reveal>
              <SectionTag num="07" label="Tech stack" />
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-2xl leading-tight">
                Modern tools, <span className="gold-text">battle-tested</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-12 flex flex-wrap gap-3">
                {TECH.map((t) => (
                  <span key={t} className="pill bg-white border border-border px-5 py-2.5 text-sm font-medium hover:border-amber-500/50 transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 08 — STATS */}
        <section className="py-16 md:py-20 bg-[#0d0c09] text-white" data-testid="section-stats">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-10">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="text-center">
                <p className="text-4xl md:text-5xl font-semibold gold-text" style={{ fontFamily: 'var(--font-heading)' }}>
                  <CountUp value={s.value} />
                </p>
                <p className="mt-2 text-sm text-white/50">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 09 — TEAM */}
        <section className="py-20 md:py-28" data-testid="section-team">
          <div className="container">
            <Reveal>
              <SectionTag num="09" label="Team" />
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-2xl leading-tight">
                The people behind <span className="gold-text">the products</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {(team || []).map((m, i) => (
                <Reveal key={m.id} delay={i * 80}>
                  <div className="card-22 hover-lift bg-white border border-border p-7 text-center h-full" data-testid={`team-card-${i}`}>
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
        </section>

        {/* 10 — TESTIMONIALS */}
        <section className="py-20 md:py-28 bg-white border-y border-border" data-testid="section-testimonials">
          <div className="container">
            <Reveal>
              <SectionTag num="10" label="Testimonials" />
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-2xl leading-tight">
                What clients <span className="gold-text">say about us</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={i * 80}>
                  <figure className="card-22 bg-secondary/60 border border-border p-8 h-full flex flex-col" data-testid={`testimonial-${i}`}>
                    <Quote size={26} className="text-amber-600" />
                    <blockquote className="mt-4 text-sm leading-relaxed text-foreground/80 flex-1">{t.quote}</blockquote>
                    <figcaption className="mt-6">
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.company}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 11 — BLOG PREVIEW */}
        <section className="py-20 md:py-28" data-testid="section-blog">
          <div className="container">
            <Reveal>
              <div className="flex items-end justify-between flex-wrap gap-4">
                <div>
                  <SectionTag num="11" label="Insights" />
                  <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
                    From the <span className="gold-text">blog</span>
                  </h2>
                </div>
                <Link href="/blog" className="pill border border-foreground/20 font-semibold px-6 py-3 text-sm inline-flex items-center gap-2 hover:bg-secondary transition-colors" data-testid="blog-view-all">
                  View all posts <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {(posts || []).map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <Link href={`/blog/${p.slug}`} className="group card-22 hover-lift img-zoom bg-white border border-border overflow-hidden block h-full hover:border-amber-500/50 transition-colors" data-testid={`blog-card-${p.slug}`}>
                    <div className="h-40 relative overflow-hidden">
                      {p.cover_image ? (
                        <img src={p.cover_image} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full gold-bg flex items-center justify-center">
                          <span className="text-6xl font-semibold text-white/25" style={{ fontFamily: 'var(--font-heading)' }}>{(p.title || '?')[0]}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                      <span className="absolute bottom-3 left-4 text-[11px] text-white/90" style={{ fontFamily: 'var(--font-mono)' }}>
                        {new Date(p.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="p-7">
                      <h3 className="text-lg font-semibold leading-snug group-hover:gold-text transition-all">{p.title}</h3>
                      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 12 — FAQ */}
        <section className="py-20 md:py-28 bg-white border-y border-border" data-testid="section-faq">
          <div className="container max-w-3xl">
            <Reveal>
              <SectionTag num="12" label="FAQ" />
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
                Questions, <span className="gold-text">answered</span>
              </h2>
            </Reveal>
            <div className="mt-10 space-y-3">
              {FAQS.map((f, i) => (
                <Reveal key={i} delay={i * 60}>
                  <details className="card-22 bg-secondary/50 border border-border px-6 py-1 group" data-testid={`faq-item-${i}`}>
                    <summary className="cursor-pointer list-none py-4 flex items-center justify-between font-semibold text-sm md:text-base">
                      {f.q}
                      <span className="text-amber-700 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 13 — CTA + CONTACT */}
        <section id="contact" className="py-20 md:py-28 scroll-mt-24" data-testid="section-contact">
          <div className="container grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <Reveal>
                <SectionTag num="13" label="Contact" />
                <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
                  Let&apos;s build something <span className="gold-text">great together</span>
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Tell us about your project. We reply within one business day — usually much faster.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center gap-3.5">
                    <span className="w-11 h-11 rounded-2xl gold-bg text-white flex items-center justify-center shrink-0"><Phone size={18} /></span>
                    <a href={`tel:${(settings?.phone || '').replace(/\s/g, '')}`} className="text-sm font-medium hover:text-amber-700 transition-colors" data-testid="contact-info-phone">{settings?.phone}</a>
                  </li>
                  <li className="flex items-center gap-3.5">
                    <span className="w-11 h-11 rounded-2xl gold-bg text-white flex items-center justify-center shrink-0"><Mail size={18} /></span>
                    <a href={`mailto:${settings?.email}`} className="text-sm font-medium hover:text-amber-700 transition-colors" data-testid="contact-info-email">{settings?.email}</a>
                  </li>
                  <li className="flex items-center gap-3.5">
                    <span className="w-11 h-11 rounded-2xl gold-bg text-white flex items-center justify-center shrink-0"><MapPin size={18} /></span>
                    <span className="text-sm font-medium" data-testid="contact-info-address">{settings?.address}</span>
                  </li>
                </ul>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={120}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} services={services} />
    </>
  )
}
