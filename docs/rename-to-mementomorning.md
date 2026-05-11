# Rename Runbook: Memento Morning

Use this checklist to finish the external rename from `momentomorning` to `mementomorning` while preserving git history.

## Preserve Git History

- Rename the existing GitHub repository instead of creating a new one.
- Keep the existing local checkout and `.git` directory.
- Move/rename files in place so git can track history across the rename.
- Do not run `git init`, copy the project into a new repository, or force-push a rewritten history.

After the GitHub rename, update the local remote:

```bash
git remote set-url origin https://github.com/moottoast/mementomorning.git
git remote -v
git log --oneline --decorate -5
```

## GitHub

1. Open the existing repository settings for `moottoast/momentomorning`.
2. Rename the repository to `mementomorning`.
3. Confirm the canonical repository URL is `https://github.com/moottoast/mementomorning`.
4. Update the local remote with the command in the previous section.
5. Keep GitHub's automatic redirect from the old repository path, but do not leave local config or docs pointing at it.

## Vercel

1. Open the existing Vercel project that serves `momentomorning.com`.
2. Rename the Vercel project name/slug to `mementomorning` if either still uses the old spelling.
3. Check the Git integration:
   - If Vercel followed the GitHub rename automatically, keep the existing integration.
   - If it still points at `moottoast/momentomorning`, reconnect it to `moottoast/mementomorning`.
4. Add `mementomorning.com` as the production domain.
5. Add `www.mementomorning.com` too if you want the `www` hostname to work.
6. Update registrar DNS with the exact records Vercel provides.
7. Remove `momentomorning.com` from the Vercel project's Domains list.
8. Remove or replace registrar DNS records that point `momentomorning.com` at Vercel.
9. Keep the existing environment variables unless Supabase credentials change:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
10. Redeploy production after the rename commit is merged to `main`.

## Supabase

1. Open the existing Supabase project used by the app.
2. Rename the project display name to `Memento Morning` if it still says `Momento Morning` or `momentomorning`.
3. Keep the existing database, schema, RLS policies, anon key, and project URL.
4. Leave Vercel's Supabase env vars unchanged if the API URL is a generated Supabase URL such as `https://abc123.supabase.co`.
5. If Supabase has a custom domain, auth URL allowlist, project description, or dashboard metadata containing `momentomorning`, change it to `mementomorning`.
6. Do not create a new Supabase project unless the active Supabase API/custom URL itself contains `momentomorning`.

## Verification

Run these local checks:

```bash
rg -n "momento|momentomorning|Momento|Momento Morning" . -g '!docs/rename-to-mementomorning.md'
npm run lint
npm run build
npx vitest run
git status --short --branch
git log --oneline --decorate -5
```

After deploy, verify:

- `https://mementomorning.com` loads the app.
- The browser title and footer say `Memento Morning`.
- The quote request succeeds against Supabase.
- `https://momentomorning.com` no longer serves this Vercel app.
- GitHub is `moottoast/mementomorning`.
- Vercel has `mementomorning.com` and not `momentomorning.com`.
- Supabase project metadata no longer uses the old name.
