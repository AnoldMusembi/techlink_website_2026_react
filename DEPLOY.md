# Deploy Techlink to cPanel (CI/CD)

This Next.js site builds as a **static export** (`out/`) so it runs on standard cPanel Apache hosting without a Node process.

## One-time GitHub setup

1. Open [https://github.com/AnoldMusembi/techlink_website_2026_react](https://github.com/AnoldMusembi/techlink_website_2026_react)
2. **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Example | Notes |
| --- | --- | --- |
| `FTP_SERVER` | `ftp.techlinklimited.co.ke` or your host IP | From cPanel → FTP Accounts |
| `FTP_USERNAME` | `user@techlinklimited.co.ke` | Full FTP user |
| `FTP_PASSWORD` | *(your FTP password)* | Prefer a dedicated deploy FTP account |
| `FTP_SERVER_DIR` | `/public_html/` | Trailing slash. Use `/public_html/subdir/` for a folder |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `44sxzkv6` | Required for live Careers openings from Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Optional (defaults to `production` if omitted) |

3. Push to `main` (or run **Actions → Deploy to cPanel → Run workflow**)

## Local build (test before deploy)

```bash
cd bexon
npm ci
npm run build
```

Open the `out/` folder. That is what FTP uploads to `public_html`.

Preview locally:

```bash
npx --yes serve out
```

## cPanel checklist

1. Point the domain document root at `public_html` (or the folder in `FTP_SERVER_DIR`).
2. Confirm `.htaccess` was uploaded (it ships from `public/.htaccess`).
3. Install SSL (cPanel → SSL/TLS Status → AutoSSL or Let’s Encrypt).
4. After SSL works, you can uncomment the HTTPS rewrite block in `.htaccess`.
5. Confirm `contact-mail.php` is on the site root (it ships from `public/contact-mail.php`). Contact forms POST here and email **info@techlinklimited.co.ke**. If mail fails, enable PHP `mail()` / SMTP in cPanel (Email → Email Routing / authenticating SMTP).
6. Careers openings are managed in **Sanity CMS** (see `CAREERS-CMS.md`). Set `NEXT_PUBLIC_SANITY_PROJECT_ID` (and dataset) in the build environment if you want the project ID baked into the static JS. CORS on the Sanity project must allow your live domain.

## Optional: Node.js app on cPanel

Only if your host provides **Setup Node.js App** and you prefer `next start`:

```bash
STATIC_EXPORT=0 npm run build
npm start
```

Set Application root to the project, startup file to the Node entry your host documents, and Node 18+. Static FTP deploy above is the default path for this repo.

## Domain / DNS

Point `techlinklimited.co.ke` A/CNAME records to your cPanel server after the first successful deploy.
