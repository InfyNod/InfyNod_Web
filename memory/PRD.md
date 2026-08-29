# PRD — Infynod Tech Private Limited Official Website

## Overview
Corporate website for Infynod Tech Pvt Ltd (IT services & product company, Pune, India).
Theme: Gold & Black on light backgrounds, gold gradient accents. Fonts: Space Grotesk (headings 600), Manrope (body), JetBrains Mono. 22px card radius, pill buttons, custom SVG "Infynod" node wordmark logo.

## Contact (confirmed by user)
- Phone: +91 97653 03735 | Email: info@infynod.com | Pune, Maharashtra, India

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
