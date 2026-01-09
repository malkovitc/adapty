# Adapty Design System

Документация переиспользуемых компонентов и секций для adapty-website.

---

## 1. CSS Variables (Design Tokens)

Все токены определены в `src/app/globals.css`.

### 1.1 Цвета

```css
/* Backgrounds */
--bg-primary: #FFFFFF;      /* Основной фон */
--bg-subtle: #FAFAFA;       /* Серый фон секций */
--bg-muted: #F5F5F5;        /* Приглушенный фон */
--bg-dark: #0F172A;         /* Темный фон */

/* Text */
--text-primary: #0A0A0A;    /* Основной текст */
--text-secondary: #525252;  /* Вторичный текст */
--text-tertiary: #A3A3A3;   /* Третичный текст */
--text-light: #FFFFFF;      /* Текст на темном фоне */

/* Borders */
--border-default: #E5E5E5;  /* Обычные границы */
--border-strong: #D4D4D4;   /* Усиленные границы */

/* Accents */
--accent-primary: #6366F1;  /* Violet - основной акцент */
--accent-success: #10B981;  /* Green */
--accent-warning: #F59E0B;  /* Orange */
```

### 1.2 Типографика

```css
/* Font Sizes */
--text-display: 4rem;       /* 64px - Hero headlines */
--text-h1: 3rem;            /* 48px - Page titles */
--text-h2: 2.25rem;         /* 36px - Section titles */
--text-h3: 1.5rem;          /* 24px - Card titles */
--text-h4: 1.25rem;         /* 20px - Subsection titles */
--text-lg: 1.125rem;        /* 18px - Large body */
--text-base: 1rem;          /* 16px - Body text */
--text-sm: 0.875rem;        /* 14px - Small text */
--text-xs: 0.75rem;         /* 12px - Captions */

/* Line Heights */
--leading-tight: 1.1;       /* Headlines */
--leading-snug: 1.25;       /* Subheadlines */
--leading-normal: 1.5;      /* Body text */
--leading-relaxed: 1.625;   /* Large body */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 1.3 Spacing

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
```

### 1.4 Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### 1.5 Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

---

## 2. Layout Components

### 2.1 Container

**Файл:** `src/components/ui/Container.tsx`

Центрирует контент с responsive padding.

```tsx
import Container from '@/components/ui/Container';

// Базовое использование (1100px max-width)
<Container>Content</Container>

// С вариантами размера
<Container size="sm">768px max</Container>
<Container size="md">1024px max</Container>
<Container size="default">1100px max (default)</Container>
<Container size="lg">1152px max</Container>
<Container size="full">1280px max</Container>

// Как семантический элемент
<Container as="main">Main content</Container>
<Container as="section">Section content</Container>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'default' \| 'lg' \| 'full'` | `'default'` | Max-width variant |
| `as` | `'div' \| 'section' \| 'article' \| 'main'` | `'div'` | HTML element |
| `className` | `string` | - | Additional classes |

---

### 2.2 Section

**Файл:** `src/components/ui/Section.tsx`

Обертка секции с вертикальным padding и фоном.

```tsx
import Section from '@/components/ui/Section';

// Базовое использование
<Section>
  <Container>Content</Container>
</Section>

// С вариантами
<Section size="sm" background="gray">
  <Container>Gray background section</Container>
</Section>

<Section size="lg" background="dark">
  <Container>Dark section</Container>
</Section>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Vertical padding |
| `background` | `'white' \| 'gray' \| 'dark' \| 'gradient'` | `'white'` | Background style |
| `id` | `string` | - | Section ID for anchors |

**Размеры padding:**
- `sm`: 48px (mobile: 32px)
- `default`: 64px (mobile: 48px)
- `lg`: 96px (mobile: 64px)

---

## 3. UI Components

### 3.1 Button

**Файл:** `src/components/ui/Button.tsx`

Универсальная кнопка с 4 вариантами стилей.

```tsx
import Button from '@/components/ui/Button';

// Variants
<Button variant="primary">Start for free</Button>
<Button variant="secondary">Learn more</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">View all →</Button>

// Sizes
<Button size="sm">Small (36px)</Button>
<Button size="md">Medium (44px)</Button>
<Button size="lg">Large (52px)</Button>

// As link
<Button href="/pricing">Go to pricing</Button>
<Button href="https://app.adapty.io" external>Open app</Button>

// With icon
<Button icon={<ArrowRight />} iconPosition="right">Next</Button>

