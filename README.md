# Car Import Platform (Phase 1 MVP)

Production-ready technical foundation for a vehicle import marketplace that connects:
- **Clients** who want to buy cars from Germany or other European countries
- **Importers** who handle sourcing operations (inspection, paperwork, negotiation, pickup, transport)

> Phase 1 intentionally excludes scraping, payments, AI, WhatsApp integration, and customs calculations.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui-style component system
- Prisma ORM
- PostgreSQL
- Auth.js (credentials provider)
- Zod
- React Hook Form

## What is included in Phase 1

- Role-based auth: `ADMIN`, `IMPORTER`, `CLIENT`
- Secure credentials sign-up / sign-in / sign-out
- Protected dashboards with server-side role checks
- Prisma schema with foundational domain models
- Importer public profile page by slug
- Edit profile forms for importers and clients
- Seed data with demo users and importer profile

## Data Models

- `User`
- `ImporterProfile` (1:1 with `User`)
- `ClientProfile` (1:1 with `User`)
- `Request` (ready for future request workflow)

## Routes

- `/`
- `/sign-in`
- `/sign-up`
- `/dashboard`
- `/dashboard/client`
- `/dashboard/client/profile`
- `/dashboard/importer`
- `/dashboard/importer/profile`
- `/dashboard/admin`
- `/importers/[slug]`
- `/requests/new` (placeholder)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

```bash
cp .env.example .env
```

Update `.env` with your PostgreSQL connection and auth secret.

### 3) Generate Prisma client and run migrations

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

### 4) Seed demo data

```bash
npm run prisma:seed
```

### 5) Start development server

```bash
npm run dev
```

Open http://localhost:3000.

## Demo Accounts

- Admin: `admin@example.com` / `password123`
- Importer: `importer@example.com` / `password123`
- Client: `client@example.com` / `password123`

## Suggested folder structure

```text
src
├── actions/                # server actions (auth, profile)
├── app/                    # routes/pages (App Router)
├── components/
│   ├── auth/               # auth-focused components
│   ├── forms/              # RHF + Zod forms
│   └── ui/                 # reusable UI primitives
├── lib/                    # prisma, auth, schemas, guards, utils
└── types/                  # shared type augmentation
prisma/
├── schema.prisma
└── seed.ts
```

## Security Notes

- Passwords are hashed with bcrypt (`12` salt rounds).
- Dashboard routes are protected via Auth.js middleware.
- Role checks are enforced on the server.
- Profile updates are bound to the authenticated user ID.

## Next Recommended Phase

1. Implement request creation flow and assignment lifecycle.
2. Add importer discovery/search and filtering.
3. Add request timeline and status transitions.
4. Add audit logging and operational admin controls.
5. Add observability (error monitoring, structured logs) and test coverage.
