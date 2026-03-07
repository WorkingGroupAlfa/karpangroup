# Karpan Climate Service

Production-ready multilingual service website for the Slovak market, built with Next.js App Router, TypeScript, Tailwind CSS and Framer Motion.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Custom first-party analytics with GDPR consent gate
- Multilingual routing for `sk`, `ua`, `de`, `sl`, `en`

## Features

- SEO-ready page architecture with per-locale metadata
- Service landing pages optimized for indexing
- Consent banner with analytics activation only after explicit acceptance
- Booking form with validation, honeypot, timestamp check, and storage
- First-party event tracking (page views, CTA clicks, form submissions, language usage)
- Admin stats dashboard with basic auth via middleware
- Sticky mobile conversion bar for WhatsApp, email and booking
- Glassmorphism-based premium UI system with restrained brand orange usage

## Run locally

1. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in the values in `.env.local`.

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Where to edit things

- **Texts / translations:** `content/locales/*.json`
- **Navigation and service structure:** `lib/site.ts`
- **Contacts, URLs, company data:** `.env.local` and `lib/config.ts`
- **Logo:** replace `public/logo-karpan.png` with your real PNG logo
- **Analytics / consent:** `components/consent-banner.tsx`, `lib/analytics.ts`, `app/api/analytics/route.ts`
- **Booking handling:** `app/api/booking/route.ts`, `lib/storage.ts`, `components/booking-form.tsx`
- **Admin stats UI:** `app/[locale]/admin/stats/page.tsx`

## Environment variables

Required:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `BOOKING_RECEIVER_EMAIL`
- `ADMIN_BASIC_USER`
- `ADMIN_BASIC_PASS`

Optional:

- SMTP settings (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`) if you want to wire real email delivery later
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` if you later layer Plausible on top of first-party analytics

## Notes

- Analytics are only sent after consent is granted.
- Contact CTA is intentionally designed around WhatsApp, email and booking — no phone-first UX.
- Legal pages are included and easy to adapt to final company registration details.
- The admin dashboard uses HTTP Basic Auth through `middleware.ts`.
