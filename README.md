# Momento Morning

A quiet daily stoic practice. One quote, one moment, each morning.

Momento Morning serves a single stoic quote each day — no feeds, no archives, no accounts. You open it, you read it, you sit with it. The quote is the hero, accompanied by a reflection prompt and a subtle virtue label tying it back to one of stoicism's four cardinal virtues: wisdom, courage, justice, and temperance.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS v4
- **Data:** Supabase (Postgres)
- **Icons:** Phosphor Icons (light weight)
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Setup

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` with your Supabase project URL and anon key (found in Supabase Dashboard > Settings > API).

### Database

Run the migration in your Supabase SQL Editor:

1. Go to your Supabase project > **SQL Editor**
2. Paste the contents of [`supabase/migrations/001_create_quotes.sql`](supabase/migrations/001_create_quotes.sql)
3. Click **Run**

This creates the `quotes` table, enables Row Level Security (read-only public access), and seeds a few sample quotes.

### Content Development

The [`content/`](content/) folder is the working space for drafting and reviewing quotes before import. It includes a [Content Guide](content/CONTENT-GUIDE.md) with schema rules, quality standards, and coverage goals, plus an [Agent Prompts](content/AGENT-PROMPTS.md) reference for using AI agents to help develop content at scale.

### Importing Quotes

See the [Importing Quotes Guide](docs/importing-quotes.md) for instructions on loading finalized content from CSV files into Supabase.

### Development

```bash
npm run dev
```

### Deploying to Vercel

See the [Deployment Guide](docs/deploying-to-vercel.md) for connecting Supabase and deploying to Vercel without exposing secrets.

### Tests

```bash
npx vitest run
```

## How It Works

The app determines the visitor's local date, then queries Supabase for the most recent quote matching that month and day. This allows year-over-year rotation — add quotes for 2027 and they'll automatically take priority over 2026 entries for the same dates.

If no quote exists for today, a fallback quote from Seneca is displayed.

## Content Model

Each daily entry has four fields:

| Field | Description |
|-------|-------------|
| `quote_text` | The stoic quote |
| `attribution` | Source (e.g., "Marcus Aurelius, Meditations V.16") |
| `reflection` | A prompt connecting the quote to daily life |
| `virtue` | One of: `wisdom`, `courage`, `justice`, `temperance` |

---

Made with love by 13 Guys Named Ed in sunny Clearwater, Florida.
