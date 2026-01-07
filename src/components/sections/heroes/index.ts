/**
 * Hero Components
 *
 * Reusable hero section variants for different page types.
 *
 * @example
 * // Import individual heroes
 * import { HeroWithBadge, HeroMinimal, PricingHero } from '@/components/sections/heroes';
 *
 * @example
 * // Import specific hero
 * import HeroWithVideo from '@/components/sections/heroes/HeroWithVideo';
 */

export { default as HeroWithBadge } from './HeroWithBadge';
export type { HeroWithBadgeProps } from './HeroWithBadge';

export { default as HeroWithVideo } from './HeroWithVideo';
export type { HeroWithVideoProps } from './HeroWithVideo';

export { default as HeroMinimal } from './HeroMinimal';
export type { HeroMinimalProps } from './HeroMinimal';

export { default as PricingHero } from './PricingHero';
export type { PricingHeroProps } from './PricingHero';
