# Agent instructions

Follow **[ONBOARDING.md](./ONBOARDING.md)**. Figma order: design system (`src/brand.ts`) → atoms (`Button`, `Headline`, …) → shared sections (`FAQs`, `Hero2`, …) → pages.

```
npm run dev      # localhost:4321
npm run build    # production
npm run check    # astro + eslint + prettier
```

Tokens: `src/brand.ts`. Copy desktop and mobile type from Figma; derive mobile only if the file has none. Identity: `src/config/site.ts` + `contact.ts`. Widgets: `src/registry/components.json`.

**SEO titles:** the site uses fallbacks, never a failing build. A page without its own title/description falls back to `metadata` in `src/config.yaml`, so an editor can never break a deploy. Missing or generic titles are caught by the `seo:check` script, not by the build.

**Images:** every image needs alt text (required in Studio). Compress before upload: under 100 KB, hero under 250 KB, max ~2000 px wide. Studio warns on heavier files.

**File size:** components ~200 lines, pages ~150, functions ~50; split anything over 400 lines.
