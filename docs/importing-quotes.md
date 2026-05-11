# Importing Quotes into Memento Morning

## CSV Format

Your CSV file should have these columns in this exact order:

```csv
date,quote_text,attribution,reflection,virtue
2026-05-10,"The happiness of your life depends upon the quality of your thoughts.","Marcus Aurelius, Meditations V.16",What will you give your attention to today?,wisdom
2026-05-11,"He who fears death will never do anything worthy of a man who is alive.","Seneca, Letters 77.6",What would you attempt if fear were not a factor?,courage
```

**Rules:**
- `date` — format `YYYY-MM-DD`, must be unique per row
- `virtue` — must be one of: `wisdom`, `courage`, `justice`, `temperance`
- Wrap any field that contains commas in double quotes
- The `id` and `created_at` columns are auto-generated — do not include them

## Recommended: Supabase Dashboard CSV Import

The simplest and most secure approach. No API keys to manage, no scripts to run, no tools to install.

1. Go to your Supabase project dashboard
2. Click **Table Editor** in the left sidebar
3. Select the **quotes** table
4. Click **Insert** → **Import data from CSV**
5. Upload your `.csv` file
6. Supabase will show a preview — verify the columns map correctly
7. Click **Import**

That's it. The table's constraints (unique date, virtue check) will reject any bad rows and tell you which ones failed.

**When to use this:** You have a batch of quotes ready and want to load them in one shot. Good for the initial load and periodic updates (yearly sets, etc.).

## Alternative: Supabase SQL Editor

If you prefer to paste data directly or need more control over conflict handling (e.g., updating existing dates).

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Paste INSERT statements:

```sql
INSERT INTO quotes (date, quote_text, attribution, reflection, virtue) VALUES
  ('2026-06-01', 'Your quote here.', 'Attribution here', 'Reflection prompt here?', 'wisdom'),
  ('2026-06-02', 'Another quote.', 'Another attribution', 'Another reflection?', 'courage')
ON CONFLICT (date) DO UPDATE SET
  quote_text = EXCLUDED.quote_text,
  attribution = EXCLUDED.attribution,
  reflection = EXCLUDED.reflection,
  virtue = EXCLUDED.virtue;
```

The `ON CONFLICT` clause means if a quote already exists for that date, it gets replaced. This is useful for updating specific dates without worrying about duplicates.

**When to use this:** You're updating a handful of quotes, or you want upsert behavior (replace existing dates).

## Alternative: Supabase CLI

If you want a repeatable, scriptable process.

```bash
# Install the Supabase CLI (if not already installed)
brew install supabase/tap/supabase

# Link to your project
supabase link --project-ref your-project-ref

# You can run SQL files directly
supabase db execute -f path/to/your-inserts.sql
```

**When to use this:** You want to script imports as part of a content pipeline or automate updates.

## Tips

- **Start with one year.** Load 365 quotes for 2026. You can add 2027 quotes later and they'll automatically take priority for their dates.
- **Test with a few rows first.** Import 5-10 quotes via the dashboard, then visit the site to confirm they render correctly before loading the full set.
- **Back up before bulk updates.** In the Supabase dashboard, you can export the current table as CSV before importing new data (Table Editor → Export as CSV).
- **Significant dates.** If you want a specific quote for, say, January 1st 2027, just add a row with date `2027-01-01`. The app's lookup logic will prefer it over the 2026-01-01 entry automatically.
