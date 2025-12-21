import dynamic from 'next/dynamic';
import { Header, Footer } from '@/components/layout';
import { BackToTop } from '@/components/ui';

const Hero = dynamic(() => import('@/components/sections/Hero'), {
  loading: () => (
    <div className="min-h-screen bg-[#0F172A] animate-pulse" />
  ),
});

const LogosMarquee = dynamic(() => import('@/components/sections/LogosMarquee'), {
  loading: () => (
    <div className="h-64 bg-[#F5F5F7] animate-pulse" />
  ),
});

const Integrations = dynamic(() => import('@/components/sections/Integrations'), {
  loading: () => (
    <div className="h-64 bg-[#F5F5F7] animate-pulse" />
  ),
});

const Features = dynamic(() => import('@/components/sections/Features'), {
  loading: () => (
    <div className="h-96 bg-white animate-pulse" />
  ),
});

const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => (
    <div className="h-96 bg-[#0F172A] animate-pulse" />
  ),
});

const HowItWorks = dynamic(() => import('@/components/sections/HowItWorks'), {
  loading: () => (
    <div className="h-96 bg-white animate-pulse" />
  ),
});

const Pricing = dynamic(() => import('@/components/sections/Pricing'), {
  loading: () => (
    <div className="h-96 bg-[#F5F5F7] animate-pulse" />
  ),
});

const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => (
    <div className="h-96 bg-white animate-pulse" />
  ),
});

const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => (
    <div className="h-64 bg-[#F5F5F7] animate-pulse" />
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Header />
      <main>
        <Hero />
        <LogosMarquee />
        <Features />
        <Integrations />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
