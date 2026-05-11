# Memento Morning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-screen daily stoic quote web app that queries Supabase for the day's quote and renders it in a contemplative, minimalist layout.

**Architecture:** React SPA built with Vite and styled with Tailwind CSS. The client determines the visitor's local date, queries Supabase directly (no server layer) for the matching quote, and renders it. Supabase provides Postgres with Row Level Security for read-only public access.

**Tech Stack:** React 19, Vite, Tailwind CSS v4, Supabase JS client, Phosphor Icons (light weight), Vitest + React Testing Library, deployed to Vercel.

**Design Spec:** `docs/superpowers/specs/2026-05-10-memento-morning-design.md`

---

## File Structure

```
mementomorning/
├── index.html                    # Vite entry point with Inter font, meta tags
├── vite.config.ts                # Vite config
├── tailwind.config.ts            # Tailwind config with custom colors/fonts
├── tsconfig.json                 # TypeScript config
├── package.json
├── .env.local                    # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
├── .env.example                  # Template for env vars (committed)
├── .gitignore                    # Node, env, dist, .superpowers
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # Root component — orchestrates data fetch and render
│   ├── lib/
│   │   └── supabase.ts           # Supabase client init
│   ├── hooks/
│   │   └── useQuote.ts           # Hook: get today's quote from Supabase
│   ├── components/
│   │   ├── QuotePage.tsx         # Full-page layout: virtue label, quote, attribution, reflection
│   │   ├── VirtueLabel.tsx       # Icon + uppercase virtue name
│   │   └── Footer.tsx            # "Made with ♥ by 13 Guys Named Ed..."
│   └── types/
│       └── quote.ts              # Quote type definition
├── tests/
│   ├── setup.ts                  # Vitest setup (jsdom, RTL cleanup)
│   ├── hooks/
│   │   └── useQuote.test.ts      # Hook tests with mocked Supabase
│   └── components/
│       ├── QuotePage.test.tsx     # Layout and rendering tests
│       ├── VirtueLabel.test.tsx   # Icon mapping tests
│       └── Footer.test.tsx       # Footer content test
└── supabase/
    └── migrations/
        └── 001_create_quotes.sql # Table creation, RLS, seed data
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `index.html`, `src/main.tsx`, `.env.example`, `.gitignore`

- [ ] **Step 1: Scaffold Vite + React + TypeScript project**

```bash
npm create vite@latest . -- --template react-ts
```

Accept overwrite prompts if needed. This creates the base project structure.

- [ ] **Step 2: Install dependencies**

```bash
npm install @supabase/supabase-js @phosphor-icons/react
npm install -D tailwindcss @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Configure Vite with Tailwind**

Replace `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 4: Set up Tailwind CSS entry point**

Replace the contents of `src/index.css` with:

```css
@import "tailwindcss";

