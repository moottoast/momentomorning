# Momento Morning — Design Spec

## Overview

Momento Morning is a single-screen daily stoic quote web app at momentomorning.com. One quote per day, no interaction, no accounts, no archive. A quiet morning practice inspired by The Daily Stoic but with the quote itself as the hero rather than the headline.

The design intentionally reflects modern stoicism's contemplative character and avoids any association with "broicism" or hustle culture.

## Content Model

Each daily entry has four fields:

| Field | Description |
|-------|-------------|
| `quote_text` | The stoic quote |
| `attribution` | Source, e.g., "Marcus Aurelius, Meditations V.16" |
| `reflection` | A reflection prompt connecting the quote to daily life |
| `virtue` | One of: wisdom, courage, justice, temperance |

Entries are stored in a `quotes` table with a `date` column (Postgres `date` type). A unique constraint on `date` prevents duplicates.

### Lookup Logic

The app determines the visitor's local date (month and day), then queries for the most recent year that has a quote for that month/day:

```sql
SELECT * FROM quotes
WHERE EXTRACT(MONTH FROM date) = :month
  AND EXTRACT(DAY FROM date) = :day
ORDER BY date DESC
LIMIT 1
```

This allows year-over-year rotation: if 2027 has a quote for May 10th, it takes priority. Otherwise, the 2026 entry is used. Significant dates (holidays, solstices, etc.) can be curated with year-specific quotes while the rest of the calendar falls back gracefully.

Quote content is a separate workstream and is not part of this spec.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Backend/Data | Supabase (Postgres) |
| Icons | Phosphor Icons (light weight) |
| Deployment | Vercel |

No server layer. The React app queries Supabase directly using the Supabase JS client. Row Level Security (RLS) enforces read-only public access — anonymous users can `SELECT` from `quotes`, nothing else. Content is managed through the Supabase dashboard or a separate admin workflow.

## Frontend Design

### Layout

A single full-viewport page with vertically and horizontally centered content. No navigation, no header, no sidebar. The page has two sections:

1. **Main content** (flex-centered): virtue label, quote, attribution, reflection prompt
2. **Footer** (bottom-anchored): project info

### Visual Hierarchy (top to bottom)

1. **Virtue label** — Small uppercase text with a Phosphor Light icon. Sits above the quote as a quiet design element, not a heading. Icons:
   - Wisdom: `ph-bird`
   - Courage: `ph-shield`
   - Justice: `ph-scales`
   - Temperance: `ph-waves`

2. **Quote** — The hero. Large, light-weight (300) sans-serif text. Maximum width of 600px for comfortable reading. This is the first thing the eye lands on.

3. **Attribution** — Small, muted text below the quote. Format: "Author · *Work*, Reference"

4. **Reflection prompt** — Medium-small text below the attribution, slightly more prominent than the attribution but clearly secondary to the quote. A question that connects the ancient wisdom to the reader's day.

5. **Footer** — Small, muted: "Momento Morning · A quiet daily practice" / "Made with ♥ by 13 Guys Named Ed in sunny Clearwater, Florida"

### Visual Style

- **Palette:** Cool minimal — background `#f8f9fb`, primary text `#1e293b`, secondary text `#94a3b8`, reflection text `#475569`
- **Typography:** Inter (weights 300 and 400). System font stack as fallback.
- **Spacing:** Generous. The page should feel like a deep breath.
- **Responsive:** Quote font scales down on mobile (1.75rem → 1.35rem). Padding adjusts. The layout remains centered and single-column at all breakpoints.

### Interaction

None. No buttons, no clicks, no hover states beyond the browser default. The app is pure consumption — you read it, you sit with it, you close the tab.

## Data Flow

1. Visitor opens momentomorning.com
2. React app mounts, determines the visitor's local date (month and day)
3. App queries Supabase for the matching quote (most recent year with that month/day)
4. Quote renders with a simple fade or instant display
5. If no quote is found for the date, a graceful fallback is shown (a generic stoic quote or a brief message)

## Supabase Configuration

### Table: `quotes`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid | Primary key, default `gen_random_uuid()` |
| `date` | date | Not null, unique |
| `quote_text` | text | Not null |
| `attribution` | text | Not null |
| `reflection` | text | Not null |
| `virtue` | text | Not null, check in ('wisdom', 'courage', 'justice', 'temperance') |
| `created_at` | timestamptz | Default `now()` |

### Row Level Security

- Enable RLS on `quotes` table
- Single policy: allow anonymous `SELECT` access
- No insert/update/delete policies for anonymous users

### Environment

- Supabase project URL and anon key stored as environment variables
- Anon key is safe to expose client-side (RLS enforces access control)

## Deployment

- Vercel project connected to the git repository
- Vite builds to static assets, Vercel serves them
- Environment variables (Supabase URL, anon key) configured in Vercel project settings
- No server-side rendering needed — this is a client-side SPA

## Out of Scope

- Quote content curation (separate workstream)
- User accounts or authentication
- Archive or history browsing
- Monetization
- Analytics
- Admin interface (use Supabase dashboard)
- Dark mode (could be added later but not in initial scope)
- SEO/meta tags beyond basics