// States
<Button loading>Processing...</Button>
<Button disabled>Disabled</Button>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Fixed height |
| `href` | `string` | - | Makes button a link |
| `external` | `boolean` | `false` | Opens in new tab |
| `icon` | `ReactNode` | - | Icon element |
| `iconPosition` | `'left' \| 'right'` | `'right'` | Icon placement |
| `loading` | `boolean` | `false` | Loading state |
| `fullWidth` | `boolean` | `false` | Full width |

**Стили вариантов:**
- **primary**: Gradient purple→pink, белый текст, тень
- **secondary**: Серая граница, темный текст
- **outline**: Фиолетовая граница, hover заливка
- **ghost**: Без фона, фиолетовый текст + стрелка

---

### 3.2 Card

**Файл:** `src/components/ui/Card.tsx`

Карточка с несколькими вариантами стилей.

```tsx
import Card from '@/components/ui/Card';

// Variants
<Card variant="default">Default shadow</Card>
<Card variant="elevated">Stronger shadow + hover lift</Card>
<Card variant="bordered">Border instead of shadow</Card>
<Card variant="interactive">Hover gradient effect</Card>
<Card variant="glass">Glassmorphism</Card>

// Padding
<Card padding="none">No padding</Card>
<Card padding="sm">16px</Card>
<Card padding="md">24px (default)</Card>
<Card padding="lg">32px</Card>

// As link
<Card href="/feature" variant="interactive">
  Click me
</Card>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'bordered' \| 'interactive' \| 'glass'` | `'default'` | Visual style |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `rounded` | `'md' \| 'lg' \| 'xl' \| '2xl'` | `'xl'` | Border radius |
| `href` | `string` | - | Makes card clickable link |

---

### 3.3 Badge

**Файл:** `src/components/ui/Badge.tsx`

Бейдж для лейблов и тегов.

```tsx
import Badge from '@/components/ui/Badge';

<Badge>Default (purple)</Badge>
<Badge variant="success">Success (green)</Badge>
<Badge variant="warning">Warning (yellow)</Badge>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning'` | `'default'` | Color scheme |

---

### 3.4 Input

**Файл:** `src/components/ui/Input.tsx`

Поле ввода, совместимое с Button по высоте.

```tsx
import Input, { EmailIcon } from '@/components/ui/Input';

// Basic
<Input placeholder="Enter email" />

// With icon
<Input icon={<EmailIcon />} placeholder="your@email.com" />

// Sizes (match Button heights)
<Input size="sm" />  {/* 36px */}
<Input size="md" />  {/* 44px */}
<Input size="lg" />  {/* 52px */}

// Error state
<Input error="Please enter valid email" />

// With label
<Input label="Email address" />

// Hero form pattern
<div className="flex gap-2">
  <Input size="lg" placeholder="Email" />
  <Button size="lg">Submit</Button>
</div>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height matching Button |
| `icon` | `ReactNode` | - | Icon element |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon placement |
| `error` | `string \| boolean` | - | Error state/message |
| `label` | `string` | - | Label above input |
| `fullWidth` | `boolean` | `false` | Full width |

---

### 3.5 Accordion

**Файл:** `src/components/ui/Accordion.tsx`

Раскрывающийся аккордеон для FAQ.

```tsx
import { Accordion, AccordionItem } from '@/components/ui/Accordion';

// Single item open (default)
<Accordion defaultOpen="q1">
  <AccordionItem id="q1" trigger="Question 1?">
    Answer 1
  </AccordionItem>
  <AccordionItem id="q2" trigger="Question 2?">
    Answer 2
  </AccordionItem>
</Accordion>

// Multiple items open
<Accordion type="multiple" defaultOpen={['q1', 'q2']}>
  ...
</Accordion>
```

**Props Accordion:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | One or many open |
| `defaultOpen` | `string \| string[]` | - | Initially open items |

**Props AccordionItem:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique identifier |
| `trigger` | `ReactNode` | required | Clickable header |
| `showChevron` | `boolean` | `true` | Show chevron icon |

---

### 3.6 Tabs

**Файл:** `src/components/ui/Tabs.tsx`

Tabs для SDK code examples и navigation.

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tabs';

<Tabs defaultValue="swift">
  <TabList>
    <Tab value="swift">Swift</Tab>
    <Tab value="kotlin">Kotlin</Tab>
    <Tab value="react-native">React Native</Tab>
  </TabList>
  <TabPanel value="swift">Swift code...</TabPanel>
  <TabPanel value="kotlin">Kotlin code...</TabPanel>
  <TabPanel value="react-native">RN code...</TabPanel>
</Tabs>

// Filled variant (pill style)
<Tabs defaultValue="monthly">
  <TabListFilled>
    <TabFilled value="monthly">Monthly</TabFilled>
    <TabFilled value="yearly">Yearly</TabFilled>
  </TabListFilled>
  ...
</Tabs>
```

