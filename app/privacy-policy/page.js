import PageShell from '@/components/site/PageShell'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Infynod Tech Private Limited collects, uses, stores and protects your personal data.',
}

const LAST_UPDATED = '1 September 2026'

const SECTIONS = [
  {
    h: '1. Who we are',
    p: 'This website (infynod.com) is operated by Infynod Tech Private Limited ("Infynod", "we", "us"), a company registered in India with its registered office at Office No. 307, 3rd Floor, Amanora Chamber, Hadapsar–Kharadi Road, Hadapsar, Pune 411028, Maharashtra. For the purposes of the Digital Personal Data Protection Act, 2023 ("DPDP Act"), Infynod is the Data Fiduciary for personal data collected through this website. This policy explains what we collect, why, how long we keep it and what rights you have.',
  },
  {
    h: '2. What personal data we collect',
    p: 'Contact form and project planner: your name, company name, email address, phone number, and the project details or message you submit. Careers: if you apply for a role by email, we receive your name, contact details, CV and any information you choose to include. Technical data: when you visit the site we automatically log your IP address, browser type, device type, pages visited and timestamps, which we use for security, rate-limiting and to understand how the site is used. We do not collect payment information through this website.',
  },
  {
    h: '3. Why we use your data',
    p: 'We use the information you provide to respond to your enquiry, schedule discovery calls, prepare proposals and communicate about potential or ongoing projects; to evaluate job applications; to keep the website secure and prevent abuse; and to comply with legal obligations. We process your data on the basis of the consent you give when you submit a form, and for the specific purpose stated at the time of collection. We do not use your data for automated decision-making, and we do not sell or rent it to anyone.',
  },
  {
    h: '4. Who we share it with',
    p: 'We share personal data only where needed to run this website and respond to you: hosting and infrastructure providers (such as cloud servers and database services), email and communication tools, and analytics providers described in section 6. These providers process data on our instructions and under contracts that require them to protect it. Some of these providers may store data outside India. We may also disclose data where required by law, court order or a government authority, or to protect our legal rights. Data may be transferred if Infynod merges with or is acquired by another company, in which case this policy continues to apply.',
  },
  {
    h: '5. How long we keep it',
    p: 'Enquiry and project-planner submissions are retained for up to 24 months from your last interaction with us, or for the duration of any project that results from the enquiry plus the period required for our legal and accounting records. Job applications are retained for up to 12 months unless you ask us to delete them sooner. Technical logs are retained for up to 90 days. When data is no longer needed, it is deleted or anonymised.',
  },
  {
    h: '6. Cookies and analytics',
    p: 'This website uses only strictly necessary cookies required for it to function, and may use a privacy-respecting analytics tool (such as Google Analytics) to understand aggregate traffic patterns. We do not use advertising cookies, cross-site tracking or retargeting pixels on this website. You can block cookies in your browser settings; the site will continue to work.',
  },
  {
    h: '7. How we protect your data',
    p: 'Data is transmitted over encrypted connections (HTTPS) and stored in access-controlled databases limited to authorised Infynod personnel. We use authentication controls, regular access reviews and backups. No system is completely secure; if we become aware of a personal data breach that affects you, we will notify you and the Data Protection Board of India as required under the DPDP Act.',
  },
  {
    h: '8. Your rights',
    p: 'Under the DPDP Act you have the right to access a summary of the personal data we hold about you and how it has been processed; to have inaccurate or incomplete data corrected; to have your data erased once it is no longer required for the purpose it was collected; to withdraw your consent at any time (this does not affect processing already carried out); to nominate another person to exercise these rights on your behalf; and to raise a grievance. To exercise any of these rights, email our Grievance Officer using the details in section 10. We will respond within 30 days and may ask you to verify your identity first.',
  },
  {
    h: '9. Children',
    p: 'This website and our services are intended for businesses and adults. We do not knowingly collect personal data from anyone under 18. If you believe a child has submitted data to us, contact us and we will delete it.',
  },
  {
    h: '10. Grievance Officer',
    p: 'In accordance with the DPDP Act and the Information Technology Act, 2000, our designated Grievance Officer is: Satish Kadam, Infynod Tech Private Limited, Office No. 307, 3rd Floor, Amanora Chamber, Hadapsar–Kharadi Road, Hadapsar, Pune 411028, Maharashtra, India. Email: infynod@gmail.com. Available Monday to Saturday, 10:00 to 18:00 IST. If you are not satisfied with our response, you may approach the Data Protection Board of India.',
  },
  {
    h: '11. Changes to this policy',
    p: 'We may update this policy when our practices or the law change. The date at the top of this page shows the latest version. Material changes will be highlighted on this page.',
  },
  {
    h: '12. Contact and governing law',
    p: 'For general questions, contact info@infynod.com or +91 97653 03735. This policy is governed by the laws of India, and the courts at Pune, Maharashtra have exclusive jurisdiction over any dispute arising from it.',
  },
]

export default function PrivacyPage() {
  return (
    <LegalPageShell>
      <div className="container max-w-8xl pb-24" data-testid="privacy-page">
        <p className="section-tag text-amber-700">Legal</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold">Privacy <span className="gold-text">Policy</span></h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-semibold">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </LegalPageShell>
  )
}