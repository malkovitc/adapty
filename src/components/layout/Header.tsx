'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { navigation, productTabs, type NavigationItem } from '@/data';

// Throttle function for performance optimization
function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
];


// Product Mega Menu Component
function ProductMegaMenu({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const currentTab = productTabs.find((tab) => tab.name === activeTab) || productTabs[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
          style={{ minWidth: '800px' }}
        >
          <div className="flex">
            {/* Left sidebar with tabs */}
            <div className="w-48 bg-slate-50 border-r border-slate-200 py-4">
              {productTabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab.name
                      ? 'text-violet-600 bg-white border-l-2 border-violet-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.name}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Right content area */}
            <div className="flex-1 p-6">
              {/* Top links row */}
              {currentTab.topLinks && (
                <div className="flex gap-8 mb-6 pb-4 border-b border-slate-200">
                  {currentTab.topLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={onClose}
                      className="text-sm font-medium text-slate-900 hover:text-violet-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Categories grid */}
              {currentTab.categories && (
                <div className="grid grid-cols-3 gap-8">
                  {currentTab.categories.map((category) => (
                    <div key={category.title}>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        {category.title}
                      </div>
                      <div className="space-y-1">
                        {category.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={onClose}
                              className="flex items-center gap-2.5 py-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors group"
                            >
                              {Icon && (
                                <Icon className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition-colors" />
                              )}
                              {item.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Simple Dropdown component for other nav items
function NavDropdown({
  item,
  isOpen,
  onToggle,
  onClose,
}: {
  item: NavigationItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300"
      >
        {item.name}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && item.dropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
          >
            <div className="py-2">
              {item.dropdown.map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  onClick={onClose}
                  className="block px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="text-sm font-medium text-slate-900">{subItem.name}</div>
                  {subItem.description && (
                    <div className="text-xs text-slate-500 mt-0.5">{subItem.description}</div>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [activeProductTab, setActiveProductTab] = useState('Product');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileLanguageMenuOpen, setIsMobileLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);
  }, []);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage && LANGUAGE_OPTIONS.some((lang) => lang.code === storedLanguage)) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    if (!isLanguageMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedMobileItem(null);
  };

  const currentLanguage =
    LANGUAGE_OPTIONS.find((language) => language.code === selectedLanguage) || LANGUAGE_OPTIONS[0];

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', code);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', code);
      window.history.replaceState(null, '', url.toString());
    }
    setIsLanguageMenuOpen(false);
    setIsMobileLanguageMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'h-14 bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/80'
            : 'h-16 bg-white/80 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo with icon and language selector */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center" aria-label="Adapty home">
              <Image
                src="/images/adapty-logo.svg"
                alt="Adapty"
                width={120}
                height={32}
                className="h-7 w-auto"
                priority
              />
            </Link>

            {/* Language selector */}
            <div className="relative" ref={languageMenuRef}>
              <button
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
                onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isLanguageMenuOpen}
              >
                <Globe className="w-3 h-3" />
                <span className="text-sm">{currentLanguage.flag}</span>
                {currentLanguage.code.toUpperCase()}
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden z-50"
                  >
                    <div className="py-2">
                      {LANGUAGE_OPTIONS.map((lang) => (
                        <button
                          key={lang.code}
                          className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors ${
                            lang.code === selectedLanguage
                              ? 'bg-violet-50 text-violet-600'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                          onClick={() => handleLanguageSelect(lang.code)}
                        >
                          <span className="text-lg leading-none">{lang.flag}</span>
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 lg:flex">
            {navigation.map((item) =>
              item.productTabs ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.name ? null : item.name)
                    }
                    className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300"
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <ProductMegaMenu
                    isOpen={openDropdown === item.name}
                    onClose={() => setOpenDropdown(null)}
                    activeTab={activeProductTab}
                    setActiveTab={setActiveProductTab}
                  />
                </div>
              ) : item.dropdown ? (
                <NavDropdown
                  key={item.name}
                  item={item}
                  isOpen={openDropdown === item.name}
                  onToggle={() =>
                    setOpenDropdown(openDropdown === item.name ? null : item.name)
                  }
                  onClose={() => setOpenDropdown(null)}
                />
              ) : (
                <motion.div key={item.name} whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-all duration-300 ${
                      item.highlight && item.highlightColor === 'orange'
                        ? 'text-orange-500 hover:text-orange-600'
                        : item.highlight
                          ? 'text-emerald-600 hover:text-emerald-700'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            )}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="https://app.adapty.io/login"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300"
              >
                Log in
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="https://app.adapty.io/signup"
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
              >
                Sign up
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="https://adapty.io/contact-sales/"
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold bg-[#6720FF] text-white hover:bg-[#5B1FD9] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Contact sales
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center lg:hidden"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-900" />
              ) : (
                <Menu className="h-6 w-6 text-slate-900" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
            />

            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-[#0F172A] border-l border-slate-800 shadow-2xl lg:hidden overflow-y-auto"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 250,
                opacity: { duration: 0.3 },
              }}
            >
              <div className="flex h-16 items-center justify-between px-4">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={closeMobileMenu}
                >
                  <Image
                    src="/images/adapty-logo.svg"
                    alt="Adapty"
                    width={100}
                    height={26}
                    className="h-6 w-auto brightness-0 invert"
                  />
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="px-4 pt-4">
                <button
                  onClick={() => setIsMobileLanguageMenuOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-lg bg-slate-800/50 px-4 py-3 text-sm font-medium text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {currentLanguage.flag} {currentLanguage.label}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMobileLanguageMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isMobileLanguageMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 rounded-lg border border-slate-700 bg-slate-900/60"
                    >
                      {LANGUAGE_OPTIONS.map((lang) => (
                        <button
                          key={lang.code}
                          className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                            lang.code === selectedLanguage
                              ? 'text-white bg-slate-800'
                              : 'text-slate-300 hover:bg-slate-800/60'
                          }`}
                          onClick={() => handleLanguageSelect(lang.code)}
                        >
                          <span className="text-lg leading-none">{lang.flag}</span>
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <nav className="flex flex-col gap-1 px-4 py-6">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    {item.dropdown || item.productTabs ? (
                      <div>
                        <button
                          onClick={() =>
                            setExpandedMobileItem(
                              expandedMobileItem === item.name ? null : item.name
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white rounded-lg transition-colors"
                        >
                          {item.name}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              expandedMobileItem === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedMobileItem === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-1">
                                {item.dropdown
                                  ? item.dropdown.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        onClick={closeMobileMenu}
                                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))
                                  : item.productTabs?.map((tab) => (
                                      <div key={tab.name} className="mb-3">
                                        <div className="px-4 py-1 text-xs font-semibold text-slate-500 uppercase">
                                          {tab.name}
                                        </div>
                                        {tab.categories?.map((cat) =>
                                          cat.items.map((catItem) => (
                                            <Link
                                              key={catItem.name}
                                              href={catItem.href}
                                              onClick={closeMobileMenu}
                                              className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                                            >
                                              {catItem.name}
                                            </Link>
                                          ))
                                        )}
                                      </div>
                                    ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                          item.highlight && item.highlightColor === 'orange'
                            ? 'text-orange-400 hover:bg-slate-800/70 hover:text-orange-300'
                            : item.highlight
                              ? 'text-emerald-400 hover:bg-slate-800/70 hover:text-emerald-300'
                              : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="flex flex-col gap-3 px-4 mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Link
                    href="https://app.adapty.io/login"
                    className="block rounded-lg border border-slate-700 px-4 py-3 text-center text-base font-medium text-slate-300 transition-all duration-300 hover:bg-slate-800 hover:border-slate-600"
                    onClick={closeMobileMenu}
                  >
                    Log in
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <Link
                    href="https://app.adapty.io/signup"
                    className="block rounded-lg bg-white px-4 py-3 text-center text-base font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-100"
                    onClick={closeMobileMenu}
                  >
                    Sign up
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Link
                    href="https://adapty.io/contact-sales/"
                    className="block rounded-lg bg-[#6720FF] px-4 py-3 text-center text-base font-semibold text-white transition-all duration-300 hover:bg-[#5B1FD9]"
                    onClick={closeMobileMenu}
                  >
                    Contact sales
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