@theme {
  --color-bg: #f8f9fb;
  --color-primary: #1e293b;
  --color-secondary: #94a3b8;
  --color-reflection: #475569;
  --color-heart: #cbd5e1;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

- [ ] **Step 5: Add Inter font to index.html**

Update `index.html` — add to `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap" rel="stylesheet">
```

Update the `<title>` to `Memento Morning`.

- [ ] **Step 6: Create .env.example**

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

- [ ] **Step 7: Update .gitignore**

Ensure `.gitignore` includes:

```
node_modules
dist
.env
.env.local
.superpowers/
```

- [ ] **Step 8: Clean up Vite scaffolding**

Remove default Vite files that won't be used:
- Delete `src/App.css`
- Delete `src/assets/` directory
- Replace `src/App.tsx` with a minimal placeholder:

```tsx
export default function App() {
  return <div>Memento Morning</div>;
}
```

- Replace `src/main.tsx` with:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 9: Verify the dev server starts**

```bash
npm run dev
```

Expected: Dev server starts, browser shows "Memento Morning" on a `#f8f9fb` background with Inter font.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + Tailwind project"
```

---

## Task 2: Types and Supabase Client

**Files:**
- Create: `src/types/quote.ts`, `src/lib/supabase.ts`

- [ ] **Step 1: Define the Quote type**

Create `src/types/quote.ts`:

```ts
export type Virtue = "wisdom" | "courage" | "justice" | "temperance";

export interface Quote {
  id: string;
  date: string;
  quote_text: string;
  attribution: string;
  reflection: string;
  virtue: Virtue;
  created_at: string;
}
```

- [ ] **Step 2: Create the Supabase client**

Create `src/lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 3: Commit**

```bash
git add src/types/quote.ts src/lib/supabase.ts
git commit -m "feat: add Quote type and Supabase client"
```

---

## Task 3: useQuote Hook

**Files:**
- Create: `src/hooks/useQuote.ts`, `tests/hooks/useQuote.test.ts`, `tests/setup.ts`

- [ ] **Step 1: Set up Vitest config**

Add to `vite.config.ts` (inside `defineConfig`):

```ts
test: {
  environment: "jsdom",
  globals: true,
  setupFiles: ["./tests/setup.ts"],
},
```

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Add to `tsconfig.json` under `compilerOptions`:

```json
"types": ["vitest/globals"]
```

- [ ] **Step 2: Write the failing test**

Create `tests/hooks/useQuote.test.ts`:

```ts
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useQuote } from "../../src/hooks/useQuote";

vi.mock("../../src/lib/supabase", () => {
  const mockFrom = vi.fn();
  return {
    supabase: { from: mockFrom },
    __mockFrom: mockFrom,
  };
});

import { __mockFrom } from "../../src/lib/supabase";

function mockSupabaseResponse(data: unknown, error: unknown = null) {
  (__mockFrom as ReturnType<typeof vi.fn>).mockReturnValue({
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue({ data, error }),
          }),
        }),
      }),
    }),
  });
}

describe("useQuote", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a quote for today's date", async () => {
    const mockQuote = {
      id: "abc-123",
      date: "2026-05-10",
      quote_text: "Test quote",
      attribution: "Test Author",
      reflection: "Test reflection?",
      virtue: "wisdom",
      created_at: "2026-05-10T00:00:00Z",
    };

    mockSupabaseResponse([mockQuote]);

    const { result } = renderHook(() => useQuote());

    await waitFor(() => {
      expect(result.current.quote).toEqual(mockQuote);
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets error when query fails", async () => {
    mockSupabaseResponse(null, { message: "Network error" });

    const { result } = renderHook(() => useQuote());

    await waitFor(() => {
      expect(result.current.error).toBe("Network error");
    });
    expect(result.current.quote).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("sets quote to null when no data returned", async () => {
    mockSupabaseResponse([]);

    const { result } = renderHook(() => useQuote());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.quote).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npx vitest run tests/hooks/useQuote.test.ts
```

Expected: FAIL — `useQuote` does not exist.

- [ ] **Step 4: Implement useQuote**

Create `src/hooks/useQuote.ts`:

```ts
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { Quote } from "../types/quote";

export function useQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuote() {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      const { data, error: queryError } = await supabase
        .from("quotes")
        .select("*")
        .eq("month", month)
        .eq("day", day)
        .order("date", { ascending: false })
        .limit(1);

      if (queryError) {
        setError(queryError.message);
      } else if (data && data.length > 0) {
        setQuote(data[0] as Quote);
      }

      setLoading(false);
    }

    fetchQuote();
  }, []);

  return { quote, loading, error };
}
```

Note: The query uses `.eq("month", month).eq("day", day)` — this requires a Postgres view or computed columns. See Task 7 for the database setup that makes this work. An alternative is to use `.rpc()` with a Postgres function. We'll use an RPC approach instead:

Replace the implementation with:

```ts
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { Quote } from "../types/quote";

export function useQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuote() {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      const { data, error: queryError } = await supabase
        .rpc("get_quote_for_date", { p_month: month, p_day: day });

      if (queryError) {
        setError(queryError.message);
      } else if (data && data.length > 0) {
        setQuote(data[0] as Quote);
      }

      setLoading(false);
    }

    fetchQuote();
  }, []);

  return { quote, loading, error };
}
```

Update the mock in the test to match the RPC approach:

Replace the `vi.mock` block and `mockSupabaseResponse` in the test with:

```ts
vi.mock("../../src/lib/supabase", () => {
  const mockRpc = vi.fn();
  return {
    supabase: { rpc: mockRpc },
    __mockRpc: mockRpc,
  };
});

import { __mockRpc } from "../../src/lib/supabase";

function mockSupabaseResponse(data: unknown, error: unknown = null) {
  (__mockRpc as ReturnType<typeof vi.fn>).mockResolvedValue({ data, error });
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx vitest run tests/hooks/useQuote.test.ts
```

Expected: All 3 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useQuote.ts tests/hooks/useQuote.test.ts tests/setup.ts vite.config.ts tsconfig.json
git commit -m "feat: add useQuote hook with tests"
```

---

## Task 4: VirtueLabel Component

**Files:**
- Create: `src/components/VirtueLabel.tsx`, `tests/components/VirtueLabel.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/VirtueLabel.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VirtueLabel } from "../../src/components/VirtueLabel";

