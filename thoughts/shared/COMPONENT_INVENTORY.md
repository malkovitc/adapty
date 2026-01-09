# Adapty Website - Component Inventory for Design System

*Generated: 2026-01-06*
*Purpose: Base analysis for design system refactoring*

---

## Executive Summary

| Category | Count | Status |
|----------|-------|--------|
| **Pages** | 18 | Analyzed |
| **Section Components** | 22 | ✅ Expanded |
| **Atomic UI Components** | 25 | ✅ Expanded (+2) |
| **Reusable Sections** | 11 | ✅ High reuse |
| **Configurable via Props** | 6/16 core sections | ✅ Refactored |
| **Data Config Files** | 6 | ✅ Created |

### Recent Updates (2026-01-07)

**New UI Components:**
- `PromoBanner` - Dismissible announcement banner
- `Toggle` - Billing toggle (monthly/annual)

**New Section Components:**
- `HeroWithBadge`, `HeroWithVideo`, `HeroMinimal`, `PricingHero` - Hero variants
- `FeatureWithQuote` - Feature with testimonial
- `RelatedFeatures` - Feature links grid
- `MigrationCTA` - Competitor migration section
- `G2Badges` - G2 award badges
- `IntegrationGrid` - 22-integration categorized grid

**Refactored to use data configs:**
- `Testimonials.tsx` → uses `src/data/testimonials.ts`
- `CaseStudies.tsx` → uses `src/data/case-studies.ts`
- `FAQ.tsx` → uses `src/data/faqs.ts`
- `Pricing.tsx` → uses `src/data/pricing.ts`
- `StatsSection.tsx` → uses `src/data/stats.ts`
- `Integrations.tsx` → uses `src/data/integrations.ts`

---

## Part 1: Page Structure Matrix

### All Pages and Their Sections

| Page | Route | Sections Used | Type |
|------|-------|---------------|------|
| **Home** | `/` | Hero, LogosMarquee, RoleCards, StatsSection, SDKSection, FeatureSections, FunnelFox, Integrations, CaseStudies, Testimonials, EnterpriseSection, Pricing, FAQ, CTA | Server |
| **Pricing** | `/pricing` | PricingHero, StartupBanner, PricingLogos, Pricing, PricingTable, PricingCaseStudies, PricingTestimonials, PricingFAQ, CTA | Server |
| **For Developers** | `/for-developers` | DeveloperHero, SDKMethods, ComparisonTable, QuickIntegration, CrossPlatformSync, SLASection, SDKsGrid, IntegrationsSection, PaywallArchitecture, RawDataExport, MigrationSection, TeamLinks, LogosMarquee, Testimonials, EnterpriseSection, CaseStudies, CTA | Server |
| **For App Owners** | `/for-app-owners` | AppOwnersHero, FeatureSections, FunnelFox, TeamLinks, LogosMarquee, Testimonials, EnterpriseStats, CaseStudies, RelatedLinks, CTA | Server |
| **For Marketers** | `/for-marketers` | MarketerHero, FeatureSectionsMarketer, FunnelFox, TeamLinks, LogosMarquee, Testimonials, EnterpriseSection, CaseStudies, RelatedLinks, CTA | Server |
| **Paywall Builder** | `/paywall-builder` | HeroSection, VideoSection, StatsSection, PhoneMockupSection, FeaturesSection, StickyBenefits, TemplatesCarousel, EnterpriseSection, CaseStudies, RelatedLinksSection, FinalCTASection | Client |
| **Onboarding Builder** | `/onboarding-builder` | HeroSection, VideoDemoSection, FeatureNavigation, LogosSection, FeatureSection x5, PlatformSection, CaseStudySection, CTASection, FAQSection, FinalCTASection | Client |
| **Paywall A/B Testing** | `/paywall-ab-testing` | HeroSection, KeyBenefitsSection, StatsSection, ComparisonSection, HowItWorksSection, TestimonialCarousel, CaseStudies | Server |
| **Revenue Analytics** | `/revenue-analytics` | HeroSection, FeaturesSection, StatsSection, DashboardSection, IntegrationSection, Testimonials, CTA | Server |
| **LTV Analytics** | `/ltv-analytics` | HeroSection, FeatureHighlights, AccuracySection, ComparisonSection, Testimonials, CaseStudies, CTA | Server |
| **Remote Config** | `/remote-config` | HeroSection, FeaturesSection, BenefitsSection, UseCasesSection, Testimonials, EnterpriseSection, CaseStudies, CTA | Server |
| **Predictive Analytics** | `/predictive-analytics` | HeroSection, CapabilitiesSection, AccuracySection, IntegrationSection, Testimonials, CaseStudies, CTA | Server |
| **Integrations** | `/integrations` | HeroSection, IntegrationGrid, EventTypesSection, SDKPlatformGrid, EnterpriseSection, CTA | Client |
| **Demo** | `/demo` | DemoContent | Server |
| **Blog** | `/blog` | Hero, CategoryFilter, SearchBar, FeaturedPost, BlogCard Grid, Pagination | Client |
| **Blog Post** | `/blog/[slug]` | BlogPost (dynamic) | Server |
| **CMS** | `/cms` | CMS Dashboard | Server |
| **CMS Login** | `/cms/login` | Login Form | Server |

