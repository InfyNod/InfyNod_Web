import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Phone, Mail, MapPin, Quote, Star, Bot, Zap, TrendingUp } from 'lucide-react'
import { getServices, getProjects, getTeam, getBlogPosts, getSettings, getTestimonials, getFaqs, getProcessSteps } from '@/lib/db'
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

const TECH = [
  'AI & Machine Learning | OpenAI, Claude, LangChain, Python, TensorFlow, Hugging Face',
  'Frontend | Next.js, React, TypeScript, Tailwind CSS, Vue.js, Angular, Redux, Vite',
  'Backend & Databases | Node.js, Express, NestJS, FastAPI, Django, MongoDB, PostgreSQL, MySQL, Redis, Firebase',
  'Mobile Apps | React Native, Flutter, Expo, Android, Swift, Kotlin',
  'Cloud & DevOps | AWS, Docker, Kubernetes, GitHub Actions, Vercel, Nginx',
  'Digital Marketing | Google Analytics, Google Ads, Meta Ads, Search Console, Semrush, Mailchimp, HubSpot, WordPress',
]

const TECH_ICONS = {
  'openai': 'https://cdn.jsdelivr.net/npm/simple-icons@13/icons/openai.svg',
  'claude': 'https://cdn.simpleicons.org/claude',
  'langchain': 'https://cdn.simpleicons.org/langchain',
  'python': 'https://cdn.simpleicons.org/python',
  'tensorflow': 'https://cdn.simpleicons.org/tensorflow',
  'next.js': 'https://cdn.simpleicons.org/nextdotjs',
  'react': 'https://cdn.simpleicons.org/react',
  'react native': 'https://cdn.simpleicons.org/react',
  'typescript': 'https://cdn.simpleicons.org/typescript',
  'tailwind css': 'https://cdn.simpleicons.org/tailwindcss',
  'node.js': 'https://cdn.simpleicons.org/nodedotjs',
  'fastapi': 'https://cdn.simpleicons.org/fastapi',
  'mongodb': 'https://cdn.simpleicons.org/mongodb',
  'postgresql': 'https://cdn.simpleicons.org/postgresql',
  'flutter': 'https://cdn.simpleicons.org/flutter',
  'aws': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'docker': 'https://cdn.simpleicons.org/docker',
  'kubernetes': 'https://cdn.simpleicons.org/kubernetes',
  'github actions': 'https://cdn.simpleicons.org/githubactions',
  'hugging face': 'https://cdn.simpleicons.org/huggingface',
  'vue.js': 'https://cdn.simpleicons.org/vuedotjs',
  'angular': 'https://cdn.simpleicons.org/angular',
  'redux': 'https://cdn.simpleicons.org/redux',
  'vite': 'https://cdn.simpleicons.org/vite',
  'express': 'https://cdn.simpleicons.org/express',
  'nestjs': 'https://cdn.simpleicons.org/nestjs',
  'django': 'https://cdn.simpleicons.org/django',
  'mysql': 'https://cdn.simpleicons.org/mysql',
  'redis': 'https://cdn.simpleicons.org/redis',
  'firebase': 'https://cdn.simpleicons.org/firebase',
  'graphql': 'https://cdn.simpleicons.org/graphql',
  'expo': 'https://cdn.simpleicons.org/expo',
  'android': 'https://cdn.simpleicons.org/android',
  'swift': 'https://cdn.simpleicons.org/swift',
  'kotlin': 'https://cdn.simpleicons.org/kotlin',
  'vercel': 'https://cdn.simpleicons.org/vercel',
  'nginx': 'https://cdn.simpleicons.org/nginx',
  'google analytics': 'https://cdn.simpleicons.org/googleanalytics',
  'google ads': 'https://cdn.simpleicons.org/googleads',
  'meta ads': 'https://cdn.simpleicons.org/meta',
  'search console': 'https://cdn.simpleicons.org/googlesearchconsole',
  'semrush': 'https://cdn.simpleicons.org/semrush',
  'mailchimp': 'https://cdn.simpleicons.org/mailchimp',
  'hubspot': 'https://cdn.simpleicons.org/hubspot',
  'wordpress': 'https://cdn.simpleicons.org/wordpress',
}

