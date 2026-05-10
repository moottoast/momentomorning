# Deploying to Vercel

How to connect Momento Morning to Supabase and deploy on Vercel without exposing secrets.

## What Gets Exposed (and Why That's OK)

This app uses two Supabase values:

| Variable | Secret? | Why |
|----------|---------|-----|
| `VITE_SUPABASE_URL` | No | This is your project's public API endpoint. It's designed to be called from browsers. |
| `VITE_SUPABASE_ANON_KEY` | No | This is the **anonymous/public** key, not the service role key. It can only do what Row Level Security allows — in our case, read-only access to the `quotes` table. |

Because Vite embeds `VITE_*` variables into the client bundle at build time, both values are visible in the browser. This is by design. The anon key is not a secret — it's a public API token scoped by RLS.

**What IS secret** (and must never be in your code, `.env` files committed to git, or Vercel env vars prefixed with `VITE_`):

- **Service role key** — bypasses RLS entirely. Never use it client-side.
- **Database password** — direct Postgres access. Never expose it.
- **JWT secret** — used to sign auth tokens. Never expose it.

You can find all of these in your Supabase Dashboard under **Settings > API**. Only the URL and anon key belong in this app.

## Step 1: Verify Your Supabase Security

Before deploying, confirm RLS is protecting your data.

1. Go to your Supabase Dashboard > **Table Editor** > **quotes**
2. Click the **RLS** shield icon — you should see the policy: `Allow anonymous read access` (SELECT only)
3. There should be **no** INSERT, UPDATE, or DELETE policies for `anon`

If you ran the migration from [`001_create_quotes.sql`](../supabase/migrations/001_create_quotes.sql), this is already configured. The anon key can only read quotes — it cannot modify or delete them.

## Step 2: Connect Your GitHub Repo to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** > **Project**
3. Import your GitHub repository (`momentomorning`)
4. Vercel will auto-detect the Vite framework — the default settings are correct:
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

Do not click **Deploy** yet — you need to set the environment variables first.

## Step 3: Add Environment Variables in Vercel

1. On the project setup page (or **Settings > Environment Variables** if the project already exists), add:

   | Name | Value |
   |------|-------|
   | VITE_SUPABASE_URL | Your project URL, e.g. https://abcde12345.supabase.co |
   | VITE_SUPABASE_ANON_KEY | Your anon/public key (starts with eyJhbGci...) |

2. For both variables, keep all three environments checked: **Production**, **Preview**, **Development**
3. Click **Save**

**Where to find these values:** Supabase Dashboard > **Settings** > **API**. Copy the **Project URL** and the key labeled **anon / public** (not the service_role key).

## Step 4: Deploy

Click **Deploy**. Vercel will build the Vite app, embedding the Supabase URL and anon key into the client bundle. The site will be live at `your-project.vercel.app`.

Every push to `main` triggers a new deployment automatically.

## Step 5: Verify the Deployment

1. Open your Vercel deployment URL
2. You should see today's stoic quote (or the Seneca fallback if no quote exists for today's date)
3. Open browser DevTools > **Network** tab and look for the Supabase request — it should be a `POST` to your Supabase URL returning quote data

## Custom Domain (Optional)

1. In Vercel, go to **Settings > Domains**
2. Add your domain (e.g., `momentomorning.com`)
3. Vercel will provide DNS records to configure with your registrar
4. SSL is automatic

No additional Supabase configuration is needed — the anon key works from any origin by default.

## Security Checklist

- [ ] Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are in Vercel env vars — no service role key, no database password
- [ ] The `.env.local` file is in `.gitignore` (it is by default)
- [ ] No `.env` file is committed to the repository
- [ ] RLS is enabled on the `quotes` table with a SELECT-only policy for `anon`
- [ ] No INSERT/UPDATE/DELETE policies exist for `anon`

## Troubleshooting

**Blank page, no quote loads:**
- Check Vercel env vars are set and spelled correctly (`VITE_SUPABASE_URL`, not `SUPABASE_URL`)
- Redeploy after adding env vars — Vite embeds them at build time, so existing builds won't pick up changes

**"No rows returned" or fallback quote shows:**
- Confirm quotes exist in your Supabase `quotes` table for today's month/day
- Check that the `get_quote_for_date` function exists (it's created by the migration)

**CORS errors in browser console:**
- Supabase allows all origins by default for the anon key. If you see CORS errors, check that `VITE_SUPABASE_URL` doesn't have a trailing slash
