'use client';

import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown, Sparkles } from 'lucide-react';

// Types
type FeatureValue = boolean | string;

interface Feature {
  name: string;
  free: FeatureValue;
  pro: FeatureValue;
  proPlus: FeatureValue;
  enterprise: FeatureValue;
}

interface Category {
  name: string;
  features: Feature[];
}

// Feature comparison data
const featureCategories: Category[] = [
  {
    name: 'Purchases Infrastructure',
    features: [
      { name: 'In-app purchase SDK', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Receipt validation', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Fallback paywalls', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Cross-platform subscriber sync', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'API', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Stripe integration', free: false, pro: true, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Integrations',
    features: [
      { name: 'Analytics integrations', free: 'Basic', pro: 'Full', proPlus: 'Full', enterprise: 'Full' },
      { name: 'Raw platform data forwarding', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Webhook', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'ETL integrations', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Paywall management',
    features: [
      { name: 'Remote paywall config', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'No-code paywall builder', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Paywall timer', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Trial toggle', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Paywall carousel widget', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Paywall video widget', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Plan tabs and view more', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Price management', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Paywall localization', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Table view for remote config', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Analytics',
    features: [
      { name: 'Basic subscription analytics', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Reporting timezone', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Overview analytics', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Regular email reports', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'CSV metric export', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Chart types', free: 'Basic', pro: 'Advanced', proPlus: 'Advanced', enterprise: 'Advanced' },
      { name: 'LTV chart', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Comparison in charts', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Advanced filters', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'Grouping', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'Advanced analytics', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'Revenue and LTV prediction', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'Advanced cohort analysis', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Monetization experiments',
    features: [
      { name: 'Paywall A/B testing', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Subscription price testing', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'Paywall targeting', free: false, pro: true, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'CRM',
    features: [
      { name: 'Customer list', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'User segments', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Subscriber event history', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Manual access level assigning', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Custom attribute management', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Security & Compliance',
    features: [
      { name: 'SOC 2 Type II compliance', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'GDPR compliance', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Data residency (US or EU)', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Admin controls',
    features: [
      { name: 'Seats', free: '1', pro: '3', proPlus: '6', enterprise: 'Unlimited' },
      { name: 'Member roles', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'App level access', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Customer service',
    features: [
      { name: '24/7 support', free: 'Community', pro: 'Chat', proPlus: 'Priority chat', enterprise: 'Slack realtime' },
      { name: 'Migration assistance', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Personal onboarding', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'App review consultation', free: false, pro: false, proPlus: false, enterprise: true },
      { name: 'Custom contract and SLA', free: false, pro: false, proPlus: false, enterprise: true },
      { name: 'Custom market reports', free: false, pro: false, proPlus: false, enterprise: true },
      { name: 'Custom pricing', free: false, pro: false, proPlus: false, enterprise: true },
    ],
  },
];

// Plan headers data
const plans = [
  { key: 'free', name: 'Free', price: '$0', subtext: 'per month' },
  { key: 'pro', name: 'Pro', price: '1%', subtext: 'min $99/mo', highlighted: false },
  { key: 'proPlus', name: 'Pro+', price: '1.2%', subtext: 'min $499/mo', highlighted: true, badge: 'Most Popular' },
  { key: 'enterprise', name: 'Enterprise', price: 'Custom', subtext: 'contact sales' },
];

// Feature value cell component
const FeatureCell = memo(function FeatureCell({
  value,
  isHighlighted,
}: {
  value: FeatureValue;
  isHighlighted?: boolean;
}) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className={`w-5 h-5 mx-auto ${isHighlighted ? 'text-indigo-500' : 'text-green-600'}`} />
    ) : (
      <X className="w-5 h-5 mx-auto text-slate-300" />
    );
  }
  return (
    <span className={`text-sm font-medium ${isHighlighted ? 'text-indigo-600' : 'text-slate-700'}`}>
      {value}
    </span>
  );
});

// Category row component
const CategoryRow = memo(function CategoryRow({
  category,
  isExpanded,
  onToggle,
  index,
}: {
  category: Category;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <>
      {/* Category header row */}
      <motion.tr
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="bg-slate-50 cursor-pointer group hover:bg-slate-100 transition-colors"
        onClick={onToggle}
      >
        <td
          colSpan={5}
          className="py-4 px-4 sm:px-6"
        >
          <button
            className="flex items-center gap-3 w-full text-left touch-manipulation"
            aria-expanded={isExpanded}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-indigo-500 transition-colors" />
            </motion.div>
            <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {category.name}
            </span>
            <span className="text-sm text-slate-500">
              ({category.features.length} features)
            </span>
          </button>
        </td>
      </motion.tr>

      {/* Feature rows */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <>
            {category.features.map((feature, featureIndex) => (
              <motion.tr
                key={feature.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  transition: {
                    opacity: { duration: 0.3, delay: featureIndex * 0.02 },
                    height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: {
                    opacity: { duration: 0.15 },
                    height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-3 px-4 sm:px-6 text-sm text-slate-700">
                  {feature.name}
                </td>
                <td className="py-3 px-2 sm:px-4 text-center">
                  <FeatureCell value={feature.free} />
                </td>
                <td className="py-3 px-2 sm:px-4 text-center">
                  <FeatureCell value={feature.pro} />
                </td>
                <td className="py-3 px-2 sm:px-4 text-center bg-indigo-50/50">
                  <FeatureCell value={feature.proPlus} isHighlighted />
                </td>
                <td className="py-3 px-2 sm:px-4 text-center">
                  <FeatureCell value={feature.enterprise} />
                </td>
              </motion.tr>
            ))}
          </>
        )}
      </AnimatePresence>
    </>
  );
});

// Mobile card component for each plan
const MobilePlanCard = memo(function MobilePlanCard({
  plan,
  categories,
  expandedCategories,
  onToggleCategory,
}: {
  plan: typeof plans[0];
  categories: Category[];
  expandedCategories: Set<number>;
  onToggleCategory: (index: number) => void;
}) {
  const planKey = plan.key as keyof Feature;

  return (
    <div
      className={`rounded-xl border ${
        plan.highlighted
          ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
          : 'border-slate-200'
      } bg-white overflow-hidden`}
    >
      {/* Plan header */}
      <div
        className={`p-4 ${
          plan.highlighted
            ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white'
            : 'bg-slate-50'
        }`}
      >
        {plan.highlighted && plan.badge && (
          <div className="flex items-center gap-1.5 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {plan.badge}
          </div>
        )}
        <h3 className={`text-xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1 mt-1">
          <span className={`text-2xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
            {plan.price}
          </span>
          <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-slate-500'}`}>
            {plan.subtext}
          </span>
        </div>
      </div>

      {/* Categories */}
      <div className="divide-y divide-slate-100">
        {categories.map((category, categoryIndex) => (
          <div key={category.name}>
            <button
              onClick={() => onToggleCategory(categoryIndex)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors touch-manipulation"
            >
              <span className="font-medium text-slate-900">{category.name}</span>
              <motion.div
                animate={{ rotate: expandedCategories.has(categoryIndex) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {expandedCategories.has(categoryIndex) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-2">
                    {category.features.map((feature) => {
                      const value = feature[planKey];
                      return (
                        <div
                          key={feature.name}
                          className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                        >
                          <span className="text-sm text-slate-600">{feature.name}</span>
                          <div className="ml-4 flex-shrink-0">
                            <FeatureCell value={value} isHighlighted={plan.highlighted} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
});

export default function PricingTable() {
  // Initialize with all categories expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    () => new Set(featureCategories.map((_, index) => index))
  );
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLTableSectionElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Handle sticky header detection
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current && headerRef.current) {
        const tableRect = tableRef.current.getBoundingClientRect();
        const headerHeight = 80; // Approximate header height
        setIsSticky(tableRect.top <= headerHeight && tableRect.bottom > headerHeight + 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCategory = useCallback((index: number) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedCategories(new Set(featureCategories.map((_, index) => index)));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedCategories(new Set());
  }, []);

  return (
    <section id="pricing-table" className="relative py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-100/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold uppercase tracking-wider text-[#6366F1] mb-4"
          >
            Feature Comparison
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
          >
            Compare all{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
              features
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-slate-600 mb-8"
            style={{ maxWidth: '48rem', margin: '0 auto 2rem auto' }}
          >
            Detailed comparison of all 54 features across our plans.
          </motion.p>

          {/* Expand/Collapse controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={expandAll}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors touch-manipulation px-4 py-2"
            >
              Expand all
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={collapseAll}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors touch-manipulation px-4 py-2"
            >
              Collapse all
            </button>
          </motion.div>
        </div>

        {/* Desktop Table */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                ref={headerRef}
                className={`transition-all duration-300 ${
                  isSticky
                    ? 'sticky top-[80px] z-20 shadow-md'
                    : ''
                }`}
              >
                <tr className="bg-white border-b-2 border-slate-200">
                  <th className="text-left py-6 px-6 font-semibold text-slate-900 w-[280px]">
                    Features
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.key}
                      className={`py-6 px-4 text-center ${
                        plan.highlighted
                          ? 'bg-gradient-to-b from-indigo-500 to-blue-600'
                          : ''
                      }`}
                    >
                      {plan.highlighted && plan.badge && (
                        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-white mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          {plan.badge}
                        </div>
                      )}
                      <div className={`font-bold text-lg ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                        {plan.name}
                      </div>
                      <div className={`mt-1 ${plan.highlighted ? 'text-white/80' : 'text-slate-500'}`}>
                        <span className="font-semibold">{plan.price}</span>
                        <span className="text-sm ml-1">{plan.subtext}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureCategories.map((category, index) => (
                  <CategoryRow
                    key={category.name}
                    category={category}
                    isExpanded={expandedCategories.has(index)}
                    onToggle={() => toggleCategory(index)}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <MobilePlanCard
                plan={plan}
                categories={featureCategories}
                expandedCategories={expandedCategories}
                onToggleCategory={toggleCategory}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500">
            Need help choosing?{' '}
            <a
              href="mailto:sales@adapty.io"
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              Talk to our sales team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
