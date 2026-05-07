# Exploreans Watamu Beach Club & Villas

Astro-based property site for Exploreans Watamu, deployed via GitHub → Netlify, with Sveltia CMS for content editing.

---

## Stack

- **Astro 4** — static site generator
- **Sveltia CMS** — git-based headless CMS (drop-in replacement for Decap CMS)
- **Netlify** — hosting + Identity (for CMS auth) + git-gateway
- **GitHub** — content + code source of truth

---

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4321`. The CMS is at `http://localhost:4321/admin/` — but Sveltia needs a backend to authenticate against, so for local CMS work you'll either:

- Push to GitHub and use the deployed admin at `https://your-site.netlify.app/admin/`, **or**
- Switch the backend in `public/admin/config.yml` to a local proxy (see Sveltia docs)

---

## Build

```bash
npm run build      # outputs to ./dist
npm run preview    # serve the build locally
```

---

## Deployment to Netlify

1. **Push this repo to GitHub.**

2. **Connect the repo to Netlify** (New site → Import from Git). Netlify reads `netlify.toml` and runs `npm run build` → publishes `dist/`.

3. **Enable Netlify Identity:**
   - Site settings → Identity → **Enable Identity**
   - Registration preferences → set to **Invite only** (recommended for a property site — only invited team members can edit)
   - Identity → Services → **Enable Git Gateway**

4. **Invite editors:**
   - Identity → Invite users → enter their emails. They get a confirmation email and can then log into `/admin/` to edit content.

5. **Custom domain:**
   - Site settings → Domain management → Add `watamu.exploreans.com`
   - Update DNS at your registrar to point to Netlify (CNAME `watamu` → `your-site.netlify.app`)

---

## Content structure

Everything editors can change lives under `src/content/`:

```
src/content/
├── site/
│   └── settings.json          ← contact, booking URL, SEO meta
├── sections/
│   ├── hero.json              ← Chapter 0 (hero)
│   ├── letter.json            ← Chapter I
│   ├── setting.json           ← Chapter II
│   ├── villas.json            ← Chapter III
│   ├── facilities.json        ← Chapter IV
│   ├── dining.json            ← Chapter V
│   ├── beach.json             ← Chapter VI
│   └── family.json            ← Family / Planhotel block
├── excursions/                ← Chapter VII (one file per excursion)
│   ├── 01-watamu-marine-park.json
│   ├── 02-mida-creek.json
│   └── ...
└── notes/                     ← Field Notes (one file per note)
    ├── 01-mida-creek-low-tide.json
    └── ...
```

Each file has a matching collection in `public/admin/config.yml` so editors see a clean form in Sveltia, never raw JSON.

### Italic emphasis in editable text

Where the brand voice calls for italic emphasis inside a headline (e.g. *intimate* in "An *intimate* ecolodge…"), wrap the phrase in asterisks in the CMS field. The site renders `*word*` as `<em>word</em>` automatically. This avoids exposing editors to HTML.

### Excursions and Field Notes

These are folder collections — each item is its own file. Editors can:
- **Add** new excursions / notes via Sveltia's "New Excursion" button
- **Reorder** by changing the `order` field
- **Hide without deleting** by toggling `published` to false

---

## Editorial workflow

The CMS is configured with `publish_mode: editorial_workflow` — edits go through draft → in review → ready → published. Useful when multiple people are editing or when you want approvals before content goes live.

To switch to direct-publish (commits straight to `main`), comment out the `publish_mode` line in `public/admin/config.yml`.

---

## Switching from Netlify Identity to GitHub OAuth

If you'd rather use GitHub OAuth directly (skipping Netlify Identity), edit `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: your-org/exploreans-watamu
  branch: main
```

You'll need to set up a GitHub OAuth app and a small auth proxy (Netlify Functions or similar). Sveltia docs cover this.

---

## Adding a new property to the Exploreans collection

This codebase is structured so it can be cloned for a sister property (e.g. Mara River Camp). The recommended fork sequence:

1. Clone the repo, rename
2. Update `src/content/site/settings.json` with new property's contact, URL, SEO meta
3. Update each section file in `src/content/sections/` with new copy
4. Replace excursions and field notes with location-appropriate items
5. Swap imagery URLs / upload new images via Sveltia
6. Adjust the global palette in `src/styles/global.css` if the property uses different brand colors

---

## Image handling

For now, hero/letter/setting/beach images use Cloudfront URLs from the existing master Exploreans site, and excursion/restaurant placeholders use Unsplash. To replace with proper photography:

1. Upload images via Sveltia (`/admin/`) — they get committed to `public/images/`
2. Reference them as `/images/your-image.jpg` in the content fields
3. Astro serves them statically from the build

---

## Contact

For technical questions, contact the Planhotel Hospitality Group dev team.
