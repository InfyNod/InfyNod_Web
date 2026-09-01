import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

export async function seedDatabase(db) {
  const now = new Date().toISOString()

  await db.collection('users').insertOne({
    id: uuidv4(),
    email: 'admin@infynod.com',
    password_hash: bcrypt.hashSync('Infynod@2025', 10),
    role: 'admin',
    created_at: now,
  })

  await db.collection('settings').insertOne({
    id: uuidv4(),
    phone: '+91 97653 03735',
    email: 'info@infynod.com',
    address: 'Office No. 243, The Capital, Hadapsar, Pune – 411028, Maharashtra, India',
    hr_phone: '+91 92720 03735',
    social_links: { linkedin: 'https://linkedin.com', twitter: 'https://x.com', instagram: 'https://instagram.com' },
    hero_tag: 'AI-First Software Development Company \u00b7 Pune, India',
    hero_heading: 'Supercharge your business with',
    hero_highlight: 'AI-powered software',
    hero_subtext: 'AI chatbots, intelligent automation, predictive analytics and full-scale digital platforms \u2014 we design, build and scale AI solutions that cut costs and multiply growth.',
    industries: ['FinTech', 'HealthTech', 'Logistics', 'E-Commerce', 'EdTech', 'SaaS', 'Manufacturing', 'Real Estate'],
    tech_stack: ['AI & Machine Learning | OpenAI, Claude, LangChain, Python, TensorFlow, Hugging Face', 'Frontend | Next.js, React, TypeScript, Tailwind CSS, Vue.js, Angular, Redux, Vite', 'Backend & Databases | Node.js, Express, NestJS, FastAPI, Django, MongoDB, PostgreSQL, MySQL, Redis, Firebase', 'Mobile Apps | React Native, Flutter, Expo, Android, Swift, Kotlin', 'Cloud & DevOps | AWS, Docker, Kubernetes, GitHub Actions, Vercel, Nginx', 'Digital Marketing | Google Analytics, Google Ads, Meta Ads, Search Console, Semrush, Mailchimp, HubSpot, WordPress'],
    stats: [
      { value: '50+', label: 'Projects shipped' },
      { value: '30+', label: 'Happy clients' },
      { value: '8+', label: 'Industries served' },
      { value: '95%', label: 'Client retention' },
    ],
  })

  await db.collection('testimonials').insertMany([
    { id: uuidv4(), quote: 'Infynod took our messy spreadsheet-driven operations and turned them into a clean internal platform. The weekly demos meant zero surprises \u2014 we always knew exactly where the project stood.', name: 'Operations Head', company: 'Logistics client, Pune', order: 1 },
    { id: uuidv4(), quote: 'They shipped our MVP in six weeks flat. What impressed us most was how ruthlessly they helped us cut scope to what actually mattered for launch.', name: 'Founder', company: 'SaaS startup, Bengaluru', order: 2 },
    { id: uuidv4(), quote: 'Our website went from a 40 Lighthouse score to 95+. Organic traffic doubled within a quarter. The SSR migration paid for itself faster than we expected.', name: 'Marketing Director', company: 'D2C brand, Mumbai', order: 3 },
  ])

  await db.collection('faqs').insertMany([
    { id: uuidv4(), question: 'How do you price projects?', answer: 'Fixed-scope projects get a fixed quote after a discovery call. Ongoing product work runs on a monthly dedicated-team model. Either way, you get a detailed proposal before committing a rupee.', order: 1 },
    { id: uuidv4(), question: 'How quickly can we start?', answer: 'Discovery calls happen within 2 business days of your enquiry. Most projects kick off within 1\u20132 weeks of proposal sign-off.', order: 2 },
    { id: uuidv4(), question: 'Do you work with early-stage startups?', answer: 'Yes \u2014 MVPs are one of our specialities. We help founders scope ruthlessly and ship a testable product in about six weeks.', order: 3 },
    { id: uuidv4(), question: 'Who owns the code and IP?', answer: 'You do, fully. All code, designs and infrastructure credentials are handed over with documentation at every milestone.', order: 4 },
    { id: uuidv4(), question: 'Do you provide support after launch?', answer: 'Every project includes a free stabilisation window, after which most clients move to a maintenance retainer with guaranteed response SLAs.', order: 5 },
  ])

  await db.collection('process_steps').insertMany([
    { id: uuidv4(), title: 'Discover', text: 'We start with a deep-dive workshop \u2014 your goals, users, constraints and success metrics. You get a clear scope document and technical blueprint before any code is written.', order: 1 },
    { id: uuidv4(), title: 'Design', text: 'Wireframes become clickable prototypes within days. We test flows with real users and lock a pixel-perfect design system your product can grow with.', order: 2 },
    { id: uuidv4(), title: 'Build', text: 'Weekly sprints, weekly demos. You watch the product take shape in a staging environment \u2014 no black boxes, no surprises at the end.', order: 3 },
    { id: uuidv4(), title: 'Launch', text: 'Hardening, performance passes, analytics and error tracking wired in. We ship to production with rollback plans and zero-drama deployments.', order: 4 },
    { id: uuidv4(), title: 'Scale', text: 'Post-launch, we monitor, iterate and optimise. New features ship on a predictable cadence while infrastructure scales with your traffic.', order: 5 },
  ])

  await db.collection('services').insertMany([
    {
      id: uuidv4(), slug: 'custom-software-development', title: 'Custom Software Development',
      tagline: 'Purpose-built systems that fit your business like a glove.',
      description: 'We design and engineer bespoke software platforms — from internal tools and ERPs to customer-facing products. Every line of code is written for your exact workflows, so you never bend your business around off-the-shelf limits.',
      features: ['Product discovery & technical architecture', 'Scalable API-first backends', 'Modern, accessible frontends', 'Legacy system modernisation', 'Third-party integrations & migrations', 'Long-term maintenance & SLAs'],
      icon: 'code', order: 2, active: true, image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
      tools: ['Node.js', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Docker'],
      outcomes: ['A system tailored to your exact workflows', 'Single source of truth for your business data', 'Hours of manual work automated every week', 'Scales with your team without per-seat licence costs'],
    },
    {
      id: uuidv4(), slug: 'web-platform-engineering', title: 'Web & Platform Engineering',
      tagline: 'High-performance web platforms that convert and scale.',
      description: 'From marketing sites that score 90+ on Lighthouse to complex multi-tenant SaaS platforms — we build with Next.js, Node.js and cloud-native patterns so your web presence is fast, secure and future-proof.',
      features: ['Next.js / React applications', 'SaaS & multi-tenant platforms', 'E-commerce & headless CMS', 'Performance & Core Web Vitals', 'SEO-first server rendering', 'Progressive Web Apps'],
      icon: 'globe', order: 3, active: true, image_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
      tools: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'Vercel', 'Strapi', 'Shopify', 'AWS'],
      outcomes: ['90+ Lighthouse scores out of the box', 'SEO-ready, server-rendered pages', 'Conversion-focused user experience', 'Infrastructure that handles traffic spikes calmly'],
    },
    {
      id: uuidv4(), slug: 'mobile-app-development', title: 'Mobile App Development',
      tagline: 'Native-feel apps for iOS and Android from a single codebase.',
      description: 'We ship polished cross-platform mobile apps with React Native and Flutter — covering everything from MVPs for startups to enterprise field-force apps with offline sync and push notifications.',
      features: ['React Native & Flutter apps', 'Offline-first architecture', 'Push notifications & deep links', 'App Store / Play Store launch', 'In-app payments & subscriptions', 'Analytics & crash monitoring'],
      icon: 'smartphone', order: 4, active: true, image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
      tools: ['React Native', 'Flutter', 'Expo', 'Firebase', 'OneSignal', 'Sentry', 'App Store', 'Play Store'],
      outcomes: ['One codebase shipping to both app stores', 'Native-feel performance users expect', 'Offline-first reliability in the field', 'Smooth store approvals and launch support'],
    },
    {
      id: uuidv4(), slug: 'ui-ux-product-design', title: 'UI/UX & Product Design',
      tagline: 'Interfaces people love — grounded in research, not guesses.',
      description: 'Our design practice pairs user research with premium visual craft. We map journeys, prototype fast, test with real users, and hand engineering a pixel-perfect design system — not just pretty screens.',
      features: ['UX research & user journeys', 'Wireframes & rapid prototyping', 'Design systems & component libraries', 'Brand & visual identity', 'Usability testing', 'Design-to-dev handoff'],
      icon: 'pen', order: 5, active: true, image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
      tools: ['Figma', 'FigJam', 'Maze', 'Framer', 'Lottie', 'Storybook', 'Adobe CC', 'Zeplin'],
      outcomes: ['Flows users complete without support tickets', 'A design system your engineers love', 'Prototypes validated before a line of code', 'A brand that looks as serious as your product'],
    },
    {
      id: uuidv4(), slug: 'cloud-devops', title: 'Cloud & DevOps',
      tagline: 'Infrastructure that deploys itself and heals itself.',
      description: 'We set up cloud infrastructure, CI/CD pipelines and observability so your team ships daily with confidence. AWS, GCP or Azure — containerised, monitored and cost-optimised.',
      features: ['AWS / GCP / Azure architecture', 'Docker & Kubernetes', 'CI/CD pipelines', 'Monitoring & alerting', 'Cost optimisation', 'Security hardening & backups'],
      icon: 'cloud', order: 6, active: true, image_url: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
      tools: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Grafana'],
      outcomes: ['Deployments in minutes, not evenings', 'Cloud costs visible and optimised monthly', '99.9%+ uptime with proactive alerting', 'Security hardening and automated backups'],
    },
    {
      id: uuidv4(), slug: 'ai-automation', title: 'AI & Automation',
      tagline: 'Put LLMs and automation to work inside your business.',
      description: 'From AI chat assistants trained on your data to workflow automation that removes hours of manual work — we integrate practical, production-grade AI into products and operations.',
      features: ['LLM-powered assistants & copilots', 'RAG on your private data', 'Workflow & back-office automation', 'Document & data extraction', 'AI product strategy', 'Model evaluation & guardrails'],
      icon: 'sparkles', order: 1, active: true, image_url: 'https://images.unsplash.com/photo-1681164315430-6159b2361615?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
      tools: ['OpenAI', 'Claude', 'LangChain', 'Pinecone', 'Python', 'FastAPI', 'n8n', 'Zapier'],
      outcomes: ['Hours of manual work automated weekly', 'Assistants that answer from your own data', 'Documents parsed with near-perfect accuracy', 'Practical AI with measurable ROI'],
    },
  ])

  await db.collection('projects').insertMany([
    { id: uuidv4(), title: 'FinSight', category: 'FinTech', description: 'Real-time portfolio analytics dashboard for a wealth-management firm — 40k+ daily data points rendered under 200ms.', tech: ['Next.js', 'Node.js', 'MongoDB', 'WebSockets'], external_link: '', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=900', order: 1, slug: 'finsight', industry: 'FinTech', duration: '10 weeks', challenge: 'A wealth-management firm was drowning in Excel \u2014 portfolio data scattered across 40+ sheets, reports taking 3 days to compile, and zero real-time visibility for advisors or their clients.', solution: 'We built a real-time analytics dashboard with live market data over WebSockets, automated report generation and role-based client portals. AI-assisted anomaly detection flags unusual portfolio movements the moment they happen.', results: ['Report generation: 3 days to 4 minutes', '40k+ data points rendered under 200ms', '3x increase in client portal engagement', 'Zero manual reporting errors since launch'] },
    { id: uuidv4(), title: 'MediQueue', category: 'HealthTech', description: 'Clinic queue management and tele-consultation portal serving 120+ clinics with zero-downtime appointment flows.', tech: ['React Native', 'Node.js', 'PostgreSQL'], external_link: '', image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=srgb&fm=jpg&q=85&w=900', order: 2, slug: 'mediqueue', industry: 'HealthTech', duration: '12 weeks', challenge: 'Clinics were managing patient queues on paper and WhatsApp. Patients waited hours without any estimate, and no-shows were costing doctors nearly 20% of their daily slots.', solution: 'A queue management platform with live wait-time predictions, automated SMS/WhatsApp reminders, built-in tele-consultation rooms and an AI triage form that routes each patient to the right doctor.', results: ['Average wait time down 45%', 'No-shows reduced by 60%', '120+ clinics onboarded', '4.8/5 patient satisfaction rating'] },
    { id: uuidv4(), title: 'FreightFlow', category: 'Logistics', description: 'End-to-end freight tracking platform with live GPS, driver apps and automated proof-of-delivery.', tech: ['Flutter', 'Next.js', 'AWS'], external_link: '', image_url: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=srgb&fm=jpg&q=85&w=900', order: 3, slug: 'freightflow', industry: 'Logistics', duration: '14 weeks', challenge: 'A logistics company tracked 200+ trucks through phone calls. Proof-of-delivery took days to reach the office, disputes were routine and customers had zero shipment visibility.', solution: 'An end-to-end freight platform: live GPS tracking, driver mobile apps with offline sync, automated digital proof-of-delivery and AI-based route and ETA predictions.', results: ['ETA accuracy improved to 94%', 'POD turnaround: 3 days to instant', 'Support calls reduced by 55%', 'Fleet utilisation up 18%'] },
    { id: uuidv4(), title: 'RetailPulse', category: 'E-Commerce', description: 'Omnichannel commerce suite unifying inventory, storefront and WhatsApp ordering for a D2C brand.', tech: ['Next.js', 'Shopify', 'Node.js'], external_link: '', image_url: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=srgb&fm=jpg&q=85&w=900', order: 4, slug: 'retailpulse', industry: 'E-Commerce', duration: '8 weeks', challenge: 'A D2C brand was selling on its website, marketplaces and WhatsApp \u2014 with inventory in separate silos. Overselling and stockouts were weekly events that burned customer trust.', solution: 'A unified commerce suite syncing inventory across every channel in real time, a WhatsApp ordering bot, and AI demand forecasting that plans restocks before shelves go empty.', results: ['Stockouts down 70%', 'WhatsApp channel drives 25% of orders', 'Order processing time halved', 'Revenue up 32% in the first quarter'] },
    { id: uuidv4(), title: 'HireLoop', category: 'SaaS', description: 'Recruitment automation SaaS with AI resume screening — cut shortlisting time by 70% for HR teams.', tech: ['Next.js', 'OpenAI', 'MongoDB'], external_link: '', image_url: 'https://images.unsplash.com/photo-1601034913836-a1f43e143611?crop=entropy&cs=srgb&fm=jpg&q=85&w=900', order: 5, slug: 'hireloop', industry: 'SaaS / HRTech', duration: '9 weeks', challenge: 'HR teams were spending 15+ hours a week screening resumes by hand. Strong candidates slipped through, and slow feedback loops were hurting the employer brand.', solution: 'A recruitment SaaS with AI resume screening, semantic candidate-to-job matching, automated interview scheduling and hiring-funnel analytics dashboards.', results: ['Shortlisting time cut by 70%', 'Time-to-hire down from 34 to 19 days', 'Candidate response rate up 2.4x', '500+ hires processed in year one'] },
  ])

  await db.collection('team').insertMany([
    { id: uuidv4(), name: 'Rohit Deshmukh', role: 'Founder & CEO', bio: 'Product-minded engineer leading Infynod\u2019s vision and client partnerships.', image_url: '', order: 1 },
    { id: uuidv4(), name: 'Sneha Patil', role: 'Head of Engineering', bio: 'Architects scalable systems and mentors the engineering practice.', image_url: '', order: 2 },
    { id: uuidv4(), name: 'Amol Joshi', role: 'Lead Product Designer', bio: 'Turns complex workflows into interfaces people actually enjoy.', image_url: '', order: 3 },
    { id: uuidv4(), name: 'Priya Kulkarni', role: 'Delivery Manager', bio: 'Keeps every sprint on time, on scope and transparently communicated.', image_url: '', order: 4 },
  ])

  await db.collection('jobs').insertMany([
    { id: uuidv4(), title: 'Full Stack Developer (Next.js / Node)', location: 'Pune \u00b7 Hybrid', type: 'Full-time', experience: '2\u20134 years', description: 'Build and ship production features across our client platforms. Strong JavaScript, React and API design skills expected. You will own features end-to-end \u2014 from schema to UI.', apply_email: 'info@infynod.com', status: 'open', created_at: now },
    { id: uuidv4(), title: 'UI/UX Designer', location: 'Pune \u00b7 Remote-friendly', type: 'Full-time', experience: '1\u20133 years', description: 'Design flows, prototypes and design systems for web and mobile products. Portfolio demonstrating shipped work required. Figma mastery expected.', apply_email: 'info@infynod.com', status: 'open', created_at: now },
    { id: uuidv4(), title: 'Business Development Executive', location: 'Pune', type: 'Full-time', experience: '0\u20132 years', description: 'Own the top of our sales funnel \u2014 outreach, discovery calls and proposals for IT services. Excellent written and spoken communication needed.', apply_email: 'info@infynod.com', status: 'open', created_at: now },
  ])

  await db.collection('blog').insertMany([
    {
      id: uuidv4(), slug: 'why-ssr-matters-for-business-websites', title: 'Why Server-Side Rendering Matters for Business Websites',
      excerpt: 'Your website has 3 seconds to load before visitors leave. Here is how SSR keeps you fast, indexed and converting.',
      cover_image: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?crop=entropy&cs=srgb&fm=jpg&q=85&w=900', author: 'Infynod Team', published: true, created_at: '2025-05-12T10:00:00.000Z',
      content: 'Every second of load time costs conversions. Studies consistently show that pages loading in under two seconds retain dramatically more visitors than those taking four or more.\n\nServer-side rendering (SSR) sends fully formed HTML to the browser, so users see meaningful content immediately \u2014 no spinners, no blank screens. Search engines index the real content on the first pass, which directly improves rankings.\n\nAt Infynod we build every public-facing page with SSR or static generation by default. The result: Lighthouse scores above 90, faster first contentful paint, and marketing pages that actually rank.\n\nIf your current site shows a loading spinner before content appears, you are paying an invisible tax on every visit. An SSR migration is usually faster and cheaper than teams expect \u2014 and the SEO payoff compounds monthly.'
    },
    {
      id: uuidv4(), slug: 'mvp-in-6-weeks-playbook', title: 'The 6-Week MVP Playbook We Use With Startups',
      excerpt: 'Scope ruthlessly, ship weekly, measure honestly. The exact process we run to take founders from idea to live product.',
      cover_image: 'https://images.unsplash.com/photo-1683813479742-4730f91fa3ec?crop=entropy&cs=srgb&fm=jpg&q=85&w=900', author: 'Infynod Team', published: true, created_at: '2025-04-28T10:00:00.000Z',
      content: 'Most MVPs fail before launch \u2014 not from bad code, but from bloated scope. Our playbook fixes that.\n\nWeek 1 is discovery: we map the single core journey a user must complete and cut everything else. Week 2 locks the data model and designs. Weeks 3\u20135 are build sprints with a demo every Friday \u2014 real, clickable software, not slide decks.\n\nWeek 6 is hardening: analytics, error tracking, onboarding polish and launch checklists. You go live with something small, stable and measurable.\n\nThe discipline pays off. Founders get to real user feedback in six weeks instead of six months, and every rupee spent maps to a feature users actually touch.'
    },
    {
      id: uuidv4(), slug: 'practical-ai-for-smes', title: 'Practical AI for SMEs: Beyond the Hype',
      excerpt: 'You do not need a data-science team to benefit from AI. Three automations any mid-size business can deploy this quarter.',
      cover_image: 'https://images.unsplash.com/photo-1638482856830-16b0e15fcf2c?crop=entropy&cs=srgb&fm=jpg&q=85&w=900', author: 'Infynod Team', published: true, created_at: '2025-04-02T10:00:00.000Z',
      content: 'AI headlines are dominated by billion-dollar models, but the highest-ROI applications for small and mid-size businesses are refreshingly boring.\n\nFirst: document extraction. Invoices, purchase orders and KYC documents can be parsed automatically with near-perfect accuracy, eliminating hours of manual data entry.\n\nSecond: support copilots. An assistant trained on your own product docs can draft replies for your support team, cutting response times in half while keeping humans in control.\n\nThird: internal search. A RAG (retrieval-augmented generation) layer over your policies, SOPs and past proposals means employees stop asking the same questions on repeat.\n\nEach of these ships in weeks, not quarters \u2014 and pays for itself within the first billing cycle.'
    },
  ])
}
