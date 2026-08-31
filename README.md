# Portfolio (Next.js + Prisma + NextAuth)

A full-stack personal portfolio: a public site (hero, about, projects, contact) plus
a password-protected `/admin` dashboard where you log in and edit your profile and
projects — no redeploying needed.

## Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API routes (same app, no separate server)
- **Database**: SQLite via Prisma ORM (zero setup locally — just a file)
- **Auth**: NextAuth (Credentials provider) protecting `/admin`

## 1. Install

```bash
npm install
```

## 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and set:
- `NEXTAUTH_SECRET` — generate one with `openssl rand -base64 32`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the login you'll use at `/admin/login`
  (only used once, by the seed script, to create your account)

`DATABASE_URL="file:./dev.db"` is fine as-is for local dev.

## 3. Set up the database

```bash
npx prisma migrate dev --name init
npm run seed
```

This creates `prisma/dev.db`, your admin account, and a sample profile/projects
so the site isn't empty on first run.

## 4. Run it

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login (use the email/password from `.env`)

Log in, edit your profile and projects, save — the public page reflects it
immediately (no rebuild).

## Deploying

- **App**: push to GitHub, import into [Vercel](https://vercel.com), set the same
  env vars in the Vercel dashboard.
- **Database**: SQLite doesn't work well on Vercel's serverless filesystem (it's
  ephemeral). For production, swap to Postgres:
  1. Create a free Postgres DB on [Neon](https://neon.tech) or [Supabase](https://supabase.com)
  2. Change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma`
  3. Set `DATABASE_URL` to the Postgres connection string
  4. Run `npx prisma migrate deploy`

## Project structure

```
app/
  page.tsx                 → public homepage (server component, reads DB directly)
  admin/login/page.tsx      → login form
  admin/page.tsx            → protected dashboard (server wrapper)
  admin/AdminDashboard.tsx  → dashboard UI + CRUD (client component)
  api/profile/route.ts      → GET (public) / PUT (protected)
  api/projects/route.ts     → GET (public) / POST (protected)
  api/projects/[id]/route.ts→ PUT / DELETE (protected)
  api/auth/[...nextauth]/   → NextAuth handler
lib/
  auth.ts                   → NextAuth config (Credentials provider)
  prisma.ts                 → Prisma client singleton
prisma/
  schema.prisma             → Admin, Profile, Project models
  seed.ts                   → creates your admin account + sample data
middleware.ts                → redirects unauthenticated users away from /admin
```

## What I'd extend first

1. **Image uploads for projects** — right now `imageUrl` is just a text field.
   Wire up [UploadThing](https://uploadthing.com) or S3 so you can upload
   screenshots from the dashboard instead of pasting URLs.
2. **A blog** — add a `Post` model (title, slug, content as Markdown/MDX,
   publishedAt) with the same CRUD pattern as `Project`, and render posts with
   `next-mdx-remote` or `react-markdown`.
3. **Drag-to-reorder projects** — the `order` field already exists; add a
   drag-and-drop list (`@dnd-kit/core`) in the dashboard that updates `order`
   on drop instead of typing numbers.
4. **Contact form → email** — add a `POST /api/contact` route using
   [Resend](https://resend.com) so visitors can message you directly instead
   of only seeing a mailto link.
5. **SEO basics** — per-page `metadata` exports, an `og:image`, and a
   `sitemap.xml`/`robots.txt` (Next.js supports both as file conventions).
6. **Password reset** — right now the only way to change the admin password
   is re-running the seed script; a "forgot password" email flow is a natural
   next step once you add a contact-form-style email provider anyway.
