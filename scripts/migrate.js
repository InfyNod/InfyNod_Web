const { MongoClient } = require('/app/node_modules/mongodb')
const { randomUUID: uuidv4 } = require('crypto')
const fs = require('fs')
for (const line of fs.readFileSync('/app/.env', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '')
}

async function main() {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db(process.env.DB_NAME || 'infynod')

  // Extend settings
  await db.collection('settings').updateOne({}, {
    $set: {
      hero_tag: 'Infynod Tech Private Limited \u00b7 Pune, India',
      hero_heading: 'We engineer digital products that',
      hero_highlight: 'move business forward',
      hero_subtext: 'Custom software, web platforms, mobile apps and AI automation \u2014 designed, built and scaled by a team that treats your product like its own.',
      industries: ['FinTech', 'HealthTech', 'Logistics', 'E-Commerce', 'EdTech', 'SaaS', 'Manufacturing', 'Real Estate'],
      tech_stack: ['Next.js', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'React Native', 'Flutter', 'AWS', 'Docker', 'Kubernetes', 'OpenAI'],
      stats: [
        { value: '50+', label: 'Projects shipped' },
        { value: '30+', label: 'Happy clients' },
        { value: '8+', label: 'Industries served' },
        { value: '95%', label: 'Client retention' },
      ],
    },
  })

  if ((await db.collection('testimonials').countDocuments()) === 0) {
    await db.collection('testimonials').insertMany([
      { id: uuidv4(), quote: 'Infynod took our messy spreadsheet-driven operations and turned them into a clean internal platform. The weekly demos meant zero surprises \u2014 we always knew exactly where the project stood.', name: 'Operations Head', company: 'Logistics client, Pune', order: 1 },
      { id: uuidv4(), quote: 'They shipped our MVP in six weeks flat. What impressed us most was how ruthlessly they helped us cut scope to what actually mattered for launch.', name: 'Founder', company: 'SaaS startup, Bengaluru', order: 2 },
      { id: uuidv4(), quote: 'Our website went from a 40 Lighthouse score to 95+. Organic traffic doubled within a quarter. The SSR migration paid for itself faster than we expected.', name: 'Marketing Director', company: 'D2C brand, Mumbai', order: 3 },
    ])
  }

  if ((await db.collection('faqs').countDocuments()) === 0) {
    await db.collection('faqs').insertMany([
      { id: uuidv4(), question: 'How do you price projects?', answer: 'Fixed-scope projects get a fixed quote after a discovery call. Ongoing product work runs on a monthly dedicated-team model. Either way, you get a detailed proposal before committing a rupee.', order: 1 },
      { id: uuidv4(), question: 'How quickly can we start?', answer: 'Discovery calls happen within 2 business days of your enquiry. Most projects kick off within 1\u20132 weeks of proposal sign-off.', order: 2 },
      { id: uuidv4(), question: 'Do you work with early-stage startups?', answer: 'Yes \u2014 MVPs are one of our specialities. We help founders scope ruthlessly and ship a testable product in about six weeks.', order: 3 },
      { id: uuidv4(), question: 'Who owns the code and IP?', answer: 'You do, fully. All code, designs and infrastructure credentials are handed over with documentation at every milestone.', order: 4 },
      { id: uuidv4(), question: 'Do you provide support after launch?', answer: 'Every project includes a free stabilisation window, after which most clients move to a maintenance retainer with guaranteed response SLAs.', order: 5 },
    ])
  }

  if ((await db.collection('process_steps').countDocuments()) === 0) {
    await db.collection('process_steps').insertMany([
      { id: uuidv4(), title: 'Discover', text: 'We start with a deep-dive workshop \u2014 your goals, users, constraints and success metrics. You get a clear scope document and technical blueprint before any code is written.', order: 1 },
      { id: uuidv4(), title: 'Design', text: 'Wireframes become clickable prototypes within days. We test flows with real users and lock a pixel-perfect design system your product can grow with.', order: 2 },
      { id: uuidv4(), title: 'Build', text: 'Weekly sprints, weekly demos. You watch the product take shape in a staging environment \u2014 no black boxes, no surprises at the end.', order: 3 },
      { id: uuidv4(), title: 'Launch', text: 'Hardening, performance passes, analytics and error tracking wired in. We ship to production with rollback plans and zero-drama deployments.', order: 4 },
      { id: uuidv4(), title: 'Scale', text: 'Post-launch, we monitor, iterate and optimise. New features ship on a predictable cadence while infrastructure scales with your traffic.', order: 5 },
    ])
  }

  console.log('settings fields:', Object.keys(await db.collection('settings').findOne({})).join(','))
  console.log('testimonials:', await db.collection('testimonials').countDocuments())
  console.log('faqs:', await db.collection('faqs').countDocuments())
  console.log('process_steps:', await db.collection('process_steps').countDocuments())
  await client.close()
}

main().catch((e) => { console.error(e); process.exit(1) })
