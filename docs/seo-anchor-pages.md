# Blog: SEO Anchor Pages Strategy

Permanent reference for the 4 blog posts under `posts/` that were added as a content hub to target the highest-commercial-intent keywords in the barber-software space.

This doc explains the **why** behind these posts so any dev touching `posts/`, the blog index page, or SEO meta generation knows what's load-bearing and what isn't.

## What an "anchor page" is here

An anchor page is a blog post deliberately written to rank for one specific high-commercial-intent search query. It is not a top-of-funnel awareness post. It exists to:

1. Show up in Google when someone searches a buyer-intent keyword (e.g., `booksy alternative`, `barber client reactivation software`)
2. Convert that visitor into a waitlist signup via the on-page CTA (`Link in bio` / waitlist link)
3. Pass topical authority to other anchor pages via internal links so the cluster ranks together

The 10 pre-existing posts in `posts/` are mostly top-of-funnel awareness content. The 4 new posts are different — they target keywords with direct purchase intent, and they cross-link to form a tight cluster.

## The 4 anchor pages

| Post | Target keyword | Category | Why this keyword |
|---|---|---|---|
| `barber-client-reactivation-software.md` | `barber client reactivation software` | Client Recovery | Defines our category. Owns the "what is this category of tool?" search. |
| `how-to-bring-back-lapsed-barber-clients.md` | `how to bring back lapsed barber clients` | Client Recovery | Informational intent — barbers who don't yet know reactivation software exists. Top of the funnel for the category. |
| `imessage-marketing-for-barbers.md` | `imessage marketing for barbers` | Growth | Low-competition unique angle. iMessage is the channel ChairFill uses; owning this keyword owns the channel. |
| `booksy-alternative-for-barbers.md` | `booksy alternative` | Operations | Highest commercial intent in the space. Google already surfaces chairfill.co at position 86 for this query with no targeting page — confirms topical signal works. Honest angle: ChairFill is NOT a Booksy replacement, it's the layer Booksy never built. |

## The content hub (internal-link map)

Every page links to the other 3. Search engines read this as a topical cluster — when any one page earns a backlink, link equity flows to all four.

```
       barber-client-reactivation-software
              ↕             ↕
              ↕             ↕
how-to-bring-back-lapsed-barber-clients ⇄ imessage-marketing-for-barbers
              ↕             ↕
              ↕             ↕
        booksy-alternative-for-barbers
```

The internal-link targets are documented in the HTML comment block at the top of each post (`internal_links:` list). If you change a slug, update the corresponding links in the other 3 files — otherwise the cluster breaks.

## Why the HTML comment block at top of each post

Each anchor page has a block right under the frontmatter that looks like:

```html
<!--
SEO BOOKKEEPING (not rendered) — keep in sync with rank_log targets in play4_gsc.py
slug: ...
target_keyword: ...
secondary_keywords: [...]
canonical: ...
featured_image: ...
internal_links: [...]
-->
```

This is invisible in the rendered page (HTML comments are stripped by the markdown → HTML pass). It exists because:

1. **Rank tracking needs to know** which keywords each page is supposed to win. The acquisition engine's `play4_gsc.py` reads these target keywords (mirrored in code) and watches GSC for movement on them weekly.
2. **Internal-link audits** — a future dev or Claude session restoring the cluster after a refactor needs to know which pages should link to which.
3. **Content updates** — if the keyword strategy shifts (e.g., we decide to abandon a keyword), the bookkeeping lets us find every page that targets it.

The block is data, not metadata. It does not affect rendering. Do not move it into the frontmatter (the live Next.js parser only understands the 7 frontmatter keys; extra keys may break the build or get silently dropped).

## What success looks like

Tracked weekly by `play4_gsc.py` (in the chairfill-engine repo on the same machine). Baseline (pre-deploy, 2026-06-07):

| Query | Impressions / 7d | Position | Notes |
|---|---|---|---|
| `booksy alternative` | 1 | 86 | The canary keyword |
| `barber client reactivation software` | 0 | — | No page for this yet (before this PR) |
| `how to bring back lapsed barber clients` | 0 | — | Same |
| `imessage marketing for barbers` | 0 | — | Same |

