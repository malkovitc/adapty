---
date: 2026-01-06T22:47:48+0400
session_name: general
researcher: Claude
git_commit: 4360990e0b5a975e68659bfd3951dc8f4c3d7cee
branch: main
repository: adapty-website
topic: "Adapty.io Pages Migration - Feature Pages and Pricing"
tags: [adapty-clone, feature-pages, pricing, container-width, navigation]
status: in_progress
last_updated: 2026-01-06
last_updated_by: Claude
type: implementation_strategy
root_span_id: ""
turn_span_id: ""
---

# Handoff: Adapty.io Pages Migration Progress

## Task(s)

### Completed:
1. **Container width standardization** - Changed from `max-w-7xl` (1280px) to `max-w-[1100px]` across all feature pages to match original adapty.io
2. **Navigation mega-menu** - Added Product tabs with EN selector, Adapty logo
3. **Feature pages created/updated**:
   - `/for-developers` - Hero, SDKMethods (5 languages + syntax highlighting), ComparisonTable, Workflow diagram
   - `/for-marketers` - Hero with updated title
   - `/for-app-owners` - Side-by-side hero layout
   - `/paywall-builder` - PhoneMockup, StickyBenefits, TemplatesCarousel
   - `/paywall-ab-testing` - Container width updates
   - `/onboarding-builder` - Container width updates
4. **Pricing page overhaul**:
   - PricingTable (54 features in 9 collapsible categories)
   - StartupBanner, PricingLogos, PricingCaseStudies, PricingTestimonials
   - Enterprise card dark purple styling
   - FAQ with specific MTR/billing questions

### In Progress:
1. **Build missing feature pages** - See analysis below

## Complete Analysis (Updated 2026-01-06)

### URL Corrections
Several adapty.io URLs have changed:
- `/analytics/` → Use `/revenue-analytics/`
- `/subscription-analytics/` → Use `/revenue-analytics/`
- `/cohort-analysis/` → Covered in `/revenue-analytics/`
- `/ltv-prediction/` → Use `/ltv-analytics/` or `/predictive-analytics/`
- `/a-b-tests/` → Use `/paywall-ab-testing/`
- `/web-subscriptions/` → Does not exist

### Adapty.io Feature Pages Analyzed (7 pages)

#### 1. /paywall-ab-testing/
- Hero: "A/B test paywalls without coding" | PAYWALL MANAGEMENT
- 4 Feature sections with embedded testimonials
- Testimonial Carousel + Enterprise Stats + Case Studies
- Related Features (4 links)

#### 2. /onboarding-builder/ (UNIQUE LAYOUT)
- Hero with video gate form (email required)
- Horizontal tab navigation for features
- Company logos trust section
- 5 feature sections + FAQ accordion
- NO testimonial carousel, NO enterprise stats

#### 3. /revenue-analytics/
- Hero: "Accurate app subscription analytics you can rely on"
- 6 feature sections
- Migration CTA section ("Using another solution?")
- Testimonial Carousel

#### 4. /integrations/ (UNIQUE LAYOUT)
- Minimal hero (no subtitle)
- Partner logo grid (22 integrations)
- Event types section
- SDK platforms grid (10 cards)
- G2 award badges
- NO testimonial carousel

#### 5. /remote-config/
- Hero: "Send any meta-data with your paywall to your app"
- Standard feature page pattern
- Enterprise Stats + Case Studies

#### 6. /ltv-analytics/
- Hero: "Improve your UA strategy with subscription LTV analytics"
- Standard feature page pattern
- Migration CTA section

#### 7. /predictive-analytics/
- Hero: "Manage revenue stream and ROI with AI-driven LTV prediction"
- Bullet point feature list
- Standard pattern otherwise

## Critical References
- Original site: https://adapty.io/
- Container component: `src/components/ui/Container.tsx:40` - `max-w-[1100px]`

## Recent changes

### Commits pushed:
- `4360990` - Overhaul pricing page with full comparison table and sections
- `787435c` - Update feature pages to match adapty.io design

### Key files created:
- `src/app/paywall-builder/PhoneMockup.tsx` - Interactive phone with paywall preview
- `src/app/paywall-builder/StickyBenefits.tsx` - Scroll-based image switching
- `src/app/paywall-builder/TemplatesCarousel.tsx` - 5 template cards carousel
- `src/app/for-developers/ComparisonTable.tsx` - Adapty vs DIY vs Competitors
- `src/app/for-developers/SDKMethods.tsx` - 5 languages with syntax highlighting
- `src/components/sections/PricingTable.tsx` - 54 features, 9 categories
- `src/components/sections/PricingCaseStudies.tsx`
- `src/components/sections/PricingTestimonials.tsx`
- `src/components/sections/PricingLogos.tsx`
- `src/components/sections/StartupBanner.tsx`

## Learnings

1. **Original adapty.io uses 1100px container** - CSS variable `--a-container-width--desktop:1100px`, not 1280px

