import dynamic from 'next/dynamic';
import { Header } from '@/components/layout';

const Hero = dynamic(() => import('@/components/sections/Hero'), {
  loading: () => (
    <div className="min-h-screen bg-[#0F172A] animate-pulse" />
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Header />
      <main>
        <Hero />
        <div className="h-[60vh]" />
      </main>
    </div>
  );
}
