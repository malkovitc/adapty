'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, Check, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

const platforms = [
  { id: 'swift', name: 'Swift', icon: '🍎' },
  { id: 'kotlin', name: 'Kotlin', icon: '🤖' },
  { id: 'react-native', name: 'React Native', icon: '⚛️' },
  { id: 'flutter', name: 'Flutter', icon: '💙' },
  { id: 'unity', name: 'Unity', icon: '🎮' },
];

// SDK platform links for "Get the SDK for your platform" section
const sdkPlatforms = [
  { name: 'Swift SDK', href: 'https://adapty.io/sdk/ios/', icon: '/logos/icon-swift-64x64-1.svg' },
  { name: 'Kotlin SDK', href: 'https://adapty.io/sdk/android/', icon: '/logos/icon-kotlin-64x64-1.svg' },
  { name: 'React Native SDK', href: 'https://adapty.io/sdk/react-native/', icon: '/logos/icon-react-native-64x64-1.svg' },
  { name: 'Unity SDK', href: 'https://adapty.io/sdk/unity/', icon: '/logos/icon-unity-64x64-1.svg' },
  { name: 'Flutter SDK', href: 'https://adapty.io/sdk/flutter/', icon: '/logos/icon-flutter-64x64-1.svg' },
  { name: 'Capacitor SDK', href: 'https://adapty.io/sdk/capacitor/', icon: '/logos/capacitor-logo.svg' },
  { name: 'Kotlin Multiplatform', href: 'https://adapty.io/sdk/kmp/', icon: '/logos/icon-kotlin-64x64-1.svg' },
  { name: 'FlutterFlow', href: 'https://adapty.io/sdk/flutterflow/', icon: '/logos/icon-flutterflow-64x64-1.svg' },
  { name: 'Web API', href: 'https://adapty.io/sdk/web/', icon: '/logos/icon-web-64x64-1.svg' },
  { name: 'Stripe', href: 'https://adapty.io/integrations/stripe/', icon: '/logos/icon-stripe-64x64-1.svg' },
];

const codeExamples: Record<string, string> = {
  swift: `// Your app's code
import Adapty

do {
    try await Adapty.activate("PUBLIC_SDK_KEY")

    // Make a purchase, Adapty handles the rest
    let purchaseResult = try await Adapty.makePurchase(product)
    // successful purchase
} catch {
    // handle the error
}`,
  kotlin: `// Your app's code
import com.adapty.Adapty

Adapty.activate(applicationContext, "PUBLIC_SDK_KEY")

// Make a purchase, Adapty handles the rest
Adapty.makePurchase(activity, product) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            // successful purchase
        }
        is AdaptyResult.Error -> {
            // handle the error
        }
    }
}`,
  'react-native': `// Your app's code
import { adapty } from 'react-native-adapty';

await adapty.activate('PUBLIC_SDK_KEY');

// Make a purchase, Adapty handles the rest
const result = await adapty.makePurchase(product);
// successful purchase`,
  flutter: `// Your app's code
import 'package:adapty_flutter/adapty_flutter.dart';

await Adapty().activate('PUBLIC_SDK_KEY');

// Make a purchase, Adapty handles the rest
final result = await Adapty().makePurchase(product: product);
// successful purchase`,
  unity: `// Your app's code
using AdaptySDK;

Adapty.Activate("PUBLIC_SDK_KEY");

// Make a purchase, Adapty handles the rest
Adapty.MakePurchase(product, (profile, error) => {
    if (error == null) {
        // successful purchase
    }
});`,
};

export default function SDKSection() {
  const [activeTab, setActiveTab] = useState('swift');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4" style={{ display: 'block', width: '100%' }}>
            Integrate in-app purchases with a few lines of code
          </h2>
          <p className="text-lg text-slate-600" style={{ display: 'block', maxWidth: '48rem', margin: '0 auto', width: '100%' }}>
            Integrate IAPs within a few hours without server coding. Adapty handles the correct subscription state, taking everything under the hood, from free trials to refunds, in a simple, developer-friendly SDK.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Description and Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <Link
              href="https://adapty.io/sdk/"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors group"
            >
              Make subscriptions easy
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Testimonial */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <span className="text-slate-600 text-sm font-medium">Smitten</span>
              </div>
              <blockquote className="text-slate-700 italic mb-4">
                &ldquo;Adapty SDK made integrating in-app purchases a walk in the park. With just a few lines of code, I was able to implement subscriptions seamlessly for both iOS and Android.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                  MO
                </div>
                <div>
                  <p className="text-slate-900 font-medium text-sm">Magnús Ólafsson</p>
                  <p className="text-slate-500 text-xs">Chief Technology Officer at Smitten</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Code Editor (keeping dark for readability) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#1E293B] rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-slate-700">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setActiveTab(platform.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === platform.id
                        ? 'text-white bg-slate-700/50 border-b-2 border-violet-500'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                    }`}
                  >
                    <span>{platform.icon}</span>
                    <span>{platform.name}</span>
                  </button>
                ))}
              </div>

              {/* Code Block */}
              <div className="relative overflow-hidden">
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors z-10"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
                <pre className="p-4 sm:p-6 text-xs sm:text-sm text-slate-300 overflow-x-auto max-w-full">
                  <code className="block whitespace-pre-wrap break-words sm:whitespace-pre">{codeExamples[activeTab]}</code>
                </pre>
              </div>

              {/* GitHub Link */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-900/50 border-t border-slate-700">
                <div className="flex items-center gap-3 text-sm">
                  <Github className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-400">100% Open Source</span>
                </div>
                <Link
                  href="https://github.com/adaptyteam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
                >
                  Go to GitHub
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Get the SDK for your platform */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
            Get the SDK for your platform
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sdkPlatforms.map((sdk, index) => (
              <motion.div
                key={sdk.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={sdk.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center p-6 bg-[#F8F9FA] hover:bg-slate-100 rounded-xl border border-slate-200 hover:border-violet-300 transition-all duration-300 min-h-[140px]"
                >
                  <div className="mb-3 h-12 flex items-center justify-center">
                    <Image
                      src={getAssetPath(sdk.icon)}
                      alt={sdk.name}
                      width={48}
                      height={48}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-sm font-medium text-slate-900 group-hover:text-violet-600 transition-colors text-center">
                    {sdk.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
