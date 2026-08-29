const { MongoClient } = require('/app/node_modules/mongodb')
const fs = require('fs')
for (const line of fs.readFileSync('/app/.env', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '')
}

const SERVICE_EXTRAS = {
  'custom-software-development': {
    tools: ['Node.js', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Docker'],
    outcomes: ['A system tailored to your exact workflows', 'Single source of truth for your business data', 'Hours of manual work automated every week', 'Scales with your team without per-seat licence costs'],
  },
  'web-platform-engineering': {
    tools: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'Vercel', 'Strapi', 'Shopify', 'AWS'],
    outcomes: ['90+ Lighthouse scores out of the box', 'SEO-ready, server-rendered pages', 'Conversion-focused user experience', 'Infrastructure that handles traffic spikes calmly'],
  },
  'mobile-app-development': {
    tools: ['React Native', 'Flutter', 'Expo', 'Firebase', 'OneSignal', 'Sentry', 'App Store', 'Play Store'],
    outcomes: ['One codebase shipping to both app stores', 'Native-feel performance users expect', 'Offline-first reliability in the field', 'Smooth store approvals and launch support'],
  },
  'ui-ux-product-design': {
    tools: ['Figma', 'FigJam', 'Maze', 'Framer', 'Lottie', 'Storybook', 'Adobe CC', 'Zeplin'],
    outcomes: ['Flows users complete without support tickets', 'A design system your engineers love', 'Prototypes validated before a line of code', 'A brand that looks as serious as your product'],
  },
  'cloud-devops': {
    tools: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Grafana'],
    outcomes: ['Deployments in minutes, not evenings', 'Cloud costs visible and optimised monthly', '99.9%+ uptime with proactive alerting', 'Security hardening and automated backups'],
  },
  'ai-automation': {
    tools: ['OpenAI', 'Claude', 'LangChain', 'Pinecone', 'Python', 'FastAPI', 'n8n', 'Zapier'],
    outcomes: ['Hours of manual work automated weekly', 'Assistants that answer from your own data', 'Documents parsed with near-perfect accuracy', 'Practical AI with measurable ROI'],
  },
}

async function main() {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db(process.env.DB_NAME || 'infynod')

  await db.collection('settings').updateOne({}, { $set: { hr_phone: '+91 92720 03735' } })

  for (const [slug, extras] of Object.entries(SERVICE_EXTRAS)) {
    await db.collection('services').updateOne({ slug }, { $set: extras })
  }

  const s = await db.collection('settings').findOne({})
  console.log('hr_phone:', s.hr_phone)
  const svc = await db.collection('services').findOne({ slug: 'cloud-devops' })
  console.log('cloud-devops tools:', (svc.tools || []).length, 'outcomes:', (svc.outcomes || []).length)
  await client.close()
}

main().catch((e) => { console.error(e); process.exit(1) })