2. **motion.div + text-center causes vertical text bug** - When `motion.div` wraps text with `text-center` class, text displays vertically word-by-word. Fix: use regular `div.text-center` wrapper with `motion.h2`/`motion.p` inside, OR put motion on wrapper and use regular h2/p inside.

3. **Repeating sections across adapty.io pages**:
   - Header, Footer, CTA - on ALL pages
   - TrustLogos - most pages except paywall-builder
   - Testimonials - most pages
   - CaseStudies - feature pages

## Post-Mortem

### What Worked
- Using Task agents in parallel to update multiple files preserved main context
- Chrome DevTools MCP for visual verification
- WebFetch for analyzing original adapty.io page structure

### What Failed
- Initial container widths used 1280px instead of 1100px
- motion.div with text-center caused vertical text layout bug (fixed twice)

### Key Decisions
- Decision: Use `max-w-[1100px]` custom Tailwind class
  - Alternatives: Add to tailwind.config.js, use max-w-6xl (1152px)
  - Reason: More explicit, matches original exactly, no config changes

- Decision: Create separate hero components per page (AppOwnersHero, DeveloperHero, MarketerHero)
  - Alternatives: Single FeatureHero with layout prop
  - Reason: Each page has unique layout requirements

## Artifacts

### New components:
- `src/app/paywall-builder/PhoneMockup.tsx`
- `src/app/paywall-builder/StickyBenefits.tsx`
- `src/app/paywall-builder/TemplatesCarousel.tsx`
- `src/app/for-developers/ComparisonTable.tsx`
- `src/app/for-developers/SDKMethods.tsx`
- `src/app/for-developers/FeatureSections.tsx`
- `src/app/for-developers/AdditionalSections.tsx`
- `src/app/for-developers/DeveloperHero.tsx`
- `src/app/for-marketers/MarketerHero.tsx`
- `src/app/for-marketers/FeatureSections.tsx`
- `src/app/for-app-owners/AppOwnersHero.tsx`
- `src/app/for-app-owners/FeatureSections.tsx`
- `src/components/sections/PricingTable.tsx`
- `src/components/sections/PricingCaseStudies.tsx`
- `src/components/sections/PricingTestimonials.tsx`
- `src/components/sections/PricingLogos.tsx`
- `src/components/sections/StartupBanner.tsx`

## Action Items & Next Steps

### Priority 1 - Section Matrix Compliance

#### Current Implementation Status:

| Page | Expected | Our Implementation | Status |
|------|----------|-------------------|--------|
| **/** (Home) | 16 sections | ✓ All present | ✅ COMPLETE |
| **/pricing** | Header, Hero, Logos, Cards, Table, CaseStudies, Testimonials, FAQ, CTA | ✓ All present | ✅ COMPLETE |
| **/for-developers** | Hero, SDKMethods, Comparison, Features, Logos, Testimonials, Enterprise, CaseStudies, CTA | ✓ 16 sections | ✅ COMPLETE |
| **/for-marketers** | Hero, Features, FunnelFox, Logos, Testimonials, Enterprise, CaseStudies, CTA | ✓ 10 sections | ✅ COMPLETE |
| **/for-app-owners** | Hero, Features, FunnelFox, Logos, Testimonials, Enterprise, CaseStudies, CTA | ✓ 10 sections | ✅ COMPLETE |
| **/paywall-builder** | Hero, Video, Stats, PhoneMockup, Features, StickyBenefits, Templates, Enterprise, CaseStudies, RelatedLinks, CTA | ✓ 11 sections | ✅ COMPLETE |
| **/paywall-ab-testing** | Hero, 4 FeatureSections, TestimonialCarousel, EnterpriseStats, CaseStudies, RelatedFeatures, CTA | Basic page only | ⚠️ NEEDS UPDATE |
| **/onboarding-builder** | Hero+VideoGate, TabNav, Logos, 5 Features, FAQ, CTA | Basic page only | ⚠️ NEEDS UPDATE |

### Priority 2 - Build Missing Pages (5 new pages needed):

1. **`/revenue-analytics/`** - Standard feature page template
2. **`/integrations/`** - Custom layout with partner grid + SDK cards
3. **`/remote-config/`** - Standard feature page template
4. **`/ltv-analytics/`** - Standard feature page template
5. **`/predictive-analytics/`** - Standard feature page template

### Priority 3 - Build Missing Components (16 total):

**Standard Components:**
1. `PromoBanner` - Dismissible top banner (Apple Ads announcement)
2. `FeatureSection` - Alternating image/text with optional testimonial
3. `TestimonialQuote` - Inline testimonial for feature sections
4. `EnterpriseStats` - 4 animated counters (events, users, subscribers, API calls)
5. `MigrationCTA` - "Using another solution?" section
6. `RelatedFeatures` - 2-4 link cards

**Unique Components (for /onboarding-builder):**
7. `VideoGateForm` - Email-gated video preview
8. `TabNavigation` - Horizontal anchor tabs for features
9. `FAQAccordion` - Expandable Q&A section

**Unique Components (for /integrations):**
10. `IntegrationGrid` - 22 partner logos in grid
11. `SDKPlatformGrid` - 10 SDK platform cards
12. `G2Badges` - Award badges section
13. `EventTypesSection` - Subscription event list

