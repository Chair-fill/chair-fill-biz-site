This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Waitlist admin API (protected)

To fetch the full waitlist or filter by date/duration, use the admin endpoint with a secret.

- **Endpoint:** `GET /api/admin/waitlist`
- **Auth:** Set `WAITLIST_ADMIN_SECRET` in your environment (Netlify: Site settings → Environment variables). Send it as:
  - `Authorization: Bearer <your-secret>` or
  - `x-api-key: <your-secret>`
- **Query params (optional):**
  - `days=<number>` — entries from the last N days (e.g. `?days=7`)
  - `from=<ISO date>&to=<ISO date>` — entries between two dates (e.g. `?from=2025-01-01&to=2025-01-31`)
  - `from=<ISO date>` — entries on or after this date
  - `to=<ISO date>` — entries on or before this date
- **Response:** `{ "total": number, "entries": [ { "email", "name", "createdAt", "source" }, ... ] }`

Without any query params, returns the entire list (newest first).

**Examples:**

```bash
# Full list
curl -H "Authorization: Bearer YOUR_SECRET" "https://yoursite.com/api/admin/waitlist"

# Last 7 days
curl -H "x-api-key: YOUR_SECRET" "https://yoursite.com/api/admin/waitlist?days=7"

# Date range
curl -H "Authorization: Bearer YOUR_SECRET" "https://yoursite.com/api/admin/waitlist?from=2025-01-01&to=2025-01-31"
```
