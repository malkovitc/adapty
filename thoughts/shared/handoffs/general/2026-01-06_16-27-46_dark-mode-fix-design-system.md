---
date: 2026-01-06T16:27:46+03:00
session_name: general
researcher: claude
git_commit: aa5013c
branch: main
repository: adapty-website
topic: "Dark Mode Fix & Design System Migration"
tags: [css-variables, dark-mode, design-system, bugfix]
status: complete
last_updated: 2026-01-06
last_updated_by: claude
type: implementation_strategy
root_span_id:
turn_span_id:
---

# Handoff: Dark Mode Fix + Design System Complete

## Task(s)

### Completed
1. **Fixed dark mode breaking light sections** - Root cause: `@media (prefers-color-scheme: dark)` in globals.css was inverting all CSS variables when user's system is in dark mode, causing white text on white backgrounds.

2. **Fixed basePath for local development** - `next.config.ts` had hardcoded `basePath: '/adapty'` making site only accessible at `/adapty/` locally. Now conditional - only applies in production.

3. **Design system migration verified** - All section components now use CSS variables correctly. Verified RoleCards, SDK cards, Pricing sections render properly.

### Previous Session Work (committed)
- All section components migrated to CSS variables (CTA, Hero, Pricing, etc.)
- New pages created: /pricing, /demo, /for-developers, /for-marketers, /for-app-owners, /paywall-builder, /paywall-ab-testing, /onboarding-builder
- New UI components: Section, Card, Accordion, Tabs, Input, CodeBlock, Testimonial

## Critical References
- `src/app/globals.css:99-140` - CSS variable definitions (colors, spacing, typography)
- `src/components/ui/Section.tsx` - Section wrapper with background variants
- `thoughts/shared/handoffs/general/2026-01-06_15-16-49_design-system-migration.md` - Previous handoff

## Recent changes

### This Session
- `src/app/globals.css:266-279` - Commented out dark mode override
- `next.config.ts:1-22` - Made basePath conditional for production only

### Previous Session (committed in aa5013c)
- All section components converted to CSS variables
- 45 files changed, 4945 insertions

## Learnings

### Root Cause of White-on-White Bug
The CSS had automatic dark mode:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--bg-dark);
    --text-primary: var(--text-light);
  }
}
```
When user's Mac is in dark mode, this inverts ALL colors site-wide, breaking intentional dark/light sections.

### CSS Variable Values (correct)
- `--text-primary: #0A0A0A` (dark text for light backgrounds)
- `--text-light: #FFFFFF` (white text for dark sections)
- `--bg-primary: #FFFFFF` (white background)
- `--bg-dark: #0F172A` (dark background)

### Debug Technique
Use browser console to verify CSS variable values:
```javascript
getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
```

## Post-Mortem

### What Worked
- **Browser DevTools evaluation** - Running JS to check computed CSS variable values immediately revealed the dark mode override was active
- **Systematic section-by-section verification** - Taking screenshots of each section confirmed fixes worked

### What Failed
- **Initial assumption** - First thought it was Tailwind 4 CSS variable syntax issue, but actual cause was dark mode media query
- **Full page screenshot** - Too compressed to see details, individual section screenshots were more useful

### Key Decisions
- **Disable dark mode entirely** rather than fix it
  - Alternatives: Implement proper dark mode with toggle
  - Reason: Site has intentional dark/light sections (e.g., pricing wave background). Automatic dark mode inverts these incorrectly. Proper dark mode would require section-aware theming.

- **Conditional basePath** rather than removing it
  - Alternatives: Remove basePath completely
  - Reason: Production deployment may need /adapty/ subdirectory. Conditional preserves this while fixing local dev.

## Artifacts

### Commits
- `aa5013c` - Migrate components to CSS variables design system (45 files)
- `18e7f34` - Fix dark mode breaking light sections and basePath for local dev

### Key Files Modified
- `src/app/globals.css` - CSS variables + dark mode disabled
- `next.config.ts` - Conditional basePath
- All `src/components/sections/*.tsx` - CSS variable migration
- New `src/components/ui/*.tsx` - Section, Card, Accordion, Tabs, etc.

### New Pages
- `src/app/pricing/page.tsx`
- `src/app/demo/page.tsx`
- `src/app/for-developers/page.tsx`
- `src/app/for-marketers/page.tsx`
- `src/app/for-app-owners/page.tsx`
- `src/app/paywall-builder/page.tsx`
- `src/app/paywall-ab-testing/page.tsx`
- `src/app/onboarding-builder/page.tsx`

## Action Items & Next Steps

### Immediate
1. **Push commits to remote** - Run `git push origin main`

### Next Session
2. **Build remaining pages** per original site audit:
   - Product pages: /ai-paywall-generator/, /autopilot/, /paywall-targeting/
   - Infrastructure: /sdk/, /subscription-sync/, /fallback-paywalls/
   - Stage pages: /for-indie/, /for-startups/, /for-publishers/, /for-enterprises/
   - Compare pages: /compare/revenuecat/, /compare/purchasely/
   - SDK pages: /sdk/ios/, /sdk/android/, /sdk/react-native/

3. **Consider proper dark mode** - If dark mode is needed, implement with:
   - Manual toggle (not automatic)
   - Section-aware theming (dark sections stay dark in both modes)

## Other Notes

### Dev Server
- Site now at `http://localhost:3000/` (not /adapty/)
- Run: `npm run dev`

### Existing Pages Built
```
/                    - Homepage
/blog/               - Blog
/pricing/            - Pricing (new)
/for-developers/     - Role page (new)
/for-marketers/      - Role page (new)
/for-app-owners/     - Role page (new)
/paywall-builder/    - Feature page (new)
/paywall-ab-testing/ - Feature page (new)
/onboarding-builder/ - Feature page (new)
/demo/               - Demo (new)
/cms/                - CMS
```

### TypeScript
- All components pass `npx tsc --noEmit`
