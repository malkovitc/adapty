---
date: 2026-01-07T00:15:00+0400
session_name: general
researcher: Claude
git_commit: 4360990
branch: main
repository: adapty-website
topic: "Hero Typography Degradation Fix"
tags: [hero, typography, css-variables, regression]
status: in_progress
last_updated: 2026-01-07
last_updated_by: Claude
type: bug_fix
root_span_id: ""
turn_span_id: ""
---

# Handoff: Fix Hero Typography Regression

## Task(s)

### In Progress:
1. **Fix Hero typography regression** - After `aa5013c` CSS variables migration, typography became smaller

### Completed:
1. **Created Design System documentation** - `thoughts/shared/DESIGN_SYSTEM.md`
2. **Identified root cause** - CSS variables are smaller than original Tailwind classes

## Critical References

1. **Good commit (before regression):** `18e7f34` - "Fix dark mode breaking light sections"
2. **Breaking commit:** `aa5013c` - "Migrate components to CSS variables design system"

## Root Cause Analysis

### Typography Regression in Hero.tsx

**H1 Heading:**
```
BEFORE (18e7f34): text-5xl sm:text-6xl lg:text-7xl  = 48px → 60px → 72px
AFTER  (current): text-[var(--text-h1)] sm:text-[var(--text-display)] = 48px → 64px (missing lg!)
```

**Subtitle:**
```
BEFORE: text-xl = 20px
AFTER:  text-[var(--text-lg)] = 18px
```

**Container:**
```
BEFORE: max-w-5xl (1024px)
AFTER:  Container size="md" (also 1024px, but padding different)
```

## Learnings

1. **CSS variables are smaller than original** - `--text-display: 4rem` (64px) vs `text-7xl` (72px)
2. **Lost responsive breakpoint** - Original had 3 breakpoints (sm, lg), new has only 2 (sm)
3. **Light theme is correct** - User confirmed `#FAFAFA` background is correct

## Post-Mortem

### What Worked
- Design system documentation created successfully
- Found exact diff between good/bad commits

### What Failed
- CSS variables migration reduced font sizes without parity check
- Responsive breakpoints were simplified and lost `lg:text-7xl`

### Key Decisions
- Decision: Keep light theme (not dark)
  - User confirmed light is correct for adapty.io match

## Fix Required

### Option 1: Update Hero.tsx to use larger classes
```tsx
// Change from:
className="text-[var(--text-h1)] sm:text-[var(--text-display)]"

// To:
className="text-5xl sm:text-6xl lg:text-7xl"
// OR use CSS variables with lg breakpoint:
className="text-[var(--text-h1)] sm:text-[var(--text-h1-lg)] lg:text-[var(--text-display)]"
```

### Option 2: Update CSS variables to be larger
```css
/* In globals.css */
--text-display: 4.5rem;  /* 72px instead of 64px */
```

### Files to Fix

1. `src/components/sections/Hero.tsx:104-107` - H1 heading classes
2. `src/components/sections/Hero.tsx:114-116` - Subtitle classes
3. `src/app/globals.css:178-186` - Typography CSS variables (if Option 2)

## Artifacts

- `thoughts/shared/DESIGN_SYSTEM.md` - Created design system documentation
- `thoughts/shared/handoffs/general/2026-01-06_23-30-00_adapty-100-percent-coverage.md` - Previous handoff

## Action Items & Next Steps

1. **Compare visually** - Run dev server, compare with adapty.io
2. **Fix Hero.tsx** - Restore original font sizes (use Tailwind classes or bigger CSS vars)
3. **Check other sections** - RoleCards, Testimonials may have same issue
4. **Test responsive** - Verify all breakpoints work correctly

## Useful Commands

```bash
# Run dev server
npm run dev -- -p 3001

# Check good version
git show 18e7f34:src/components/sections/Hero.tsx

# Diff specific file
git diff 18e7f34..HEAD -- src/components/sections/Hero.tsx
```

## Resume Next Session

```
/resume_handoff thoughts/shared/handoffs/general/2026-01-07_00-15-00_hero-typography-fix.md
```
