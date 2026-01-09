'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, Check, GitBranch } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Marquee,
} from '@/components/ui';

const platforms = [
  { id: 'swift', name: 'Swift' },
  { id: 'kotlin', name: 'Kotlin' },
  { id: 'react-native', name: 'React Native' },
  { id: 'flutter', name: 'Flutter' },
  { id: 'unity', name: 'Unity' },
];

// SDK platform links for "Get the SDK for your platform" section - split into two rows
const sdkPlatformsRow1 = [
  { name: 'Swift SDK', href: 'https://adapty.io/sdk/ios/', icon: '/logos/icon-swift-64x64-1.svg' },
  { name: 'Kotlin SDK', href: 'https://adapty.io/sdk/android/', icon: '/logos/icon-kotlin-64x64-1.svg' },
  { name: 'React Native SDK', href: 'https://adapty.io/sdk/react-native/', icon: '/logos/icon-react-native-64x64-1.svg' },
  { name: 'Unity SDK', href: 'https://adapty.io/sdk/unity/', icon: '/logos/icon-unity-64x64-1.svg' },
  { name: 'Flutter SDK', href: 'https://adapty.io/sdk/flutter/', icon: '/logos/icon-flutter-64x64-1.svg' },
];

const sdkPlatformsRow2 = [
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
  const [activeTab, setActiveTab] = useState(platforms[0].id);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const handleCopy = async (tabId: string) => {
    await navigator.clipboard.writeText(codeExamples[tabId]);
    setCopiedTab(tabId);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <>
    <Section size="default" background="white" className="overflow-hidden relative pt-10 sm:pt-12 pb-12 sm:pb-16">
      {/* Animated Grid Pattern Background with radial fade */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className="absolute inset-0 h-full w-full fill-violet-500/20 stroke-violet-500/20 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
      />

      <Container size="full" className="overflow-hidden relative z-10">
        {/* Section Header - Left aligned, premium typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 lg:mb-16"
        >
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.15] tracking-[-0.02em] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-transparent lg:whitespace-nowrap"
          >
            In-app purchases. Finally simple.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Description and Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              Integrate IAPs within a few hours without server coding. Adapty handles the correct subscription state, taking everything under the hood, from free trials to refunds, in a simple, developer-friendly SDK.
            </p>

            {/* Secondary Button CTA - with light fill */}
            <Link
              href="https://adapty.io/sdk/"
              className="inline-flex items-center gap-2 px-6 py-3 text-violet-700 font-semibold bg-violet-50 hover:bg-violet-100 border-2 border-violet-200 hover:border-violet-300 rounded-xl transition-all group"
            >
              Make subscriptions easy
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Testimonial - with left border for structure */}
            <div className="relative mt-6 pl-5 border-l-[3px] border-violet-300">
              {/* Company logo */}
              <div className="mb-3">
                <Image
                  src={getAssetPath('/logos/smitten-logo.webp')}
                  alt="Smitten"
                  width={110}
                  height={32}
                  className="object-contain"
                  unoptimized
                />
              </div>

              <blockquote className="text-gray-600 text-base leading-relaxed mb-4">
                &ldquo;Adapty SDK made integrating in-app purchases a walk in the park. With just a few lines of code, I was able to implement subscriptions seamlessly for both iOS and Android.&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <Image
                  src={getAssetPath('/images/testimonials/magnus-olafsson.webp')}
                  alt="Magnús Ólafsson"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  unoptimized
                />
                <div>
                  <p className="text-gray-900 font-semibold text-sm">Magnús Ólafsson</p>
                  <p className="text-gray-500 text-xs">Chief Technology Officer at Smitten</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Code Editor with Glow */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Glow Effect Behind Terminal - centered, very soft blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-blue-500/15 rounded-full blur-[120px] opacity-60 -z-10" />

            <TabsRoot
              value={activeTab}
              onValueChange={setActiveTab}
              className="bg-[#0f0f1a] rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 backdrop-blur-sm"
            >
              {/* Tab bar with subtle background */}
              <TabsList className="w-full justify-start overflow-x-auto border-b border-white/5 rounded-none bg-white/[0.02] px-1">
                {platforms.map((platform) => (
                  <TabsTrigger
                    key={platform.id}
                    value={platform.id}
                    className="px-5 py-3.5 text-sm font-medium whitespace-nowrap text-gray-500 hover:text-gray-300 rounded-none border-b-2 border-transparent transition-all data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-violet-500"
                  >
                    {platform.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Code area */}
              <div className="bg-[#0a0a14]">
                {platforms.map((platform) => (
                  <TabsContent
                    key={platform.id}
                    value={platform.id}
                    className="relative overflow-hidden focus-visible:outline-none focus-visible:ring-0"
                  >
                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(platform.id)}
                      className="absolute top-4 right-4 p-2.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all z-10"
                      aria-label={copiedTab === platform.id ? 'Copied to clipboard' : 'Copy code'}
                    >
                      {copiedTab === platform.id ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                    <pre className="p-6 text-sm overflow-x-auto max-w-full font-mono min-h-[420px]">
                      <code className="block">
                        {codeExamples[platform.id].split('\n').map((line, i) => {
                          // Simple syntax highlighting
                          const isComment = line.trim().startsWith('//');
                          return (
                            <div key={i} className="flex leading-7">
                              <span className="text-gray-500/70 w-8 flex-shrink-0 select-none text-right pr-4 text-xs">{i + 1}</span>
                              {isComment ? (
                                <span className="text-slate-400">{line}</span>
                              ) : (
                                <span className="text-gray-200">
                                  {line.split(/(".*?")/).map((part, j) =>
                                    part.startsWith('"') ? (
                                      <span key={j} className="text-amber-300">{part}</span>
                                    ) : (
                                      <span key={j}>{
                                        part.split(/\b(import|do|try|await|let|catch|return|when|is|if|val|fun|suspend|async|using|Adapty|AdaptyResult|Success|Error)\b/).map((word, k) =>
                                          ['import', 'do', 'try', 'await', 'let', 'catch', 'return', 'when', 'is', 'if', 'val', 'fun', 'suspend', 'async', 'using'].includes(word) ? (
                                            <span key={k} className="text-fuchsia-400">{word}</span>
                                          ) : ['Adapty', 'AdaptyResult', 'Success', 'Error'].includes(word) ? (
                                            <span key={k} className="text-cyan-300">{word}</span>
                                          ) : word
                                        )
                                      }</span>
                                    )
                                  )}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </code>
                    </pre>
                  </TabsContent>
                ))}

                {/* GitHub footer - integrated */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 text-sm">
                    <GitBranch className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">100% Open Source</span>
                  </div>
                  <Link
                    href="https://github.com/adaptyteam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white font-medium transition-colors border border-white/10 hover:border-white/20 rounded-lg px-4 py-2 hover:bg-white/5"
                  >
                    Go to GitHub
                    <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                  </Link>
                </div>
              </div>
            </TabsRoot>
          </motion.div>
        </div>

      </Container>
    </Section>

    {/* Get the SDK for your platform - light section with two-row Marquee */}
    <Section size="lg" background="gray">
      <Container size="full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Get the SDK for your platform
          </h2>
        </motion.div>

        <div className="relative space-y-4">
          {/* Fade edges - left and right */}
          <div className="pointer-events-none absolute left-0 -top-4 -bottom-4 w-24 sm:w-32 lg:w-48 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 -top-4 -bottom-4 w-24 sm:w-32 lg:w-48 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />

          {/* Row 1 - scrolls left (default) */}
          <Marquee pauseOnHover className="[--duration:25s] [--gap:1rem]">
            {sdkPlatformsRow1.map((sdk) => (
              <Link
                key={sdk.name}
                href={sdk.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-300 min-w-[180px] min-h-[140px]"
              >
                <div className="mb-3 h-12 flex items-center justify-center">
                  <Image
                    src={getAssetPath(sdk.icon)}
                    alt={sdk.name}
                    width={58}
                    height={58}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors text-center">
                  {sdk.name}
                </h3>
              </Link>
            ))}
          </Marquee>

          {/* Row 2 - scrolls right (reverse) */}
          <Marquee pauseOnHover reverse className="[--duration:25s] [--gap:1rem]">
            {sdkPlatformsRow2.map((sdk) => (
              <Link
                key={sdk.name}
                href={sdk.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-300 min-w-[180px] min-h-[140px]"
              >
                <div className="mb-3 h-12 flex items-center justify-center">
                  <Image
                    src={getAssetPath(sdk.icon)}
                    alt={sdk.name}
                    width={58}
                    height={58}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors text-center">
                  {sdk.name}
                </h3>
              </Link>
            ))}
          </Marquee>
        </div>
      </Container>
    </Section>
    </>
  );
}
