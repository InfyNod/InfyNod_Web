import PageShell from '@/components/site/PageShell'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms governing the use of the Infynod Tech website and services.',
}

const SECTIONS = [
  { h: '1. Acceptance of terms', p: 'By accessing this website, you agree to these Terms of Service. If you do not agree, please discontinue use of the site.' },
  { h: '2. Services', p: 'Infynod Tech Private Limited provides IT services including software development, design, cloud and AI solutions. Specific engagements are governed by individual proposals and agreements executed separately.' },
  { h: '3. Intellectual property', p: 'All content on this website — including text, graphics, logos and code — is the property of Infynod Tech Private Limited unless otherwise stated, and may not be reproduced without written permission. Client project IP ownership is defined in individual service agreements.' },
  { h: '4. Enquiries & estimates', p: 'Timeline estimates produced by the on-site project planner are indicative ballparks only and do not constitute binding quotations. Formal proposals follow a discovery conversation.' },
  { h: '5. Limitation of liability', p: 'This website is provided “as is”. Infynod Tech shall not be liable for indirect or consequential damages arising from the use of this website or reliance on its content.' },
  { h: '6. Governing law', p: 'These terms are governed by the laws of India, with courts in Pune, Maharashtra having exclusive jurisdiction.' },
  { h: '7. Contact', p: 'Questions about these terms? Reach us at info@infynod.com or +91 97653 03735.' },
]

export default function TermsPage() {
  return (
    <PageShell>
      <div className="container max-w-3xl pb-24" data-testid="terms-page">
        <p className="section-tag text-amber-700">Legal</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold">Terms of <span className="gold-text">Service</span></h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: June 2025</p>
        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-semibold">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
