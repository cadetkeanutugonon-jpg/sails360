# SAILS 360

Student organization website for the BSMT campaign.
**One crew. One direction. One standard.** · Listen. Develop. Unite.

> SAILS 360 is a student organization platform. This is not an official
> institutional website.

## Current status (Release 1, demo mode)

This release is a campaign showcase. **No backend is connected.** It runs in a
clearly labeled demo mode.

| Area | State |
| --- | --- |
| Public site (home, About, 5 pillar pages, 10 programs, announcements, events, resources, recognition, Maritime Excellence, Career Connect, Transparency, Feedback, Contact, Privacy, 404) | Working, static, with sample content marked **Demo content** |
| Digital Hub (`/digital-hub`) | Working, phone-first app layout with tab bar |
| Forms (feedback, private concern, contact, nomination) | Validated on the server. **Nothing is stored or sent** in demo mode, and the UI says so |
| Admin editor (`/admin`) | Locked behind a server-side check. Demo session only. Announcements and events editor keeps changes **in this browser only** |
| Supabase schema, RLS, seed | Written in `supabase/`, **not applied to any project, not tested against a database** |
| Real authentication, uploads, event registration, reports, audit-log UI, role management | Not built yet (need Supabase) |

## Run locally

Requires Node 22+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

Fonts (Archivo, Public Sans) are self-hosted in `src/app/fonts`, so builds do
not need Google Fonts.

## Project layout

```
src/app/            routes (App Router)
src/components/     ui/, layout/, navigation/, forms/, programs/, dashboard/, digital-hub/
src/data/           pillars, programs, demo content, site config  <- edit content here
src/lib/            config, auth session, server actions, validation
src/types/          shared content types
supabase/           migrations/ and seed.sql (not yet applied)
tests/              Vitest unit tests
```

## Pillar to program mapping (assumption)

The presentation names five pillars and ten programs but the exact mapping was
not available to this build. This grouping is an assumption; confirm it with
the officers and change `pillar` in `src/data/programs.ts` (and `seed.sql`).

| Pillar | Programs |
| --- | --- |
| Academics | SAILS Academic Network, SAILS Digital Hub |
| Leadership | Cadet Mentorship Program, SAILS Leadership Academy, SAILS Transparency |
| Welfare | SAILS 360 Student Support |
| Camaraderie | One BSMT Community, Student Recognition Program |
| Maritime Excellence | Maritime Excellence Program, SAILS Career Connect |

## Replacing demo content with verified content

1. Edit `src/data/demo.ts`: delete the sample announcements, events and
   resources, or replace them with verified items (set `isDemo: false`).
2. Edit `src/data/programs.ts`: replace general descriptions and
   "to be confirmed" participation details with officer-approved text.
3. Fill the placeholders: mission and vision, officers and adviser (About),
   official contact channels (Contact), retention period and privacy contact
   (Privacy). Do not publish names or details that have not been authorized.
4. Never publish an event as confirmed until it is approved.

## Connecting Supabase (not done yet)

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Keep `SUPABASE_SERVICE_ROLE_KEY`
   server-only. Never commit `.env.local`.
3. Review `supabase/migrations/20261011000000_init_schema.sql`, then apply it
   (Supabase CLI `supabase db push`, or the SQL editor), then run
   `supabase/seed.sql`.
4. **Test the RLS policies** with real users for each role before launch. They
   have not been run against a database.
5. Implement the TODOs: `getSession()` in `src/lib/auth/session.ts` (resolve
   the Supabase Auth user and role) and the insert step in
   `src/lib/actions/submit.ts`.

When the Supabase variables are set, demo mode turns off, demo sessions are
refused, and `/admin` stays locked until real auth is implemented.

### First administrator (after Supabase is connected)

1. Sign up normally. New users always get the `student` role.
2. In the Supabase SQL editor (privileged context):
   `update public.profiles set role = 'admin' where id = '<that user id>';`
3. Only admins can change roles afterward. A database trigger blocks anyone
   else from changing a role, including their own.

## Security and privacy notes

- RLS is enabled on every table. Private concerns are readable only by
  `admin` and `reviewer`, not by content editors, and never publicly.
- Admin routes are blocked before rendering by `src/proxy.ts` (unauthenticated
  requests get a redirect and no admin content), and re-checked in
  `src/app/admin/(protected)/layout.tsx`. The demo session is not real
  authentication and is refused when Supabase is configured.
- Forms are validated with Zod on the server, with a honeypot field. Add real
  rate limiting (for example at the host or WAF) before launch.
- Storage has a public and a private bucket; serve private files with signed
  URLs. File type and size limits are set on the buckets.
- Audit triggers record who changed what, never form contents.
- The privacy notice is a **draft** following the principles of the Data
  Privacy Act of 2012 (RA 10173). It is not certified; have an authorized
  privacy or institutional representative review it.

## Deploying to Vercel

1. Push the repository to GitHub and import it in Vercel.
2. Add the environment variables from `.env.example` (leave Supabase empty to
   stay in demo mode).
3. Deploy. This has **not** been deployed yet.

## Known limitations

- No deployment, no connected database, no real login.
- Demo editor changes are browser-local and do not change the public site.
- No end-to-end (Playwright) tests yet; 17 unit tests cover content integrity,
  form validation and the form action. Access control and links were checked by
  hand against a production build, not by an automated test.
- Logo is a placeholder compass mark; replace it when the official logo is
  supplied. No photo gallery or event registration yet.
