# BlueDevil Digest — Syllabus

---

## What this is  
Build a small, real‑world **AI content pipeline**:

```
Google Sheet → App reads rows → OpenAI generates recap/tweet/hashtags →
App writes back → Dashboard displays results → Deploy to Vercel
```

---

## What you’ll use
- **Next.js (App Router)** – frontend & server routes  
- **Tailwind CSS** – fast, clean styling  
- **Google Sheets API** – read + write structured game data  
- **OpenAI API** – create an 80‑word recap, ≤280‑char tweet & 3 hashtags  
- **Vercel** – one‑click deploy (free tier)  
- **Git / GitHub** – version control + public portfolio

> **Accounts & costs:** You’ll get an OpenAI API key from the mentor.  
> Google Sheets API, Vercel, and GitHub are fine on free tiers.

---

## How we’ll work
The project is split into **12 bite‑size milestones** (≈3‑4 h each).  
Each milestone lists: **Goal · Why it matters · Steps · Definition of Done · Submit · Ref**.  
Work through them in order; check the ref link before asking questions.

---

## Milestones

### M0 — Environment & Accounts (2‑3 h)
**Goal:** Node, GitHub repo, and API keys working.  
**Steps:** install Node 18 +, create repo, add `.gitignore`; place `OPENAI_API_KEY` in `.env`; enable Sheets API & download creds JSON.  
**Done:** `node -v` works, test commit pushed, Google console shows *Sheets API Enabled*.  
**Submit:** Repo link · screenshot · `.env.example`.  
**Ref:** <https://developers.google.com/workspace/sheets/api/quickstart/nodejs>

---

### M1 — Project Starter (2‑3 h)
Create/clone Next.js (TypeScript) + Tailwind starter, show a styled **“BlueDevil Digest”** heading.  
**Done:** `localhost:3000` renders with Tailwind.  
**Submit:** Screenshot + repo.  
**Ref:** <https://nextjs.org/docs/app/getting-started>

---

### M2 — Sheet Ready w/ Data (1‑2 h)
Import `csv/sheet_template.csv` or `starter_sample.csv`; headers must match spec; ensure `processed = FALSE`.  
**Done:** Sheet has 3‑5 rows ready.  
**Submit:** View‑only link + screenshot.  
**Ref:** Duke schedule format: <https://goduke.com/sports/mens-basketball/schedule>

---

### M3 — Read from Google Sheet (3‑4 h)
Auth with Sheets API; read range like `Games!A2:F`; expose JSON via local route/script.  
**Done:** JSON rows display without errors.  
**Submit:** JSON screenshot + file path; Sheet link.  
**Ref:** same Quickstart

---

### M4 — Write back to Google Sheet (3‑4 h)
Add tiny write helper; update one cell (e.g., `processed`).  
**Done:** Change appears in Sheet.  
**Submit:** before/after screenshots + write file path.  
**Ref:** Quickstart update

---

### M5 — First OpenAI Call (1 row) (3‑4 h)
Prompt for recap/tweet/tags, **JSON only**; log raw + parsed.  
**Done:** Valid JSON object for one row.  
**Submit:** sample JSON + call file path.  
**Ref:** <https://platform.openai.com/docs/api-reference/chat>

---

### M6 — Round‑Trip (3‑4 h)
Loop unprocessed rows → call OpenAI → write `ai_*` → set `processed = TRUE`.  
**Done:** ≥3 rows filled & flagged TRUE.  
**Submit:** Sheet before/after.  
**Ref:** Sheets Quickstart + OpenAI Chat

---

### M7 — Dashboard (3‑4 h)
Create `/dashboard`; server‑fetch rows; render cards (opponent, score, ai fields).  
**Done:** Local dashboard shows processed rows.  
**Submit:** Screenshot + repo.  
**Ref:** Next.js data fetching

---

### M8 — Deploy to Vercel (2‑3 h)
Import repo, add env vars, deploy; share public URL.  
**Done:** Live `/dashboard` works.  
**Submit:** URL + screenshot.  
**Ref:** <https://vercel.com/docs/frameworks/nextjs>

---

### M9 — Reliable Output (2‑3 h)
Update prompt with JSON schema, low temp, retry once on parse error.  
**Done:** 2 runs produce clean JSON.  
**Submit:** final prompt + 2 outputs.  
**Ref:** Prompt tips

---

### M10 — Quality Check (Optional) (2‑3 h)
If recap >100 words or tweet >280 chars, re‑prompt to shorten (toggle via env).  
**Done:** one example shortened.  
**Submit:** before/after text.  
**Ref:** OpenAI Chat API

---

### M11 — README + Screenshots (3‑4 h)
Write README (what, setup, deploy); add screenshots + simple workflow diagram.  
**Done:** Peer can clone & run with README only.  
**Submit:** repo + images.  
**Ref:** Markdown basics

---

### M12 — Final Tidy & Release (1‑2 h)
Clean dead files, add comments, open 3 future‑idea issues, tag `v1.0.0`.  
**Done:** Fresh clone + README works; release tag exists.  
**Submit:** release link · live URL · Sheet link.  
**Ref:** MIT license template

---

## How this can grow (optional)

- **Auto‑import stats** from ESPN or Sports‑Reference  
- **Background jobs** (cron + queue) for hands‑free processing  
- **Slack bot**: `/recap latest` posts the newest game recap  
- **Database upgrade**: migrate from Sheets to Postgres  
- **A/B tweets**: generate two variants and track click‑through  
- **Image helper**: GPT‑4V suggests hero image + alt text  
- **Agentic polish**: automatic readability or tone adjustments

---

Ready? Start with Milestone 0 and send your first submission once the basics are set up.
