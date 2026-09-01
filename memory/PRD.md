# PRD — Infynod Tech Private Limited Official Website

## Overview
Corporate website for Infynod Tech Pvt Ltd (IT services & product company, Pune, India).
Theme: Gold & Black on light backgrounds, gold gradient accents. Fonts: Space Grotesk (headings 600), Manrope (body), JetBrains Mono. 22px card radius, pill buttons, custom SVG "Infynod" node wordmark logo.

## Contact (confirmed by user)
- Phone: +91 97653 03735 | Email: info@infynod.com | Office No. 243, The Capital, Hadapsar, Pune – 411028, Maharashtra, India


## Built (Steps 1-4 + Design v2) — DONE & TESTED
- 13-section SSR home: hero (image infographic + floating stat chips + animated bars + shimmer gold heading), trust marquee, services(6), scroll-driven process story(5 stages), projects(5, with images), interactive project planner (timeline estimator + contact prefill via CustomEvent), tech stack, count-up stats, team(4), testimonials(3), blog preview(3, cover images), FAQ(5), contact form
- Pages: /services/[slug], /about, /careers, /blog, /blog/[slug], /contact, /privacy-policy, /terms — all SSR (force-dynamic), direct DB calls from server components via /app/lib/db.js
- Admin (/admin): JWT login, modules Leads / Services / Projects / Team / Jobs / Blog / Settings + change password. Client SPA, token in localStorage.
- API: catch-all /app/app/api/[[...path]]/route.js — auth/login, auth/me, auth/change-password, POST /api/leads (public: validation + honeypot 'website' field + in-memory IP rate limit 5/10min), admin CRUD for all collections (Bearer token). UUIDs only, _id excluded.
- DB: MongoDB (MONGO_URL + DB_NAME env). Collections: users, leads, services, projects, team, jobs, blog, settings, meta(seed_lock). Idempotent race-safe seeding in lib/db.js ensureSeeded().
- SEO: metadata + OG per page, JSON-LD (Organization on home, BlogPosting on posts), sitemap.js, robots.js (disallow /admin,/api)
- Testing: backend 29/29 pass; frontend full pass (planner, contact->lead, admin CRUD).

## Credentials
- Admin: admin@infynod.com / Infynod@2025 (see /app/memory/test_credentials.md)

## Deferred / Future (user decisions)
- Email notification on new lead (SendGrid) — user said "baad mein add karenge". MUST use integration_playbook_expert when implementing; needs user's SendGrid API key.
- Real team member details/photos (seeded names are placeholders, editable via admin)
- Lighthouse 90+ formal audit (STEP 5 partially done: SSR, lazy images, swap fonts)

## Key implementation notes
- Reveal scroll animations hidden only under html.js class (progressive enhancement); hero uses pure CSS fade-up
- Planner -> ContactForm communication via window CustomEvent 'infynod-planner'
- JWT_SECRET in /app/.env

## Update — Admin-editable content + Design v3 (DONE & FULLY TESTED)
- New admin tabs: Testimonials, FAQs, Process Steps (full CRUD, reflect on home via SSR)
- Settings extended (admin-editable): hero_tag/heading/highlight/subtext, industries[], tech_stack[], stats[{value|label}], hr_phone
- HR & Careers phone: +91 92720 03735 — shown on /contact (labeled) and /careers pill
- Services enriched: tools[] + outcomes[] per service (admin-editable); detail page has breadcrumb, outcomes dark card, tools pills, 3 engagement model cards, CTA banner
- Hero v3: availability badge (pulse dot), 5-star trust row, glow blob; section-tag font simplified (Manrope, not mono); body 16px optimizeLegibility
- Migrations: /app/scripts/migrate.js (content collections), /app/scripts/migrate2.js (hr_phone + service extras) — both idempotent-ish, already run
- Testing: backend 22/22 (new endpoints), frontend 100% pass incl. content-reflection round-trips

## Update — Design v4 + Tech Stack v2 (DONE & TESTED)
- Fonts: Sora (headings) + Plus Jakarta Sans (body) + JetBrains Mono
- Hero: animated AI neural-network SVG infographic (YOUR DATA -> AI core -> GROWTH), copy "Supercharge your business with AI-powered software", capability chips (AI Chatbots/Automation/Business Impact)
- WhatsApp floating button site-wide (wa.me/919765303735), hidden on /admin
- Case study pages /projects/[slug] (finsight, mediqueue, freightflow, retailpulse, hireloop): challenge/solution/results/tech/CTA — admin-editable (projects fields: slug, industry, duration, challenge, solution, results[])
- Services pages have hero image (image_url, admin-editable)
- Tech stack: 6 admin-editable category cards ("Category | item1, item2" format in settings.tech_stack) with 44 brand icons (simpleicons CDN; OpenAI via jsdelivr npm simple-icons@13; AWS via devicon). Categories: AI&ML, Frontend(8), Backend&DBs(10), Mobile(6), Cloud&DevOps(6), Digital Marketing(8 — Google Analytics/Ads, Meta Ads, Search Console, Semrush, Mailchimp, HubSpot, WordPress)
- suppressHydrationWarning on <html> (js-class script) — 0 console errors
- Migrations run: migrate3.js (hero copy, service images, case studies). All testing-agent verified 100%.
