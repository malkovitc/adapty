export { default as AnimatedGradient } from './AnimatedGradient';
export { default as GlassCard } from './GlassCard';
// Button now uses shadcn/CVA + Framer Motion (migrated from ./Button)
export { Button, ButtonShadcn, buttonVariants } from './button-shadcn';
export type { ButtonProps } from './button-shadcn';
// Input now uses shadcn/CVA pattern
export { Input, inputVariants, EmailIcon } from './input-shadcn';
export type { InputProps } from './input-shadcn';
export { default as Badge } from './Badge';
export { default as AnimatedCounter } from './AnimatedCounter';
export { default as Container } from './Container';
export { default as ScrollIndicator } from './ScrollIndicator';
export { default as BackToTop } from './BackToTop';
export { default as Modal } from './Modal';
export { default as PromoBanner } from './PromoBanner';
export { ShimmerButton } from './ShimmerButton';
export { AnimatedPath } from './AnimatedPath';
export { ErrorBoundary, SectionErrorBoundary } from './ErrorBoundary';
export { default as Toggle } from './Toggle';
export { default as PhoneMockup } from './PhoneMockup';
export { default as TabNavigation } from './TabNavigation';

// shadcn/ui styled components
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
  type CarouselApi,
} from './carousel';

export {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion-shadcn';

export {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './tabs-shadcn';

export { BadgeShadcn, badgeVariants } from './badge-shadcn';
export { Switch } from './switch';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './sheet';

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from './navigation-menu';

export { Progress, progressVariants, indicatorVariants } from './progress';
export { Separator, separatorVariants } from './separator';
export { ScrollArea, ScrollBar } from './scroll-area';

export { FeatureSteps } from './feature-steps';
export type { Feature, FeatureStepsProps } from './feature-steps';

export { Marquee } from './marquee';
