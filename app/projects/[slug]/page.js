import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft, AlertTriangle, Lightbulb, TrendingUp, Clock, Building2, Check } from 'lucide-react'
import { getProjectBySlug, getProjects } from '@/lib/db'
import PageShell from '@/components/site/PageShell'
import Reveal from '@/components/site/Reveal'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Case study not found' }
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: { title: `${project.title} — Infynod Case Study`, description: project.description },
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getProjects()])
  if (!project) notFound()

  const others = (allProjects || []).filter((p) => p.slug && p.slug !== slug).slice(0, 3)

  return (
    <PageShell>
      <article className="pb-24" data-testid="case-study">
        <div className="container">
          <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="case-study-back">
            <ArrowLeft size={15} /> All projects
          </Link>

          {/* Header */}
          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap gap-2.5">
              <span className="pill bg-accent text-amber-800 text-xs font-semibold px-3.5 py-1.5">{project.category}</span>
              {project.industry && (
                <span className="pill bg-secondary text-foreground/70 text-xs font-semibold px-3.5 py-1.5 inline-flex items-center gap-1.5"><Building2 size={12} /> {project.industry}</span>
              )}
              {project.duration && (
                <span className="pill bg-secondary text-foreground/70 text-xs font-semibold px-3.5 py-1.5 inline-flex items-center gap-1.5"><Clock size={12} /> {project.duration}</span>
              )}
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-semibold leading-tight" data-testid="case-study-title">{project.title}</h1>
            <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          {/* Hero image */}
          {project.image_url && (
            <div className="mt-10 card-22 img-zoom overflow-hidden border border-border shadow-xl">
              <img src={project.image_url} alt={project.title} className="w-full h-72 md:h-[440px] object-cover" />
            </div>
          )}

          {/* Challenge + Solution */}
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="card-22 bg-white border border-border p-8 md:p-10 h-full" data-testid="case-study-challenge">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                  <AlertTriangle size={21} />
                </div>
                <h2 className="mt-5 text-2xl font-semibold">The Challenge</h2>
                <p className="mt-3 text-base leading-relaxed text-foreground/75">{project.challenge}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card-22 bg-white border border-border p-8 md:p-10 h-full" data-testid="case-study-solution">
                <div className="w-12 h-12 rounded-2xl bg-accent text-amber-700 flex items-center justify-center">
                  <Lightbulb size={21} />
                </div>
                <h2 className="mt-5 text-2xl font-semibold">Our Solution</h2>
                <p className="mt-3 text-base leading-relaxed text-foreground/75">{project.solution}</p>
              </div>
            </Reveal>
          </div>

          {/* Results */}
          {(project.results || []).length > 0 && (
            <div className="mt-14 card-22 bg-[#0d0c09] text-white p-8 md:p-12" data-testid="case-study-results">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-2xl gold-bg flex items-center justify-center"><TrendingUp size={20} /></span>
                <h2 className="text-2xl md:text-3xl font-semibold">The <span className="gold-text">Results</span></h2>
              </div>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {project.results.map((r, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full gold-bg flex items-center justify-center shrink-0">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-sm md:text-base font-medium text-white/90 leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech */}
          {(project.tech || []).length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-semibold">Built <span className="gold-text">with</span></h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {project.tech.map((t) => (
                  <span key={t} className="pill bg-white border border-border px-5 py-2.5 text-sm font-medium">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Other case studies */}
          {others.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold">More case <span className="gold-text">studies</span></h2>
              <div className="mt-6 grid md:grid-cols-3 gap-6">
                {others.map((p) => (
                  <Link key={p.slug} href={`/projects/${p.slug}`} className="group card-22 hover-lift img-zoom bg-white border border-border overflow-hidden block hover:border-amber-500/50 transition-colors">
                    {p.image_url && (
                      <div className="h-36 overflow-hidden">
                        <img src={p.image_url} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="pill bg-accent text-amber-800 text-[11px] font-semibold px-2.5 py-0.5">{p.category}</span>
                      <h3 className="mt-3 font-semibold group-hover:gold-text transition-all">{p.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 card-22 bg-[#0d0c09] text-white p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">Want results like <span className="gold-text">these?</span></h2>
            <p className="mt-3 text-white/60 max-w-md mx-auto">Tell us your challenge — we will show you exactly how AI and great engineering can solve it.</p>
            <Link href="/contact" className="mt-8 pill gold-bg text-white font-semibold px-8 py-3.5 inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
              Start your project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  )
}
