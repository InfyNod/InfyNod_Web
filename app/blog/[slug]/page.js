import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/db'
import PageShell from '@/components/site/PageShell'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Post not found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.created_at },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const others = (await getBlogPosts(4)).filter((p) => p.slug !== slug).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: post.author || 'Infynod Team' },
    datePublished: post.created_at,
    publisher: { '@type': 'Organization', name: 'Infynod Tech Private Limited' },
  }

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="container max-w-3xl pb-24" data-testid="blog-post">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="blog-back">
          <ArrowLeft size={15} /> All posts
        </Link>
        <p className="mt-8 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
          {new Date(post.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })} · {post.author}
        </p>
        <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight" data-testid="blog-post-title">{post.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
        {post.cover_image && (
          <div className="mt-8 card-22 overflow-hidden border border-border">
            <img src={post.cover_image} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
          </div>
        )}
        <div className="mt-8 h-1 w-24 gold-bg rounded-full" />
        <div className="mt-10 space-y-6">
          {(post.content || '').split('\n\n').map((para, i) => (
            <p key={i} className="text-base leading-[1.8] text-foreground/80">{para}</p>
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-16 pt-10 border-t border-border">
            <h2 className="text-xl font-semibold">Keep reading</h2>
            <div className="mt-5 grid md:grid-cols-2 gap-5">
              {others.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group card-22 bg-white border border-border p-6 block hover:border-amber-500/50 transition-colors">
                  <h3 className="font-semibold leading-snug group-hover:gold-text transition-all">{p.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageShell>
  )
}
