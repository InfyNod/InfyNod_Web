import Link from 'next/link'
import { getBlogPosts } from '@/lib/db'
import PageShell from '@/components/site/PageShell'
import Reveal from '@/components/site/Reveal'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog',
  description: 'Insights on software engineering, product strategy and practical AI from the Infynod Tech team.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <PageShell>
      <div className="container pb-24" data-testid="blog-page">
        <div className="max-w-3xl">
          <p className="section-tag text-amber-700">Blog</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
            Insights from <span className="gold-text">the team</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Practical writing on engineering, product and AI — no fluff, just what we learn shipping real products.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(posts || []).map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link href={`/blog/${p.slug}`} className="group card-22 hover-lift img-zoom bg-white border border-border overflow-hidden block h-full hover:border-amber-500/50 transition-colors" data-testid={`blog-list-card-${p.slug}`}>
                <div className="h-44 relative overflow-hidden">
                  {p.cover_image ? (
                    <img src={p.cover_image} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full gold-bg flex items-center justify-center">
                      <span className="text-7xl font-semibold text-white/25" style={{ fontFamily: 'var(--font-heading)' }}>{(p.title || '?')[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[11px] text-white/90" style={{ fontFamily: 'var(--font-mono)' }}>
                    {new Date(p.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="p-7">
                  <h2 className="text-lg font-semibold leading-snug group-hover:gold-text transition-all">{p.title}</h2>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
                  <p className="mt-4 text-xs text-muted-foreground">{p.author}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
