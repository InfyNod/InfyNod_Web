const { MongoClient } = require('/app/node_modules/mongodb')
const fs = require('fs')
for (const line of fs.readFileSync('/app/.env', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '')
}

const SERVICE_IMAGES = {
  'ai-automation': 'https://images.unsplash.com/photo-1681164315430-6159b2361615?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  'custom-software-development': 'https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  'web-platform-engineering': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  'mobile-app-development': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  'ui-ux-product-design': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  'cloud-devops': 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
}

const CASE_STUDIES = {
  FinSight: {
    slug: 'finsight', duration: '10 weeks', industry: 'FinTech',
    challenge: 'A wealth-management firm was drowning in Excel — portfolio data scattered across 40+ sheets, reports taking 3 days to compile, and zero real-time visibility for advisors or their clients.',
    solution: 'We built a real-time analytics dashboard with live market data over WebSockets, automated report generation and role-based client portals. AI-assisted anomaly detection flags unusual portfolio movements the moment they happen.',
    results: ['Report generation: 3 days to 4 minutes', '40k+ data points rendered under 200ms', '3x increase in client portal engagement', 'Zero manual reporting errors since launch'],
  },
  MediQueue: {
    slug: 'mediqueue', duration: '12 weeks', industry: 'HealthTech',
    challenge: 'Clinics were managing patient queues on paper and WhatsApp. Patients waited hours without any estimate, and no-shows were costing doctors nearly 20% of their daily slots.',
    solution: 'A queue management platform with live wait-time predictions, automated SMS/WhatsApp reminders, built-in tele-consultation rooms and an AI triage form that routes each patient to the right doctor.',
    results: ['Average wait time down 45%', 'No-shows reduced by 60%', '120+ clinics onboarded', '4.8/5 patient satisfaction rating'],
  },
  FreightFlow: {
    slug: 'freightflow', duration: '14 weeks', industry: 'Logistics',
    challenge: 'A logistics company tracked 200+ trucks through phone calls. Proof-of-delivery took days to reach the office, disputes were routine and customers had zero shipment visibility.',
    solution: 'An end-to-end freight platform: live GPS tracking, driver mobile apps with offline sync, automated digital proof-of-delivery and AI-based route and ETA predictions.',
    results: ['ETA accuracy improved to 94%', 'POD turnaround: 3 days to instant', 'Support calls reduced by 55%', 'Fleet utilisation up 18%'],
  },
  RetailPulse: {
    slug: 'retailpulse', duration: '8 weeks', industry: 'E-Commerce',
    challenge: 'A D2C brand was selling on its website, marketplaces and WhatsApp — with inventory in separate silos. Overselling and stockouts were weekly events that burned customer trust.',
    solution: 'A unified commerce suite syncing inventory across every channel in real time, a WhatsApp ordering bot, and AI demand forecasting that plans restocks before shelves go empty.',
    results: ['Stockouts down 70%', 'WhatsApp channel drives 25% of orders', 'Order processing time halved', 'Revenue up 32% in the first quarter'],
  },
  HireLoop: {
    slug: 'hireloop', duration: '9 weeks', industry: 'SaaS / HRTech',
    challenge: 'HR teams were spending 15+ hours a week screening resumes by hand. Strong candidates slipped through, and slow feedback loops were hurting the employer brand.',
    solution: 'A recruitment SaaS with AI resume screening, semantic candidate-to-job matching, automated interview scheduling and hiring-funnel analytics dashboards.',
    results: ['Shortlisting time cut by 70%', 'Time-to-hire down from 34 to 19 days', 'Candidate response rate up 2.4x', '500+ hires processed in year one'],
  },
}

async function main() {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db(process.env.DB_NAME || 'infynod')

  await db.collection('settings').updateOne({}, {
    $set: {
      hero_heading: 'Supercharge your business with',
      hero_highlight: 'AI-powered software',
      hero_subtext: 'AI chatbots, intelligent automation, predictive analytics and full-scale digital platforms \u2014 we design, build and scale AI solutions that cut costs and multiply growth.',
    },
  })

  for (const [slug, img] of Object.entries(SERVICE_IMAGES)) {
    await db.collection('services').updateOne({ slug }, { $set: { image_url: img } })
  }

  for (const [title, cs] of Object.entries(CASE_STUDIES)) {
    await db.collection('projects').updateOne({ title }, { $set: cs })
  }

  console.log('services with image:', await db.collection('services').countDocuments({ image_url: { $exists: true, $ne: '' } }))
  console.log('projects with slug:', await db.collection('projects').countDocuments({ slug: { $exists: true } }))
  const p = await db.collection('projects').findOne({ slug: 'finsight' })
  console.log('finsight results:', (p.results || []).length)
  await client.close()
}

main().catch((e) => { console.error(e); process.exit(1) })