### Section Reuse Frequency

```
CTA              ████████████████ 16 pages
Testimonials     ████████████     12 pages
CaseStudies      ███████████      11 pages
EnterpriseSection████████         8 pages
LogosMarquee     ████████         8 pages
FunnelFox        ████             4 pages
Header/Footer    ██████████████████ 18 pages (all)
```

---

## Part 2: Atomic UI Components

### Component Catalog

| Component | Variants | Sizes | CSS Vars Used | Composable |
|-----------|----------|-------|---------------|------------|
| **Button** | primary, secondary, ghost, outline | sm, md, lg | None (Tailwind) | Yes |
| **Card** | default, elevated, bordered, interactive, glass | padding: sm/md/lg | --spacing-*, --radius-*, --shadow-*, --border-* | Yes |
| **Input** | - | sm, md, lg | None (gray palette) | Yes |
| **Badge** | default, success, warning | - | None | No |
| **Container** | - | sm, md, lg, xl, full | Responsive padding | Yes |
| **Section** | - | sm, default, lg | --spacing-*, --bg-* | Yes |
| **Accordion** | single, multiple | - | --spacing-*, --text-*, --transition-* | Yes |
| **Tabs** | default, filled | - | --border-*, --bg-*, --text-*, --transition-* | Yes |
| **Modal** | - | sm, md, lg, xl | None (hardcoded) | Yes |
| **Testimonial** | inline, card, featured | sm, md, lg (avatar) | --spacing-*, --text-*, --font-* | Yes |
| **AnimatedCounter** | - | - | None (framer-motion) | No |
| **GlassCard** | light, dark | padding: sm-xl | None (glassmorphism) | Yes |
| **GlowCard** | - | - | None (SVG-based) | Yes |
| **AnimatedBorderBadge** | - | - | --border-angle | No |
| **AnimatedPath** | - | - | None (SVG) | No |
| **AnimatedGradient** | - | - | None (shader) | No |
| **BackToTop** | - | - | None | No |
| **ScrollIndicator** | - | - | None | No |
| **ShimmerButton** | primary, secondary | - | None | No |
| **ErrorBoundary** | - | - | None | Yes |
| **CodeBlock** | - | - | TBD | No |

### Common Prop Patterns

```typescript
// Size system (Button, Input, Modal share same heights)
type Size = 'sm' | 'md' | 'lg';  // 36px, 44px, 52px

// Variant system
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type CardVariant = 'default' | 'elevated' | 'bordered' | 'interactive' | 'glass';
type BadgeVariant = 'default' | 'success' | 'warning';

// Common optional props
interface CommonProps {
  className?: string;
  href?: string;        // Makes component a link
  external?: boolean;   // Opens in new tab
  fullWidth?: boolean;  // 100% width
}
```

---

## Part 3: Section Components

### Section Catalog

