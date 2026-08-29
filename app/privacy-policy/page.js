import PageShell from '@/components/site/PageShell'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Infynod Tech Private Limited collects, uses and protects your information.',
}

const SECTIONS = [
  { h: '1. Information we collect', p: 'When you use our contact form or project planner, we collect the information you provide: your name, company, email address, phone number and project details. We also log basic technical data (IP address) for security and rate-limiting purposes.' },
  { h: '2. How we use your information', p: 'We use the information you share solely to respond to your enquiry, prepare proposals and communicate about potential or ongoing projects. We do not sell, rent or share your personal data with third parties for marketing purposes.' },
  { h: '3. Data storage & security', p: 'Your data is stored in secured databases with access limited to authorised Infynod personnel. We apply industry-standard measures including encrypted transport (HTTPS), authentication controls and periodic reviews.' },
  { h: '4. Cookies & analytics', p: 'Our website may use minimal, privacy-respecting analytics to understand aggregate traffic patterns. We do not use invasive tracking or advertising cookies.' },
  { h: '5. Your rights', p: 'You may request access to, correction of, or deletion of your personal data at any time by emailing info@infynod.com. We will respond within 30 days.' },
  { h: '6. Changes to this policy', p: 'We may update this policy from time to time. The latest version will always be available on this page.' },
  { h: '7. Contact', p: 'For any privacy-related questions, contact us at info@infynod.com or +91 97653 03735, Infynod Tech Private Limited, Pune, Maharashtra, India.' },
]

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="container max-w-3xl pb-24" data-testid="privacy-page">
        <p className="section-tag text-amber-700">Legal</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold">Privacy <span className="gold-text">Policy</span></h1>
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
