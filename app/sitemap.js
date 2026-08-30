import { getServices, getBlogPosts, getProjects } from '@/lib/db'

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const staticRoutes = ['', '/about', '/careers', '/blog', '/contact', '/privacy-policy', '/terms'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }))

  let dynamicRoutes = []
  try {
    const [services, posts, projects] = await Promise.all([getServices(), getBlogPosts(), getProjects()])
    dynamicRoutes = [
      ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 })),
      ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.created_at), changeFrequency: 'monthly', priority: 0.6 })),
      ...projects.filter((p) => p.slug).map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 })),
    ]
  } catch (e) {
    // DB unavailable at build time — static routes only
  }

  return [...staticRoutes, ...dynamicRoutes]
}