| Section | Category | Uses Components | Has Props | Data Source |
|---------|----------|-----------------|-----------|-------------|
| Hero | Hero | Button, Input, Container, Image | No | Hardcoded |
| HeroWithBadge | Hero | Button, Badge | ✅ Yes | Props |
| HeroWithVideo | Hero | Button, VideoGate | ✅ Yes | Props |
| HeroMinimal | Hero | Button | ✅ Yes | Props |
| PricingHero | Hero | Toggle | ✅ Yes | Props |
| LogosMarquee | Social Proof | Image | No | Hardcoded (7 logos) |
| Features | Feature Grid | Lucide icons | No | Hardcoded (8 features) |
| Integrations | Partners | Image, Link | ✅ Yes | `src/data/integrations.ts` |
| IntegrationGrid | Partners | Image, Link | ✅ Yes | Props (22 items) |
| HowItWorks | Process | Tabs (custom), SVG charts | No | Hardcoded (4 steps) |
| FunnelFox | Feature | Image, Button | No | Hardcoded |
| FeatureWithQuote | Feature | Image, Testimonial | ✅ Yes | Props |
| Pricing | Pricing | GlowCard, Button | ✅ Yes | `src/data/pricing.ts` |
| FeatureSections | Features | Image, Link | No | Hardcoded (5 features) |
| FAQ | FAQ | Accordion (custom) | ✅ Yes | `src/data/faqs.ts` |
| CTA | Call-to-Action | Button | No | Hardcoded |
| CaseStudies | Social Proof | Image, Link | ✅ Yes | `src/data/case-studies.ts` |
| EnterpriseSection | Trust | Image, Link | No | Hardcoded |
| G2Badges | Trust | Image | ✅ Yes | Props |
| Testimonials | Social Proof | AnimatedCounter, Image | ✅ Yes | `src/data/testimonials.ts` |
| StatsSection | Metrics | AnimatedCounter | ✅ Yes | `src/data/stats.ts` |
| RoleCards | Navigation | Image, Link | No | Hardcoded (3 roles) |
| SDKSection | Developer | Tabs (custom), CodeBlock | No | Hardcoded (5 platforms) |
| RelatedFeatures | Navigation | Image, Link | ✅ Yes | Props |
| MigrationCTA | Call-to-Action | Button, AnimatedPath | ✅ Yes | Props |

### Section Categories

```
HERO SECTIONS (3)
├── Hero (main page)
├── FeatureHero (feature pages)
└── RoleHero variants (for-* pages)

SOCIAL PROOF (4)
├── LogosMarquee (client logos)
├── Testimonials (customer quotes)
├── CaseStudies (success stories)
└── EnterpriseSection (G2 badges)

FEATURE SECTIONS (4)
├── Features (grid overview)
├── FeatureSections (detailed with testimonials)
├── RoleCards (audience targeting)
└── FunnelFox (specific feature)

PROCESS/EDUCATIONAL (2)
├── HowItWorks (4-step guide)
└── SDKSection (code examples)

CONVERSION (3)
├── Pricing (pricing table)
├── CTA (call-to-action)
└── FAQ (questions/objections)

UTILITY (1)
└── StatsSection (metrics display)
```

---

## Part 4: Design System Patterns

### 1. Animation Standards

```typescript
// Standard easing curve
const EASE_OUT = [0.16, 1, 0.3, 1];

// Container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// Item animation
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } }
};
```

### 2. Color Tokens (Current)

```css
/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-subtle: #FAFAFA;
--bg-muted: #F5F5F5;
--bg-dark: #0F172A;

/* Text */
--text-primary: #0A0A0A;
--text-secondary: #525252;
--text-tertiary: #A3A3A3;

/* Accents */
--accent-primary: #6366F1;  /* Indigo */
--accent-success: #10B981;  /* Green */
--accent-warning: #F59E0B;  /* Orange */
```

### 3. Typography Scale

```css
--text-display: 4rem;    /* 64px - Hero headlines */
--text-h1: 3rem;         /* 48px - Page titles */
--text-h2: 2.25rem;      /* 36px - Section titles */
--text-h3: 1.5rem;       /* 24px - Card titles */
--text-h4: 1.25rem;      /* 20px - Subsection titles */
--text-lg: 1.125rem;     /* 18px - Large body */
--text-base: 1rem;       /* 16px - Body text */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-xs: 0.75rem;      /* 12px - Captions */
```

