'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  // For static export, just redirect to CMS (no auth in demo mode)
  useEffect(() => {
    router.replace('/cms');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
    </div>
  );
}
