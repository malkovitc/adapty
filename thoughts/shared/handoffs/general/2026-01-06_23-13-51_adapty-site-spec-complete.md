---
date: 2026-01-06T23:13:51+0400
session_name: general
researcher: Claude
git_commit: 4360990
branch: main
repository: adapty-website
topic: "Adapty.io Site Specification - Complete Reference Document"
tags: [adapty-clone, site-spec, components, sections, design-system]
status: complete
last_updated: 2026-01-06
last_updated_by: Claude
type: implementation_strategy
root_span_id: ""
turn_span_id: ""
---

# Handoff: Adapty.io Site Specification Complete

## Task(s)

### Completed:
1. **Analyzed all adapty.io pages** - Documented 7 working feature pages (6 URLs were invalid/redirects)
2. **Created comprehensive site specification** - 14-section reference document
3. **Section matrix compliance check** - Verified 6 implemented pages, identified 5 missing pages
4. **Atomic UI component analysis** - Catalogued all reusable elements

### Previous Session Work (already done):
- Container width standardization (1100px)
- Navigation mega-menu
- Feature pages: `/for-developers`, `/for-marketers`, `/for-app-owners`, `/paywall-builder`
- Pricing page with 54-feature comparison table

## Critical References

1. **Site Specification** - `/Users/evgeny/Desktop/ adapty/adapty-site.txt` - MASTER REFERENCE with 14 sections
2. **Previous Handoff** - `thoughts/shared/handoffs/general/2026-01-06_22-47-48_adapty-pages-migration.md`
3. **Research Report** - `.claude/cache/agents/research-agent/latest-output.md` - Detailed page analysis

## Recent changes

This session focused on documentation, not code changes:
- Updated `/Users/evgeny/Desktop/ adapty/adapty-site.txt` with complete site specification
- Updated `thoughts/shared/handoffs/general/2026-01-06_22-47-48_adapty-pages-migration.md` with analysis

## Learnings

1. **URL Corrections** - Several adapty.io URLs changed:
   - `/analytics/` → `/revenue-analytics/`
   - `/subscription-analytics/` → `/revenue-analytics/`
   - `/ltv-prediction/` → `/ltv-analytics/` or `/predictive-analytics/`
   - `/a-b-tests/` → `/paywall-ab-testing/`
   - `/web-subscriptions/` → Does not exist

2. **Two unique page layouts** exist besides standard template:
   - `/onboarding-builder/` - VideoGateForm, TabNavigation, FAQ, no carousel
   - `/integrations/` - IntegrationGrid (22), SDKPlatformGrid (10), G2Badges, no carousel

3. **Standard Feature Page Template**:
   ```
   Header → PromoBanner → HeroWithBadge → FeatureWithQuote ×4-6 →
   Testimonials → EnterpriseStats/MigrationCTA → CaseStudies/RelatedFeatures → CTA → Footer
   ```

## Post-Mortem

### What Worked
- Parallel agent execution for analyzing pages and verifying matrix simultaneously
- Research agent with Chrome DevTools MCP for accurate page structure analysis
- Comprehensive reference document in single file (`adapty-site.txt`) for easy handoff

### What Failed
- Initial path confusion in Explore agent (space in directory name)
- Some WebFetch requests failed, had to fall back to DevTools MCP

### Key Decisions
- Decision: Single comprehensive spec file (`adapty-site.txt`) instead of multiple docs
  - Alternatives: Separate files per section, markdown in repo
  - Reason: Easier to maintain, single source of truth, portable

- Decision: Document all 37 section types even if not all used yet
  - Alternatives: Only document implemented sections
  - Reason: Provides complete blueprint for future implementation

## Artifacts

### Primary Reference:
- `/Users/evgeny/Desktop/ adapty/adapty-site.txt` - **MASTER SPEC** (14 sections, ~690 lines):
  1. Master component list (37 sections)
  2. Page/section matrix (implemented pages)
  3. Page/section matrix (feature pages to build)
  4. Implementation status
  5. Page templates
  6. Atomic UI components (typography, buttons, badges, cards, images, forms, interactive, decorative, layout)
  7. Section patterns (ASCII diagrams)
  8. Component readiness status
  9. Navigation structure (Header/Footer)
  10. Color palette
  11. Responsive breakpoints
  12. Animation specs
  13. External URLs
  14. Hero content + Assets list

### Secondary:
- `.claude/cache/agents/research-agent/latest-output.md` - Detailed page-by-page analysis
- `thoughts/shared/handoffs/general/2026-01-06_22-47-48_adapty-pages-migration.md` - Previous handoff (updated)

## Action Items & Next Steps

### Priority 1 - Update existing pages:
- [ ] `/paywall-ab-testing` - Add FeatureWithQuote sections, EnterpriseStats
- [ ] `/onboarding-builder` - Add VideoGateForm, TabNavigation, FAQ accordion

### Priority 2 - Build new pages (5):
- [ ] `/revenue-analytics/` - Standard feature page template
- [ ] `/integrations/` - **Unique layout** with IntegrationGrid, SDKPlatformGrid, G2Badges
- [ ] `/remote-config/` - Standard feature page template
- [ ] `/ltv-analytics/` - Standard feature page template
- [ ] `/predictive-analytics/` - Standard feature page template

### Priority 3 - Build missing atomic components:
- [ ] Input (with variants and states)
- [ ] Toggle/Switch (for billing toggle)
- [ ] Select/Dropdown
- [ ] Tooltip
- [ ] Marquee (animated)
- [ ] CodeBlock (with syntax highlighting)
- [ ] Avatar
- [ ] ComparisonTable

## Other Notes

### Key files in codebase:
- Container: `src/components/ui/Container.tsx` - max-width 1100px
- Sections: `src/components/sections/` - shared section components
- Pages: `src/app/*/page.tsx` - page compositions

### Useful commands:
```bash
npm run dev -- -p 3001   # Dev server
npx tsc --noEmit         # TypeScript check
```

### Resume next session:
```
/resume_handoff thoughts/shared/handoffs/general/2026-01-06_23-13-51_adapty-site-spec-complete.md
```

Then read the master spec:
```
Read /Users/evgeny/Desktop/ adapty/adapty-site.txt
```