---

### 3.7 Testimonial

**Файл:** `src/components/ui/Testimonial.tsx`

Цитата клиента с 3 вариантами.

```tsx
import Testimonial from '@/components/ui/Testimonial';

// Inline - compact, for feature sections
<Testimonial
  variant="inline"
  quote="Great product!"
  author={{
    name: "John Doe",
    role: "CEO",
    company: "TechCorp"
  }}
/>

// Card - boxed, for grids
<Testimonial
  variant="card"
  quote="Amazing experience..."
  author={{
    name: "Jane Smith",
    role: "CTO",
    avatar: "/avatars/jane.jpg",
    companyLogo: "/logos/company.svg"
  }}
/>

// Featured - large, for hero sections
<Testimonial
  variant="featured"
  quote="Increased revenue by 40%"
  author={{ name: "CEO", role: "Founder" }}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'inline' \| 'card' \| 'featured'` | `'card'` | Display style |
| `quote` | `string` | required | Quote text |
| `author` | `TestimonialAuthor` | required | Author info |

---

### 3.8 AnimatedCounter

**Файл:** `src/components/ui/AnimatedCounter.tsx`

Анимированный счетчик для stats секций.

```tsx
import AnimatedCounter from '@/components/ui/AnimatedCounter';

<AnimatedCounter
  value={1.9}
  prefix="$"
  suffix="B+"
  decimals={1}
  duration={2}
/>

<AnimatedCounter
  value={15000}
  suffix="+"
  useCommas={true}
/>

<AnimatedCounter
  value={99.99}
  suffix="%"
  decimals={2}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | required | Target value |
| `prefix` | `string` | `''` | Before number |
| `suffix` | `string` | `''` | After number |
| `decimals` | `number` | `0` | Decimal places |
| `duration` | `number` | `2` | Animation seconds |
| `useCommas` | `boolean` | `true` | Number formatting |

---

## 4. Section Components

### 4.1 Hero

**Файл:** `src/components/sections/Hero.tsx`

Hero секция главной страницы.

```tsx
import Hero from '@/components/sections/Hero';

// В page.tsx
<Hero />
```

**Содержит:**
- Animated gradient border badge
- H1 заголовок
- Subtitle
- Email input form
- Ghost CTA link
- Dashboard screenshot
- "Trusted by" text

---

### 4.2 FeatureHero

**Файл:** `src/components/sections/feature-pages/FeatureHero.tsx`

Hero для feature-страниц.

```tsx
import FeatureHero from '@/components/sections/feature-pages/FeatureHero';

<FeatureHero
  badge="PAYWALL MANAGEMENT"
  title="Build money-making paywalls"
  titleHighlight="paywalls"
  description="Create, edit, and release payment screens in minutes."
  primaryCTA={{ text: "Start free", href: "/signup" }}
  secondaryCTA={{ text: "Book demo", href: "/demo" }}
  image={{ src: "/images/feature.webp", alt: "Feature" }}
/>
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `badge` | `string` | Category label (uppercase) |
| `title` | `string` | Main headline |
| `titleHighlight` | `string?` | Part to highlight with gradient |
| `description` | `string` | Subtitle text |
| `primaryCTA` | `{text, href}` | Primary button |
| `secondaryCTA` | `{text, href}` | Secondary button |
| `image` | `{src, alt}` | Hero image |

---

### 4.3 Testimonials

**Файл:** `src/components/sections/Testimonials.tsx`

Комбинированная секция Stats + Testimonials Carousel.

```tsx
import Testimonials from '@/components/sections/Testimonials';

<Testimonials />
```

**Содержит:**
- Stats секция (4 счетчика с AnimatedCounter)
- Dark background testimonials carousel
- Photo + quote + author + company logo
- Navigation arrows + dots

---

### 4.4 CaseStudies

**Файл:** `src/components/sections/CaseStudies.tsx`

Сетка case study карточек.

```tsx
import CaseStudies from '@/components/sections/CaseStudies';

<CaseStudies />
```

