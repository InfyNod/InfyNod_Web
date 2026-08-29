import { MapPin, Briefcase, Clock, Mail, Phone } from 'lucide-react'
import { getJobs, getSettings } from '@/lib/db'
import PageShell from '@/components/site/PageShell'
import Reveal from '@/components/site/Reveal'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Careers',
  description: 'Join Infynod Tech — open roles in engineering, design and business development in Pune, India.',
}

export default async function CareersPage() {
  const [jobs, settings] = await Promise.all([getJobs(), getSettings()])

  return (
    <PageShell>
      <div className="container pb-24" data-testid="careers-page">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag text-amber-700">Careers</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
              Do the best work of <span className="gold-text">your career</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Small team, senior standards, real ownership. We hire people who care about craft and give them the space to do great work.
            </p>
            {settings?.hr_phone && (
              <p className="mt-5 inline-flex items-center gap-2.5 pill bg-white border border-border px-5 py-2.5 text-sm font-medium" data-testid="careers-hr-phone">
                <Phone size={15} className="text-amber-600" /> HR & Careers:
                <a href={`tel:${settings.hr_phone.replace(/\s/g, '')}`} className="font-semibold hover:text-amber-700 transition-colors">{settings.hr_phone}</a>
              </p>
            )}
          </div>
          <div className="card-22 img-zoom overflow-hidden border-[5px] border-white shadow-2xl gold-glow">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
              alt="Team working together at Infynod office"
              className="w-full h-[280px] md:h-[320px] object-cover"
            />
          </div>
        </div>

        <div className="mt-14 space-y-5 max-w-4xl">
          {(jobs || []).length === 0 && (
            <div className="card-22 bg-white border border-border p-10 text-center text-muted-foreground" data-testid="careers-empty">
              No open roles right now — but we are always happy to meet great people. Email us at info@infynod.com.
            </div>
          )}
          {(jobs || []).map((job, i) => (
            <Reveal key={job.id} delay={i * 80}>
              <div className="card-22 bg-white border border-border p-8 hover:border-amber-500/50 transition-colors" data-testid={`job-card-${i}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <div className="mt-2.5 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><MapPin size={13} /> {job.location}</span>
                      <span className="inline-flex items-center gap-1.5"><Briefcase size={13} /> {job.type}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {job.experience}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:${job.apply_email}?subject=Application: ${encodeURIComponent(job.title)}`}
                    className="pill gold-bg text-white text-sm font-semibold px-5 py-2.5 inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                    data-testid={`job-apply-${i}`}
                  >
                    <Mail size={14} /> Apply now
                  </a>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
