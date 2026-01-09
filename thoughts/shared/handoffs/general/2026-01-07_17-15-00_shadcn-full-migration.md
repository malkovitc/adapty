---
date: 2026-01-07T17:15:00+0400
session_name: general
researcher: Claude
git_commit: 49b3afa
branch: main
repository: adapty-website
topic: "shadcn/UI Full Migration"
tags: [shadcn, ui-components, button, input, migration, cva]
status: complete
last_updated: 2026-01-07
last_updated_by: Claude
type: implementation_strategy
---

# Handoff: shadcn/UI Full Migration Complete

## Task(s)

### Completed
1. **shadcn Component Migration** - All UI components migrated to shadcn/CVA pattern:
   - Button (with Adapty brand gradient)
   - Input (with icon support, CVA variants)
   - Sheet (mobile navigation)
   - Switch (pricing toggle)
   - NavigationMenu, Carousel, Tabs, Accordion, Badge
   - Progress, Separator, ScrollArea, Dialog, Popover, Select, Tooltip, Table

2. **Button Migration Across Codebase**:
   - SDKSection.tsx, HowItWorks.tsx, Testimonials.tsx
   - PricingTable.tsx, TemplatesCarousel.tsx
   - HeroWithVideo.tsx, PricingHero.tsx, VideoPreview.tsx, VideoGateForm.tsx
   - blog/page.tsx, SDKMethods.tsx

3. **Header Modernization**:
   - Sheet component for mobile menu
   - Navigation buttons kept as raw (too custom for Button component)

4. **Button Design Refinement**:
   - Adapty brand gradient: `from-[#4F8EF7] via-[#6366F1] to-[#8B5CF6]`
   - Inner highlight shadow for depth
   - `rounded-lg` to match Input
   - `cursor-pointer` added

## Critical References
- `src/components/ui/button-shadcn.tsx` - Main Button with CVA + Framer Motion
- `src/components/ui/input-shadcn.tsx` - Input with CVA pattern
- `src/components/ui/index.ts` - Barrel exports

## Recent changes
- `src/components/ui/button-shadcn.tsx:15-18` - Adapty brand gradient with inset shadow
- `src/components/ui/input-shadcn.tsx` - New Input component with CVA
- `src/components/layout/Header.tsx` - Sheet for mobile, raw buttons for nav dropdowns
- `src/components/sections/Pricing.tsx` - Switch for billing toggle
- 68 files total in commit

## Learnings

1. **Button component breaks flex layouts**: Navigation dropdowns with chevrons broke when using Button - the CVA classes override flex alignment. Solution: Keep nav dropdowns as raw buttons.

2. **CVA pattern for shadcn**:
   ```tsx
   const variants = cva("base-classes", {
     variants: { size: {...}, variant: {...} },
     defaultVariants: { size: "md", variant: "default" }
   });
   ```

3. **Import pattern**:
   ```tsx
   import { Button, Input, EmailIcon } from '@/components/ui';
   ```

4. **Button gradient formula** (Adapty brand):
   - From: `#4F8EF7` (blue)
   - Via: `#6366F1` (indigo)
   - To: `#8B5CF6` (violet)
   - Inset shadow: `inset_0_1px_0_rgba(255,255,255,0.2)`

## Post-Mortem

### What Worked
- Parallel agent migration for multiple files
- CVA for variant management
- Keeping Framer Motion animations in Button
- Barrel export pattern

### What Failed
- Button component in Header nav broke chevron alignment
- Had to revert Header nav buttons to raw buttons

### Key Decisions
- Decision: Keep Header navigation as raw buttons
  - Reason: Button CVA classes override flex alignment needed for chevron icons

- Decision: Use 3-color gradient (via) for Button
  - Reason: More depth and premium look than 2-color

## Artifacts
- `src/components/ui/button-shadcn.tsx` - Button with CVA + Framer
- `src/components/ui/input-shadcn.tsx` - Input with CVA
- `src/components/ui/sheet.tsx` - Mobile drawer
- `src/components/ui/switch.tsx` - Toggle switch
- `src/components/ui/index.ts` - All exports

## Action Items & Next Steps

1. **Visual QA** - Test all buttons across pages for consistency
2. **Add more shadcn components** as needed:
   - AlertDialog (confirmation modals)
   - HoverCard (preview cards)
   - Command (command palette)
3. **Consider NavigationMenu** for desktop dropdowns (currently uses custom)

## Other Notes

### Available shadcn Components
All styled with Adapty design system:
- Button, Input, Switch, Sheet
- Carousel, Accordion, Tabs, Badge
- Dialog, Popover, Tooltip, Select
- Progress, Separator, ScrollArea, Skeleton, Table, NavigationMenu