**Содержит:**
- Section header
- 3x2 grid карточек (6 studies)
- App icon + company + category
- Metric highlight (violet)
- Description + "Read more" link
- "Read all cases" button

---

### 4.5 CTA

**Файл:** `src/components/sections/CTA.tsx`

Финальная Call-to-Action секция.

```tsx
import CTA from '@/components/sections/CTA';

<CTA />
```

**Pattern:**
```
┌─────────────────────────────────────┐
│   "Ready to boost your revenue?"    │
│                                     │
│   [Start for free]  [Book a demo]   │
└─────────────────────────────────────┘
```

---

### 4.6 FAQ

**Файл:** `src/components/sections/FAQ.tsx`

FAQ секция с аккордеоном.

```tsx
import FAQ from '@/components/sections/FAQ';

<FAQ />
```

---

### 4.7 EnterpriseSection

**Файл:** `src/components/sections/EnterpriseSection.tsx`

Enterprise features + G2 badges.

```tsx
import EnterpriseSection from '@/components/sections/EnterpriseSection';

<EnterpriseSection />
```

**Содержит:**
- 3 колонки: Secure, Reliable, Responsive
- SOC2 verified, 99.99% SLA
- 5 G2 badges в ряд

---

### 4.8 StatsSection

**Файл:** `src/components/sections/StatsSection.tsx`

Standalone stats секция.

```tsx
import StatsSection from '@/components/sections/StatsSection';

<StatsSection />
```

**Содержит:**
- "$1.9B+ tracked revenue"
- "99.99% uptime"
- "15,000+ apps"
- "4.8 G2 rating"

---

### 4.9 RoleCards

**Файл:** `src/components/sections/RoleCards.tsx`

3 карточки ролей.

```tsx
import RoleCards from '@/components/sections/RoleCards';

<RoleCards />
```

**Pattern:**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ For Developers│ │ For App Owners│ │ For Marketers │
│ [illustration]│ │ [illustration]│ │ [illustration]│
│ • SDK         │ │ • Analytics   │ │ • A/B testing │
│ • Refund Saver│ │ • LTV         │ │ • No-code     │
│ • Remote cfg  │ │ • Predictions │ │ • Localization│
└──────────────┘ └──────────────┘ └──────────────┘
```

---

### 4.10 SDKSection

**Файл:** `src/components/sections/SDKSection.tsx`

SDK код + platform grid.

```tsx
import SDKSection from '@/components/sections/SDKSection';

<SDKSection />
```

**Содержит:**
- Tabs с кодом (Swift, Kotlin, React Native, Flutter, Unity)
- GitHub link
- "Get the SDK for your platform" grid

---

### 4.11 Integrations

**Файл:** `src/components/sections/Integrations.tsx`

Карусель интеграций.

```tsx
import Integrations from '@/components/sections/Integrations';

<Integrations />
```

---

### 4.12 LogosMarquee

**Файл:** `src/components/sections/LogosMarquee.tsx`

Бегущая строка логотипов клиентов.

```tsx
import LogosMarquee from '@/components/sections/LogosMarquee';

<LogosMarquee />
```

---

## 5. Page Templates

### 5.1 Standard Feature Page

```tsx
// src/app/[feature-name]/page.tsx

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeatureHero from '@/components/sections/feature-pages/FeatureHero';
import Testimonials from '@/components/sections/Testimonials';
import EnterpriseSection from '@/components/sections/EnterpriseSection';
import CaseStudies from '@/components/sections/CaseStudies';
import CTA from '@/components/sections/CTA';