describe("VirtueLabel", () => {
  it("renders the virtue name in uppercase", () => {
    render(<VirtueLabel virtue="wisdom" />);
    expect(screen.getByText("Wisdom")).toBeInTheDocument();
  });

  it("renders the correct icon for each virtue", () => {
    const { container: w } = render(<VirtueLabel virtue="wisdom" />);
    expect(w.querySelector("svg")).toBeInTheDocument();

    const { container: c } = render(<VirtueLabel virtue="courage" />);
    expect(c.querySelector("svg")).toBeInTheDocument();

    const { container: j } = render(<VirtueLabel virtue="justice" />);
    expect(j.querySelector("svg")).toBeInTheDocument();

    const { container: t } = render(<VirtueLabel virtue="temperance" />);
    expect(t.querySelector("svg")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/VirtueLabel.test.tsx
```

Expected: FAIL — `VirtueLabel` does not exist.

- [ ] **Step 3: Implement VirtueLabel**

Create `src/components/VirtueLabel.tsx`:

```tsx
import { Bird, Shield, Scales, Waves } from "@phosphor-icons/react";
import type { Virtue } from "../types/quote";

const virtueIcons: Record<Virtue, React.ElementType> = {
  wisdom: Bird,
  courage: Shield,
  justice: Scales,
  temperance: Waves,
};

export function VirtueLabel({ virtue }: { virtue: Virtue }) {
  const Icon = virtueIcons[virtue];
  const label = virtue.charAt(0).toUpperCase() + virtue.slice(1);

  return (
    <div className="flex items-center justify-center gap-2 text-secondary tracking-[0.25em] uppercase text-xs mb-10">
      <Icon size={14} weight="light" />
      {label}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/components/VirtueLabel.test.tsx
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/VirtueLabel.tsx tests/components/VirtueLabel.test.tsx
git commit -m "feat: add VirtueLabel component with icon mapping"
```

---

## Task 5: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`, `tests/components/Footer.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/Footer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "../../src/components/Footer";

describe("Footer", () => {
  it("renders the project name", () => {
    render(<Footer />);
    expect(screen.getByText(/Memento Morning/)).toBeInTheDocument();
  });

  it("renders the creator credit", () => {
    render(<Footer />);
    expect(screen.getByText(/13 Guys Named Ed/)).toBeInTheDocument();
  });

  it("mentions Clearwater, Florida", () => {
    render(<Footer />);
    expect(screen.getByText(/Clearwater, Florida/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/Footer.test.tsx
```

Expected: FAIL — `Footer` does not exist.

- [ ] **Step 3: Implement Footer**

Create `src/components/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="p-8 text-center text-xs text-secondary tracking-wide leading-relaxed">
      <p>Memento Morning · A quiet daily practice</p>
      <p>
        Made with <span className="text-heart">♥</span> by 13 Guys Named Ed in
        sunny Clearwater, Florida
      </p>
    </footer>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/components/Footer.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx tests/components/Footer.test.tsx
git commit -m "feat: add Footer component"
```

---

## Task 6: QuotePage Component and App Integration

**Files:**
- Create: `src/components/QuotePage.tsx`, `tests/components/QuotePage.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write the failing test for QuotePage**

Create `tests/components/QuotePage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QuotePage } from "../../src/components/QuotePage";

const mockQuote = {
  id: "abc-123",
  date: "2026-05-10",
  quote_text: "The happiness of your life depends upon the quality of your thoughts.",
  attribution: "Marcus Aurelius, Meditations V.16",
  reflection: "What will you give your attention to today?",
  virtue: "wisdom" as const,
  created_at: "2026-05-10T00:00:00Z",
};

describe("QuotePage", () => {
  it("renders the quote text", () => {
    render(<QuotePage quote={mockQuote} />);
    expect(screen.getByText(/quality of your thoughts/)).toBeInTheDocument();
  });

  it("renders the attribution", () => {
    render(<QuotePage quote={mockQuote} />);
    expect(screen.getByText(/Marcus Aurelius/)).toBeInTheDocument();
  });

  it("renders the reflection prompt", () => {
    render(<QuotePage quote={mockQuote} />);
    expect(screen.getByText(/attention to today/)).toBeInTheDocument();
  });

  it("renders the virtue label", () => {
    render(<QuotePage quote={mockQuote} />);
    expect(screen.getByText("Wisdom")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(<QuotePage quote={mockQuote} />);
    expect(screen.getByText(/13 Guys Named Ed/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/QuotePage.test.tsx
```

Expected: FAIL — `QuotePage` does not exist.

- [ ] **Step 3: Implement QuotePage**

Create `src/components/QuotePage.tsx`:

```tsx
import type { Quote } from "../types/quote";
import { VirtueLabel } from "./VirtueLabel";
import { Footer } from "./Footer";

export function QuotePage({ quote }: { quote: Quote }) {
  return (
    <div className="min-h-screen bg-bg font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <VirtueLabel virtue={quote.virtue} />

        <blockquote className="text-[1.75rem] leading-[1.7] font-light max-w-[600px] text-primary tracking-tight sm:text-[1.35rem] sm:leading-[1.65]">
          "{quote.quote_text}"
        </blockquote>

        <p className="text-sm text-secondary mt-8 tracking-wide">
          {quote.attribution}
        </p>

        <p className="text-[0.95rem] text-reflection mt-12 font-light tracking-wide">
          {quote.reflection}
        </p>
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/components/QuotePage.test.tsx
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Integrate into App.tsx**

Replace `src/App.tsx`:

```tsx
import { useQuote } from "./hooks/useQuote";
import { QuotePage } from "./components/QuotePage";

export default function App() {
  const { quote, loading, error } = useQuote();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-secondary text-sm tracking-wide">...</p>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-bg font-sans flex flex-col items-center justify-center p-8 text-center">
        <p className="text-[1.75rem] leading-[1.7] font-light max-w-[600px] text-primary">
          "Begin at once to live, and count each separate day as a separate life."
        </p>
        <p className="text-sm text-secondary mt-8">Seneca</p>
      </div>
    );
  }

  return <QuotePage quote={quote} />;
}
```

- [ ] **Step 6: Run all tests**

```bash
npx vitest run
```

Expected: All tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/QuotePage.tsx tests/components/QuotePage.test.tsx src/App.tsx
git commit -m "feat: add QuotePage layout and wire up App"
```

---

## Task 7: Supabase Database Setup

**Files:**
- Create: `supabase/migrations/001_create_quotes.sql`

This task is done manually in the Supabase dashboard or via the Supabase CLI. The SQL file is committed for documentation and reproducibility.

- [ ] **Step 1: Write the migration SQL**

Create `supabase/migrations/001_create_quotes.sql`:

```sql
-- Create quotes table
CREATE TABLE quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  quote_text text NOT NULL,
  attribution text NOT NULL,
  reflection text NOT NULL,
  virtue text NOT NULL CHECK (virtue IN ('wisdom', 'courage', 'justice', 'temperance')),
  created_at timestamptz DEFAULT now()
);

-- Create RPC function for date-based lookup
-- Returns the most recent quote matching the given month/day
CREATE OR REPLACE FUNCTION get_quote_for_date(p_month integer, p_day integer)
RETURNS SETOF quotes
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT *
  FROM quotes
  WHERE EXTRACT(MONTH FROM date) = p_month
    AND EXTRACT(DAY FROM date) = p_day
  ORDER BY date DESC
  LIMIT 1;
$$;

-- Enable Row Level Security
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow anonymous read access"
  ON quotes
  FOR SELECT
  TO anon
  USING (true);

-- Grant execute on the RPC function to anonymous users
GRANT EXECUTE ON FUNCTION get_quote_for_date(integer, integer) TO anon;

-- Seed with a few quotes for testing
INSERT INTO quotes (date, quote_text, attribution, reflection, virtue) VALUES
  ('2026-05-10', 'The happiness of your life depends upon the quality of your thoughts.', 'Marcus Aurelius, Meditations V.16', 'What will you give your attention to today?', 'wisdom'),
  ('2026-05-11', 'He who fears death will never do anything worthy of a man who is alive.', 'Seneca, Letters 77.6', 'What would you attempt if fear were not a factor?', 'courage'),
  ('2026-05-12', 'The best revenge is not to be like your enemy.', 'Marcus Aurelius, Meditations 6.6', 'How will you respond to unfairness today?', 'justice'),
  ('2026-05-13', 'No person is free who is not master of himself.', 'Epictetus, Fragment 35', 'Where does your discipline serve you most right now?', 'temperance');
```

- [ ] **Step 2: Run the migration in Supabase**

Option A — Supabase Dashboard:
1. Go to your Supabase project → SQL Editor
2. Paste the contents of `001_create_quotes.sql`
3. Click "Run"

Option B — Supabase CLI:
```bash
supabase db push
```

- [ ] **Step 3: Create .env.local with your Supabase credentials**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase project URL and anon key (found in Supabase dashboard → Settings → API).

- [ ] **Step 4: Commit the migration**

```bash
git add supabase/migrations/001_create_quotes.sql
git commit -m "feat: add quotes table migration with RLS and seed data"
```

---

## Task 8: Responsive Polish and Visual QA

**Files:**
- Modify: `src/components/QuotePage.tsx` (responsive classes)
- Modify: `index.html` (meta tags)

- [ ] **Step 1: Add responsive breakpoint for mobile**

The Tailwind classes in QuotePage.tsx use `sm:` prefix for mobile-first adjustments. Verify the quote text scales properly:
- Desktop: `text-[1.75rem]`
- Mobile (<640px): `text-[1.35rem]`

Note: Tailwind v4 uses mobile-first breakpoints, so `sm:` means "640px and up". Adjust the classes so the base (mobile) size is `1.35rem` and `sm:` applies the larger size:

Update the blockquote className in `src/components/QuotePage.tsx`:

```
text-[1.35rem] leading-[1.65] sm:text-[1.75rem] sm:leading-[1.7]
```

- [ ] **Step 2: Add meta tags to index.html**

Add to `<head>` in `index.html`:

```html
<meta name="description" content="A quiet daily stoic practice. One quote, one moment, each morning.">
<meta name="theme-color" content="#f8f9fb">
```

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Check in browser:
- Quote displays centered on desktop
- Virtue icon and label render above the quote
- Attribution and reflection render below
- Footer sits at the bottom
- Mobile viewport (use browser dev tools, ~375px) shows smaller text
- Background color is `#f8f9fb`
- Font is Inter

- [ ] **Step 4: Commit**

```bash
git add src/components/QuotePage.tsx index.html
git commit -m "feat: responsive typography and meta tags"
```

---

## Task 9: Vercel Deployment

**Files:** None (external configuration)

- [ ] **Step 1: Push to GitHub**

Create a GitHub repository and push:

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

- [ ] **Step 2: Connect to Vercel**

1. Go to vercel.com → "Add New Project"
2. Import the GitHub repository
3. Framework preset: Vite (should auto-detect)
4. Add environment variables:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
5. Deploy

- [ ] **Step 3: Verify deployment**

Visit the Vercel deployment URL. Confirm:
- Page loads with today's quote (or the fallback Seneca quote if today has no seed data)
- No console errors
- Layout matches the design mockup

- [ ] **Step 4: Configure custom domain (when ready)**

In Vercel project settings → Domains → add `mementomorning.com`. Follow DNS configuration instructions.

---

## Summary

| Task | What It Builds | Commits |
|------|----------------|---------|
| 1 | Project scaffolding (Vite + React + Tailwind) | 1 |
| 2 | Quote type + Supabase client | 1 |
| 3 | useQuote hook with tests | 1 |
| 4 | VirtueLabel component with tests | 1 |
| 5 | Footer component with tests | 1 |
| 6 | QuotePage layout + App integration | 1 |
| 7 | Database migration, RLS, seed data | 1 |
| 8 | Responsive polish + meta tags | 1 |
| 9 | Vercel deployment | 0 (external) |

Total: 8 commits, 9 tasks.