function parseTechCategories(lines) {
  const cats = []
  const flat = []
  for (const line of lines || []) {
    if (String(line).includes('|')) {
      const [name, ...rest] = String(line).split('|')
      cats.push({ name: name.trim(), items: rest.join('|').split(',').map((x) => x.trim()).filter(Boolean) })
    } else if (String(line).trim()) {
      flat.push(String(line).trim())
    }
  }
  if (flat.length) cats.push({ name: 'Technologies', items: flat })
  return cats
}

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
  const inputNodes = [90, 160, 230, 300]
  const outputNodes = [110, 195, 280]
  return (
    <div className="relative w-full max-w-[560px] mx-auto mt-6 md:mt-0" aria-hidden="true">
      {/* Gold glow blob */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.25),transparent_65%)] blur-2xl" />

      {/* AI neural-network board */}
      <div className="relative card-22 bg-[#0d0c09] border-[5px] border-white shadow-2xl gold-glow overflow-hidden">
        <svg viewBox="0 0 520 400" className="w-full h-auto block">
          <defs>
            <linearGradient id="og2" x1="0" y1="0" x2="520" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9a6a0a" />
              <stop offset="0.5" stopColor="#d4a017" />
              <stop offset="1" stopColor="#eec453" />
            </linearGradient>
          </defs>

          {/* background grid dots */}
          {[...Array(6)].map((_, r) =>
            [...Array(8)].map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 64} cy={40 + r * 64} r="1.3" fill="#ffffff" opacity="0.07" />
            ))
          )}

          {/* orbit ring */}
          <g className="orbit-ring-2" style={{ transformBox: 'fill-box' }}>
            <circle cx="260" cy="195" r="150" fill="none" stroke="#d4a017" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 8" />
            <circle cx="260" cy="45" r="4" fill="url(#og2)" />
            <circle cx="410" cy="195" r="3" fill="#fff" opacity="0.5" className="pulse-node" />
          </g>

          {/* connections: inputs -> core */}
          {inputNodes.map((y, i) => (
            <line key={`in-${i}`} x1="82" y1={y} x2="216" y2="195" stroke="#d4a017" strokeOpacity="0.55" strokeWidth="1.4" className="dash-flow" style={{ animationDelay: `${i * 0.25}s` }} />
          ))}
          {/* connections: core -> outputs */}
          {outputNodes.map((y, i) => (
            <line key={`out-${i}`} x1="304" y1="195" x2="438" y2={y} stroke="#eec453" strokeOpacity="0.6" strokeWidth="1.4" className="dash-flow" style={{ animationDelay: `${i * 0.35}s` }} />
          ))}

          {/* input nodes */}
          {inputNodes.map((y, i) => (
            <g key={`inode-${i}`}>
              <circle cx="70" cy={y} r="11" fill="#1c1810" stroke="#d4a017" strokeWidth="1.4" />
              <circle cx="70" cy={y} r="4" fill="url(#og2)" className="node-blink" style={{ animationDelay: `${i * 0.4}s` }} />
            </g>
          ))}
          <text x="70" y="345" textAnchor="middle" fill="#ffffff" opacity="0.4" fontSize="10" style={{ fontFamily: 'var(--font-mono)' }}>YOUR DATA</text>

          {/* AI core */}
          <circle cx="260" cy="195" r="62" fill="url(#og2)" opacity="0.14" className="core-glow" />
          <rect x="212" y="147" width="96" height="96" rx="26" fill="url(#og2)" />
          <text x="260" y="207" textAnchor="middle" fill="#ffffff" fontSize="34" fontWeight="700" style={{ fontFamily: 'var(--font-heading)' }}>AI</text>
          <text x="260" y="345" textAnchor="middle" fill="#ffffff" opacity="0.4" fontSize="10" style={{ fontFamily: 'var(--font-mono)' }}>INFYNOD ENGINE</text>

          {/* output nodes */}
          {outputNodes.map((y, i) => (
            <g key={`onode-${i}`}>
              <circle cx="450" cy={y} r="11" fill="#1c1810" stroke="#eec453" strokeWidth="1.4" />
              <circle cx="450" cy={y} r="4" fill="url(#og2)" className="node-blink" style={{ animationDelay: `${0.2 + i * 0.5}s` }} />
            </g>
          ))}
          <text x="450" y="345" textAnchor="middle" fill="#ffffff" opacity="0.4" fontSize="10" style={{ fontFamily: 'var(--font-mono)' }}>GROWTH</text>
        </svg>

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-5 text-white">
          <p className="text-[11px] text-amber-300" style={{ fontFamily: 'var(--font-mono)' }}>infynod.ai( business )</p>
          <p className="text-sm font-semibold mt-0.5">Intelligence built into everything we ship</p>
        </div>
      </div>

      {/* Floating capability pills */}
      <div className="absolute -left-4 md:-left-10 top-8 float-a card-22 bg-white border border-border shadow-xl px-4 py-3 flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-xl gold-bg text-white flex items-center justify-center"><Bot size={16} /></span>
        <div>
          <p className="text-sm font-semibold leading-none" style={{ fontFamily: 'var(--font-heading)' }}>AI Chatbots</p>
          <p className="text-[10px] text-muted-foreground mt-1">Trained on your data</p>
        </div>
      </div>

      <div className="absolute -right-1 md:-right-6 top-2 float-b card-22 bg-white border border-border shadow-xl px-4 py-3 flex items-center gap-2.5" style={{ animationDelay: '1.2s' }}>
        <span className="w-8 h-8 rounded-xl bg-foreground text-white flex items-center justify-center"><Zap size={15} /></span>
        <div>
          <p className="text-sm font-semibold leading-none" style={{ fontFamily: 'var(--font-heading)' }}>Automation</p>
          <p className="text-[10px] text-muted-foreground mt-1">24/7 workflows</p>
        </div>
      </div>

      {/* Floating chip — delivery velocity mini chart */}
      <div className="absolute -right-2 md:-right-8 -bottom-10 float-b card-22 bg-white border border-border shadow-2xl px-5 py-4">
        <p className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1.5" style={{ fontFamily: 'var(--font-mono)' }}><TrendingUp size={11} className="text-amber-600" /> BUSINESS IMPACT</p>
        <div className="flex items-end gap-1.5 h-12">
          {[35, 55, 45, 70, 60, 85, 100].map((h, i) => (
            <span key={i} className="w-2.5 rounded-t-sm gold-bg bar-anim" style={{ height: `${h}%`, animationDelay: `${i * 120}ms` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function HomePage() {
  const [services, projects, team, posts, settings, testimonials, faqs, processSteps] = await Promise.all([
    getServices(),
    getProjects(),
    getTeam(),
    getBlogPosts(3),
    getSettings(),
    getTestimonials(),
    getFaqs(),
    getProcessSteps(),
  ])

  // Admin-editable content with safe fallbacks
  const industries = settings?.industries?.length ? settings.industries : INDUSTRIES
  const techCategories = parseTechCategories(settings?.tech_stack?.length ? settings.tech_stack : TECH)
  const stats = settings?.stats?.length ? settings.stats : STATS
  const testimonialList = testimonials?.length ? testimonials : TESTIMONIALS
  const faqList = faqs?.length ? faqs.map((f) => ({ q: f.question, a: f.answer })) : FAQS

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
              <span className="inline-flex items-center gap-2.5 pill bg-white border border-border px-4 py-2 text-xs font-semibold text-foreground/75 shadow-sm" data-testid="hero-availability">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Available for new AI projects
              </span>
              <p className="mt-6 section-tag text-amber-700">{settings?.hero_tag || 'AI-First Software Development Company · Pune, India'}</p>
              <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-[1.06] tracking-tight">
                {settings?.hero_heading || 'Supercharge your business with'} <span className="gold-text-shimmer">{settings?.hero_highlight || 'AI-powered software'}</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                {settings?.hero_subtext || 'AI chatbots, intelligent automation, predictive analytics and full-scale digital platforms — we design, build and scale AI solutions that cut costs and multiply growth.'}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="pill gold-bg text-white font-semibold px-7 py-3.5 inline-flex items-center gap-2 hover:opacity-90 transition-opacity gold-glow" data-testid="hero-cta-primary">
                  Start a project <ArrowRight size={17} />
                </Link>
                <Link href="/#planner" className="pill border border-foreground/20 font-semibold px-7 py-3.5 inline-flex items-center gap-2 hover:bg-secondary transition-colors" data-testid="hero-cta-secondary">
                  Try the project planner
                </Link>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground" data-testid="hero-trust-row">
                <span className="inline-flex items-center gap-1.5">
                  <span className="flex items-center">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                    ))}
                  </span>
                  <span className="font-semibold text-foreground/80">Trusted by 30+ clients</span>
                </span>
                <span className="hidden sm:inline text-border">|</span>
                <span>50+ products launched</span>
                <span className="hidden sm:inline text-border">|</span>
                <span>Based in Pune, India</span>
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
            {[...industries, ...industries].map((ind, i) => (
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
            <ProcessStory steps={processSteps} />
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
                  <Link href={p.slug ? `/projects/${p.slug}` : '/#projects'} className="group card-22 hover-lift img-zoom bg-white border border-border overflow-hidden h-full flex flex-col hover:border-amber-500/50 transition-colors" data-testid={`project-card-${i}`}>
                    {p.image_url ? (
                      <div className="h-44 overflow-hidden relative">
                        <img src={p.image_url} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-4 pill bg-white/90 backdrop-blur text-amber-800 text-xs font-semibold px-3 py-1">{p.category}</span>
                      </div>
                    ) : null}
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        {!p.image_url && <span className="pill bg-accent text-amber-800 text-xs font-semibold px-3 py-1">{p.category}</span>}
                        <h3 className="text-2xl font-semibold group-hover:gold-text transition-all">{p.title}</h3>
                        <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>0{i + 1}</span>
                      </div>
                      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {(p.tech || []).map((t) => (
                          <span key={t} className="text-[11px] text-foreground/60 bg-secondary px-2.5 py-1 rounded-full" style={{ fontFamily: 'var(--font-mono)' }}>{t}</span>
                        ))}
                      </div>
                      {p.slug && (
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                          View case study <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      )}
                    </div>
                  </Link>
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
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techCategories.map((cat, ci) => (
                <Reveal key={cat.name} delay={ci * 80}>
                  <div className={`card-22 hover-lift bg-white border p-7 h-full ${ci === 0 ? 'border-amber-500/50 gold-glow' : 'border-border'}`} data-testid={`tech-category-${ci}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{cat.name}</h3>
                      <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>0{ci + 1}</span>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-2.5">
                      {cat.items.map((t) => {
                        const icon = TECH_ICONS[t.toLowerCase()]
                        return (
                          <div key={t} className="flex items-center gap-2.5 rounded-xl bg-secondary/60 border border-border/60 px-3 py-2.5 hover:border-amber-500/40 transition-colors">
                            {icon ? (
                              <img src={icon} alt={t} loading="lazy" className="w-5 h-5 object-contain shrink-0" />
                            ) : (
                              <span className="w-5 h-5 rounded-md gold-bg text-white text-[10px] font-bold flex items-center justify-center shrink-0">{t[0]}</span>
                            )}
                            <span className="text-xs font-semibold leading-tight">{t}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 08 — STATS */}
        <section className="py-16 md:py-20 bg-[#0d0c09] text-white" data-testid="section-stats">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s, i) => (
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
              {testimonialList.map((t, i) => (
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
              {faqList.map((f, i) => (
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
