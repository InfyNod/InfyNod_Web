import PageShell from '@/components/site/PageShell'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms governing the use of the Infynod Tech Private Limited website.',
}

const LAST_UPDATED = '1 September 2026'

const SECTIONS = [
  {
    h: '1. Who we are and what these terms cover',
    p: 'This website (infynod.com) is owned and operated by Infynod Tech Private Limited ("Infynod", "we", "us"), a company registered in India with its registered office at Office No. 307, 3rd Floor, Amanora Chamber, Hadapsar–Kharadi Road, Hadapsar, Pune 411028, Maharashtra. These Terms of Service govern your use of this website only. Any software development, design, consulting or other services we provide to clients are governed by a separate written proposal, statement of work or service agreement, which takes precedence over these terms for that engagement.',
  },
  {
    h: '2. Acceptance',
    p: 'By accessing or using this website you agree to these terms and to our Privacy Policy. If you do not agree, please do not use the site. You must be at least 18 years old, or using the site on behalf of a business, to submit an enquiry or job application.',
  },
  {
    h: '3. Enquiries, project planner and proposals',
    p: 'The contact form and project planner exist so you can tell us about your project. Timelines, scope suggestions or any other output from the project planner are indicative only, generated from the options you select, and are not a quotation, estimate or offer. Nothing on this website creates a contract between you and Infynod. A binding engagement exists only when both parties sign a written proposal or agreement. We may decline any enquiry at our discretion.',
  },
  {
    h: '4. Our products',
    p: 'This website describes products built and operated by Infynod, including Welvors and FetchTrue. Those products are separate services with their own terms, privacy policies and app-store listings. Descriptions on this website are for information only and do not form part of the terms of any Infynod product.',
  },
  {
    h: '5. Intellectual property',
    p: 'All content on this website — text, graphics, logos, product names, design, code and layout — belongs to Infynod or its licensors and is protected by Indian and international intellectual property laws. You may view and print pages for your own reference. You may not copy, reproduce, scrape, republish or create derivative works from this website without our written permission. "Infynod", "Welvors" and "FetchTrue" and their logos are marks of Infynod; use of them without permission is prohibited. Ownership of intellectual property created in client projects is defined in the relevant service agreement, not here.',
  },
  {
    h: '6. Acceptable use',
    p: 'You agree not to use this website to submit false, misleading or unlawful information; to send spam or unsolicited commercial messages through our forms; to attempt to gain unauthorised access to any part of the site, its admin area or its infrastructure; to interfere with the site\u2019s operation or security, including through automated tools, scraping or denial-of-service attempts; or to infringe anyone else\u2019s rights. We may block access, remove submissions and report unlawful activity to the authorities.',
  },
  {
    h: '7. Job applications',
    p: 'Information you submit for a role is used to assess your application as described in our Privacy Policy. Submitting an application does not create any offer or obligation on our part. You confirm that the information you provide is accurate and that you have the right to share it.',
  },
  {
    h: '8. Case studies, testimonials and statistics',
    p: 'Case studies, results and testimonials on this website describe specific projects and are published with the relevant client\u2019s knowledge. Results achieved for one client depend on that client\u2019s circumstances and are not a guarantee of results for you. Statistics about our work are accurate as of the date shown and are updated periodically.',
  },
  {
    h: '9. Third-party links and services',
    p: 'This website may link to third-party websites, app stores or tools. We do not control and are not responsible for their content, availability or privacy practices. A link is not an endorsement.',
  },
  {
    h: '10. Availability and changes',
    p: 'We aim to keep this website available and accurate but do not guarantee uninterrupted access or that all content is error-free. We may change, suspend or remove any part of the website at any time without notice.',
  },
  {
    h: '11. Disclaimer and limitation of liability',
    p: 'This website and its content are provided "as is" and "as available", for general information only, without warranties of any kind. To the maximum extent permitted by Indian law, Infynod, its directors and employees are not liable for any indirect, incidental, consequential or special loss, or any loss of profit, data or business, arising from your use of or reliance on this website. Nothing in these terms limits liability that cannot be limited under applicable law.',
  },
  {
    h: '12. Indemnity',
    p: 'You agree to indemnify Infynod against any claim, loss or expense arising from your breach of these terms or your unlawful use of the website.',
  },
  {
    h: '13. Grievance Officer',
    p: 'In accordance with the Information Technology Act, 2000 and the rules made under it, our Grievance Officer is: Satish Kadam, Infynod Tech Private Limited, Office No. 307, 3rd Floor, Amanora Chamber, Hadapsar–Kharadi Road, Hadapsar, Pune 411028, Maharashtra, India. Email: infynod@gmail.com. Available Monday to Saturday, 10:00 to 18:00 IST. Complaints are acknowledged within 24 hours and resolved within 15 days.',
  },
  {
    h: '14. Governing law and disputes',
    p: 'These terms are governed by the laws of India. Any dispute arising from your use of this website is subject to the exclusive jurisdiction of the courts at Pune, Maharashtra.',
  },
  {
    h: '15. Changes to these terms',
    p: 'We may update these terms from time to time. The date at the top of this page shows the current version. Continued use of the website after a change means you accept the updated terms.',
  },
  {
    h: '16. Contact',
    p: 'Questions about these terms: info@infynod.com or +91 97653 03735, Infynod Tech Private Limited, Pune, Maharashtra, India.',
  },
]

export default function TermsPage() {
  return (
    <PageShell>
      <div className="container max-w-8xl pb-24" data-testid="terms-page">
        <p className="section-tag text-amber-700">Legal</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold">Terms of <span className="gold-text">Service</span></h1>
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
    </PageShell>
  )
}