### 4. Spacing Scale

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
```

---

## Part 5: Design System Recommendations

### Immediate Actions

1. **Create Props Interfaces for Sections**
   - Allow content to be passed as props
   - Enable CMS integration
   - Support A/B testing of content

2. **Extract Data to Config Files**
   ```
   src/data/
   ├── pricing.ts
   ├── features.ts
   ├── testimonials.ts
   ├── case-studies.ts
   └── faqs.ts
   ```

3. **Standardize Component Variants**
   - Use consistent naming: primary, secondary, ghost, outline
   - Match size system: sm (36px), md (44px), lg (52px)

### Medium-term Improvements

4. **Create Section Templates**
   ```typescript
   // Generic section wrapper
   <SectionTemplate
     background="white" | "gray" | "dark"
     size="sm" | "default" | "lg"
     title="..."
     subtitle="..."
   >
     {children}
   </SectionTemplate>
   ```

5. **Build Card System**
   - FeatureCard, PricingCard, TestimonialCard, CaseStudyCard
   - Share common Card base component
   - Consistent hover/animation behavior

6. **Consolidate Animation Utilities**
   ```typescript
   // src/lib/animations.ts
   export const fadeInUp = { ... };
   export const staggerContainer = { ... };
   export const hoverScale = { ... };
   ```

### Long-term Architecture

7. **Component Composition Pattern**
   ```
   Atomic (ui/)
   ├── Button, Input, Badge, etc.
   │
   Molecules (ui/)
   ├── FeatureCard, PricingCard, TestimonialCard
   │
   Organisms (sections/)
   ├── Features (uses FeatureCard[])
   ├── Pricing (uses PricingCard[])
   │
   Templates (layouts/)
   ├── FeaturePageLayout
   ├── RolePageLayout
   ```

8. **Design Tokens System**
   ```
   tokens/
   ├── colors.ts
   ├── typography.ts
   ├── spacing.ts
   ├── shadows.ts
   └── animations.ts
   ```

---

## Working Files

| File | Purpose |
|------|---------|
| `src/app/globals.css` | CSS variables definition |
| `src/components/ui/` | Atomic components (23 files) |
| `src/components/sections/` | Section components (16+ files) |
| `src/components/layout/` | Header, Footer |
| `thoughts/shared/DESIGN_SYSTEM.md` | Current design documentation |

---

## Next Steps

1. [x] Create data extraction PR (move hardcoded data to `/src/data/`) ✅ Done
2. [x] Add props interfaces to top 5 reused sections ✅ Done (6 sections)
3. [ ] Create shared animation utilities (`src/lib/animations.ts`)
4. [ ] Build card component system (FeatureCard, TestimonialCard, CaseStudyCard)
5. [ ] Document component usage guidelines
6. [ ] Refactor remaining hardcoded sections (LogosMarquee, RoleCards, EnterpriseSection)
7. [ ] Update pages to use new Hero variants
8. [ ] Create CTA section with props (title, subtitle, buttons)

## Data Config Files Created

```
src/data/
├── testimonials.ts    # 5 testimonials with author info
├── case-studies.ts    # 9 case studies with metrics
├── integrations.ts    # 12 integrations with categories
├── pricing.ts         # 4 tiers + 54 feature comparison rows
├── faqs.ts            # 8 general + 4 pricing FAQs
└── stats.ts           # homeStats + enterpriseStats arrays
```

## New Components Created

```
src/components/
├── ui/
│   ├── PromoBanner.tsx      # Dismissible announcement banner
│   └── Toggle.tsx           # Billing toggle (monthly/annual)
├── sections/
│   ├── heroes/
│   │   ├── HeroWithBadge.tsx    # Feature page hero
│   │   ├── HeroWithVideo.tsx    # Email-gated video hero
│   │   ├── HeroMinimal.tsx      # Minimal hero
│   │   ├── PricingHero.tsx      # Pricing page hero
│   │   └── index.ts
│   ├── FeatureWithQuote.tsx     # Feature + testimonial
│   ├── RelatedFeatures.tsx      # Feature links grid
│   ├── MigrationCTA.tsx         # Competitor migration CTA
│   ├── G2Badges.tsx             # G2 award badges
│   └── IntegrationGrid.tsx      # 22-integration grid
```