**Already Built:**
- ✓ `HeroSection` with category label
- ✓ `TestimonialCarousel` (5 slides)
- ✓ `CTAFooter` (pre-footer CTA)
- ✓ `CaseStudiesGrid` (3 cards)

## Adapty.io Component Reference

### Master Component List (16 components)

| #  | Component         | Назначение              | Визуально                                                   |
|----|-------------------|-------------------------|-------------------------------------------------------------|
| 1  | Header            | Навигация               | Лого, меню, EN переключатель, Login/Sign up, CTA кнопка     |
| 2  | Hero              | Первый экран, конверсия | Заголовок, email форма, превью дашборда, градиентный фон    |
| 3  | LogosMarquee      | Social proof            | Бегущая строка логотипов клиентов (Bumble, FEELD...)        |
| 4  | RoleCards         | Сегментация аудитории   | 3 карточки: For Developers / App Owners / Marketers         |
| 5  | StatsSection      | Доверие через цифры     | Счётчики: $1.9B+ tracked, 15,000+ apps, 99.99% SLA, 4.8 G2  |
| 6  | SDKSection        | Техническая простота    | Код-табы (Swift/Kotlin/RN), "5 SDK methods"                 |
| 7  | FeatureSections   | Возможности продукта    | Блоки: Paywall Builder, A/B Testing, Analytics с картинками |
| 8  | FunnelFox         | Дополнительный продукт  | Промо Web Funnels, фиолетовый акцент                        |
| 9  | Integrations      | Совместимость           | Логотипы интеграций (Amplitude, Mixpanel, Adjust...)        |
| 10 | CaseStudies       | Результаты клиентов     | 6 карточек с метриками (+50% revenue, +30% MRR...)          |
| 11 | Testimonials      | Отзывы                  | Stats сверху + слайдер цитат на тёмном фоне                 |
| 12 | EnterpriseSection | Enterprise + награды    | Статистика масштаба + G2 бейджи                             |
| 13 | Pricing           | Тарифы                  | 4 карточки (Free/Pro/Pro+/Enterprise), краткая таблица      |
| 14 | FAQ               | Частые вопросы          | Аккордеон в 2 колонки                                       |
| 15 | CTA               | Финальная конверсия     | "Ready to boost?" + 2 кнопки (Start free / Book demo)       |
| 16 | Footer            | Навигация/контакты      | Колонки ссылок, соцсети, копирайт                           |

### Page/Section Matrix

| Секция                    | Home | Pricing | Developers | Marketers | App Owners | Paywall Builder |
|---------------------------|------|---------|------------|-----------|------------|-----------------|
| Header                    |  ✓   |    ✓    |     ✓      |     ✓     |     ✓      |        ✓        |
| Hero (уникальный)         |  ✓   |    ✓    |     ✓      |     ✓     |     ✓      |        ✓        |
| Trust Logos               |  ✓   |    ✓    |     ✓      |     ✓     |     ✓      |        -        |
| Feature Cards/Grid        |  ✓   |    -    |     ✓      |     ✓     |     ✓      |        ✓        |
| Stats/Counters            |  ✓   |    -    |     -      |     -     |     -      |        -        |
| Testimonials/Quote        |  ✓   |    ✓    |     ✓      |     ✓     |     ✓      |        ✓        |
| Integrations Grid         |  ✓   |    -    |     -      |     -     |     -      |        -        |
| Pricing Cards             |  ✓   |    ✓    |     -      |     -     |     -      |        -        |
| Comparison Table          |  -   |    ✓    |     -      |     -     |     -      |        -        |
| Paywall Examples Carousel |  -   |    -    |     -      |     -     |     -      |        ✓        |
| CTA Section               |  ✓   |    ✓    |     ✓      |     ✓     |     ✓      |        ✓        |
| Footer                    |  ✓   |    ✓    |     ✓      |     ✓     |     ✓      |        ✓        |

## Other Notes

### Useful commands:
```bash
# Dev server
npm run dev -- -p 3001

# TypeScript check
npx tsc --noEmit

# Find remaining max-w-7xl
grep -rn "max-w-7xl" src --include="*.tsx"
```

### Pages structure on our site:
- `/` - Homepage (page.tsx)
- `/pricing` - Pricing page
- `/for-developers`, `/for-marketers`, `/for-app-owners` - Role pages
- `/paywall-builder`, `/paywall-ab-testing`, `/onboarding-builder` - Feature pages
- `/blog`, `/blog/[slug]` - Blog

### Shared components that repeat across pages:
| Component | Location |
|-----------|----------|
| Header | `src/components/layout/Header.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| CTA | `src/components/sections/CTA.tsx` |
| Testimonials | `src/components/sections/Testimonials.tsx` |
| CaseStudies | `src/components/sections/CaseStudies.tsx` |
| LogosMarquee | `src/components/sections/LogosMarquee.tsx` |
| EnterpriseSection | `src/components/sections/EnterpriseSection.tsx` |
