# Careers CMS (Sanity)

Techlink careers openings are managed in **Sanity**, so the team can publish jobs without editing React code.

## 1. Create a Sanity project

1. Sign up at [https://www.sanity.io](https://www.sanity.io)
2. From this repo (`bexon` folder), run:

```bash
npx sanity@latest login
npx sanity@latest init --env
```

Or create a project in the Sanity dashboard, then copy the **Project ID**.

3. Add env vars (create `.env.local` locally and GitHub Actions secrets for deploy builds if needed):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

4. In Sanity manage → API → **CORS origins**, add:
   - `http://localhost:3000`
   - `https://techlinklimited.co.ke`
   - `https://www.techlinklimited.co.ke`

5. Dataset should allow **public read** for published documents (default for many projects), so the static website can fetch jobs in the browser.

## 2. Run the Studio (admin UI)

The Studio lives in a separate folder (`studio/`) so it does not conflict with the Next.js app.

1. Create `studio/.env`:

```env
SANITY_STUDIO_PROJECT_ID=yourActualProjectId
SANITY_STUDIO_DATASET=production
```

(Same project id as in the website `.env.local`.)

2. From `bexon`:

```bash
npm run sanity
```

Open **http://localhost:3333**

Create documents of type **Job Opening**, set **Published (show on website)** to on, then Publish.

To host the Studio on Sanity’s servers (recommended for non-devs):

```bash
npm run sanity:deploy
```

Then share the Studio URL with the HR/admin team.

## 3. Website behaviour

| Page | Behaviour |
|------|-----------|
| `/careers` | Loads active jobs from Sanity (live) |
| `/careers/job/?slug=your-role-slug` | Job detail from Sanity (live) |

If Sanity env vars are missing, the site falls back to `public/fakedata/careers.json`.

## 4. How it works on cPanel

cPanel hosts **static HTML/JS only** (no Node). Careers still works like this:

1. You publish a job in **Sanity Studio** (localhost:3333 or a deployed Studio URL).
2. The live site’s `/careers` page (browser JS) calls Sanity’s CDN:
   `https://YOUR_PROJECT_ID.apicdn.sanity.io/...`
3. Openings appear on the live site **without uploading new files to cPanel**.

**Important:** the project ID must be present **when GitHub Actions builds** the site (`NEXT_PUBLIC_*` is baked into the JS).  
Add GitHub secret `NEXT_PUBLIC_SANITY_PROJECT_ID` = your project id (see `DEPLOY.md`).

Also in Sanity → API → CORS origins, allow your **live domain**:
- `https://techlinklimited.co.ke`
- `https://www.techlinklimited.co.ke`

Studio itself is **not** uploaded to cPanel. Admins use:
- local `npm run sanity`, or
- `npm run sanity:deploy` (Sanity-hosted Studio URL).

Optional later: Sanity webhook → GitHub Actions rebuild for SEO. Not required for listings to update live.

## 5. Fields editors use

- Title, Slug  
- Category, Employment type, Location  
- Salary + period  
- Short description  
- Full description (rich text)  
- Requirements / Responsibilities (bullet lists)  
- Vacancies, Apply email  
- Published toggle  

## 6. Apply flow

Detail pages open a pre-filled email to `applyEmail` (default `info@techlinklimited.co.ke`). Contact form inquiry type **Careers** remains available on `/contact`.