Success in 30 days: at least one anchor keyword moves into the top 50.

Success in 60 days: `booksy alternative` reaches page 2 (position 11-20).

Success in 90 days: at least one anchor keyword reaches page 1 + delivers monthly organic waitlist signups.

If we see ZERO movement at 30 days, the on-page optimization needs revisiting (probably title or H1 hierarchy).

## What needs to be true for these to rank

The build pipeline already handles 95% of this — but if any of these break, the SEO value disappears:

- [x] **Sitemap includes the new posts** — `app/sitemap.ts` (or wherever the sitemap is generated) should automatically pick them up from `posts/`. Verify after first deploy by curling `/sitemap.xml`.
- [x] **og: tags render correctly** — `seoTitle` and `seoDescription` from frontmatter should map to `<meta property="og:title">` and `<meta property="og:description">`. The Medium-publish flow uses the same SEO pattern; if the og: tags don't render, the SERP snippets will fall back to the body H1 + first paragraph, which is suboptimal.
- [x] **Internal links resolve** — links in the body to `/blog/<other-slug>` must return 200 once all 4 posts are live. A 404 on an internal link signals to Google "this page is broken" and the cluster's link equity flow breaks.
- [x] **No `noindex` meta** — the build should NOT add `<meta name="robots" content="noindex">` to these. Verify after deploy.
- [x] **Canonical URLs match** — the frontmatter `seoTitle`/`seoDescription` should match what shows up in `<title>` and `<meta name="description">`. The HTML comment block has the canonical URL too for cross-check.

## What this PR does NOT do

- Does not change any code in `app/`, `lib/`, `netlify/`, or any config file
- Does not modify the existing 10 `posts/` files
- Does not add or change build scripts
- Does not touch `next.config.ts`, `package.json`, or dependencies

It is a pure content add. The only risk surface is whether the existing blog index page / sitemap generator / SEO meta component picks up the new files automatically. If they do, we're done. If they don't, we'll need a follow-up PR.

## Verification checklist after merge + deploy

After Netlify deploys (~2-5 min post-merge):

```bash
# 1. All 4 URLs return 200
for slug in barber-client-reactivation-software how-to-bring-back-lapsed-barber-clients imessage-marketing-for-barbers booksy-alternative-for-barbers; do
  curl -sSL -o /dev/null -w "%{http_code}  https://chairfill.co/blog/$slug\n" "https://chairfill.co/blog/$slug"
done

# 2. Sitemap includes all 4
curl -sSL https://chairfill.co/sitemap.xml | grep -E '(barber-client-reactivation-software|how-to-bring-back-lapsed-barber-clients|imessage-marketing-for-barbers|booksy-alternative-for-barbers)'

# 3. og: tags rendered correctly on one of them
curl -sSL "https://chairfill.co/blog/booksy-alternative-for-barbers" | grep -oE '<meta property="og:(title|description|image)" content="[^"]*"'

# 4. Internal links between anchor pages resolve
# (one of the new posts should link to the other 3; verify those links don't 404)
```

After that: submit each new URL to Google Search Console → URL Inspection → Request Indexing. Pulls first crawl from ~2 weeks down to ~24 hours.

## Background context

This PR is part of a broader content + SEO strategy run by an automated acquisition engine that drafts content daily, measures rank movement weekly, and adjusts targeting based on what Google actually surfaces us for. The engine and its routines live in a separate repo and operate on the founder's machine; they do not deploy code here, they only generate the markdown drafts that end up in PRs like this one.

If you have questions about the keyword targeting, internal-link decisions, or the choice of `seoTitle` / `seoDescription` strings, the source-of-truth document for keyword strategy lives in the engine repo at:

```
Projects/Chairfill/Specs/chairfill-competitive-intel-v2.md
```

(Not synced to this repo intentionally — it changes every week as new queries surface from the GSC pull.)