export default function FeaturePage() {
  return (
    <>
      <Header />
      <main>
        <FeatureHero
          badge="CATEGORY"
          title="Feature title"
          description="Feature description"
          primaryCTA={{ text: "Start free", href: "..." }}
          secondaryCTA={{ text: "Book demo", href: "..." }}
          image={{ src: "...", alt: "..." }}
        />

        {/* FeatureWithQuote sections (4-6) */}

        <Testimonials />
        <EnterpriseSection />
        <CaseStudies />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
```

### 5.2 FeatureWithQuote Pattern (inline)

```tsx
<Section background="white">
  <Container>
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Image */}
      <div className="rounded-2xl overflow-hidden">
        <Image src="..." alt="..." width={600} height={400} />
      </div>

      {/* Content */}
      <div>
        <h2 className="text-[var(--text-h2)] font-bold mb-4">
          Feature Title
        </h2>
        <p className="text-[var(--text-lg)] text-[var(--text-secondary)] mb-6">
          Feature description...
        </p>
        <Button variant="ghost" href="/learn-more">Learn more</Button>

        {/* Inline testimonial */}
        <Testimonial
          variant="inline"
          quote="Great feature!"
          author={{ name: "John", role: "CEO", company: "Corp" }}
        />
      </div>
    </div>
  </Container>
</Section>
```

---

## 6. File Structure

```
src/components/
├── ui/                    # Atomic UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   ├── Container.tsx
│   ├── Section.tsx
│   ├── Accordion.tsx
│   ├── Tabs.tsx
│   ├── Testimonial.tsx
│   ├── AnimatedCounter.tsx
│   ├── Modal.tsx
│   └── CodeBlock.tsx
│
├── sections/              # Page sections
│   ├── Hero.tsx
│   ├── CTA.tsx
│   ├── FAQ.tsx
│   ├── Testimonials.tsx
│   ├── CaseStudies.tsx
│   ├── StatsSection.tsx
│   ├── RoleCards.tsx
│   ├── SDKSection.tsx
│   ├── Integrations.tsx
│   ├── LogosMarquee.tsx
│   ├── EnterpriseSection.tsx
│   ├── FeatureSections.tsx
│   ├── FunnelFox.tsx
│   ├── Pricing.tsx
│   ├── PricingTable.tsx
│   ├── PricingHero.tsx
│   ├── PricingFAQ.tsx
│   └── feature-pages/
│       ├── FeatureHero.tsx
│       └── FeatureGrid.tsx
│
├── layout/                # Global layout
│   ├── Header.tsx
│   └── Footer.tsx
│
└── icons/                 # Custom icons
    └── *.tsx
```

---

## 7. Component Status

### Ready for Use
| Component | Path | Notes |
|-----------|------|-------|
| Button | ui/Button.tsx | All variants |
| Card | ui/Card.tsx | All variants |
| Container | ui/Container.tsx | All sizes |
| Section | ui/Section.tsx | All backgrounds |
| Accordion | ui/Accordion.tsx | Single/Multiple |
| Tabs | ui/Tabs.tsx | Standard/Filled |
| Input | ui/Input.tsx | With icon/error |
| AnimatedCounter | ui/AnimatedCounter.tsx | With formatting |
| Testimonial | ui/Testimonial.tsx | 3 variants |
| Hero | sections/Hero.tsx | Main page |
| FeatureHero | sections/feature-pages/FeatureHero.tsx | Feature pages |
| Testimonials | sections/Testimonials.tsx | Stats + Carousel |
| CaseStudies | sections/CaseStudies.tsx | Grid layout |
| CTA | sections/CTA.tsx | Standard |
| FAQ | sections/FAQ.tsx | With Accordion |
| EnterpriseSection | sections/EnterpriseSection.tsx | Features + G2 |
| Header | layout/Header.tsx | Mega-menu |
| Footer | layout/Footer.tsx | Full links |

### Needs Enhancement
| Component | Status | What's Missing |
|-----------|--------|----------------|
| Badge | Partial | More variants (announcement, stat) |
| Input | Partial | InputWithButton combo |
| PromoBanner | Missing | Dismissible announcement bar |
| Toggle | Missing | Monthly/Yearly switch |
| Select | Missing | Dropdown component |
| Tooltip | Missing | Hover tooltips |
| Marquee | Partial | Smooth infinite scroll |

---

## 8. Usage Guidelines

### Importing
```tsx
// UI components
import Button from '@/components/ui/Button';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tabs';

// Sections
import Hero from '@/components/sections/Hero';
import CTA from '@/components/sections/CTA';

// Layout
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
```

### CSS Variables Usage
```tsx
// В className
className="bg-[var(--bg-subtle)] text-[var(--text-primary)]"
className="p-[var(--spacing-lg)] rounded-[var(--radius-xl)]"
className="shadow-[var(--shadow-md)]"
className="text-[var(--text-h2)] font-[var(--font-bold)]"
```

### Responsive Patterns
```tsx
// Mobile-first grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-md)]">

// Responsive text
<h1 className="text-[var(--text-h1)] sm:text-[var(--text-display)]">

// Responsive spacing
<Section className="py-[var(--spacing-2xl)] lg:py-[var(--spacing-3xl)]">
```

---

*Last updated: 2026-01-06*
*Based on adapty-website codebase analysis*
