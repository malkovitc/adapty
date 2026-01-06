'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

type Language = 'swift' | 'kotlin' | 'reactnative' | 'flutter' | 'unity';

// Syntax highlighting helper function
function highlightCode(code: string, language: Language): ReactNode {
  const lines = code.split('\n');

  const swiftKeywords = ['let', 'var', 'func', 'await', 'try', 'if', 'for', 'in', 'import', 'return', 'true', 'false'];
  const kotlinKeywords = ['val', 'var', 'fun', 'when', 'is', 'if', 'for', 'in', 'import', 'return', 'true', 'false'];
  const jsKeywords = ['const', 'let', 'var', 'await', 'async', 'if', 'for', 'of', 'in', 'import', 'from', 'return', 'true', 'false', 'function'];
  const dartKeywords = ['final', 'var', 'await', 'async', 'if', 'for', 'in', 'import', 'return', 'true', 'false'];
  const csharpKeywords = ['var', 'await', 'async', 'if', 'for', 'foreach', 'in', 'using', 'return', 'true', 'false', 'public', 'private', 'static'];

  const swiftTypes = ['Adapty', 'AdaptyResult', 'AdaptyPaywall', 'AdaptyProfile', 'String', 'Int', 'Bool'];
  const kotlinTypes = ['Adapty', 'AdaptyResult', 'AdaptyPaywall', 'AdaptyProfile', 'String', 'Int', 'Boolean', 'Success', 'Error'];
  const jsTypes = ['Adapty', 'Promise', 'Array', 'Object', 'String', 'Number', 'Boolean'];
  const dartTypes = ['Adapty', 'AdaptyPaywall', 'AdaptyProfile', 'String', 'int', 'bool', 'Future'];
  const csharpTypes = ['Adapty', 'AdaptyProfile', 'AdaptyPaywall', 'Debug', 'String', 'int', 'bool'];

  const keywordMap: Record<Language, string[]> = {
    swift: swiftKeywords,
    kotlin: kotlinKeywords,
    reactnative: jsKeywords,
    flutter: dartKeywords,
    unity: csharpKeywords,
  };

  const typeMap: Record<Language, string[]> = {
    swift: swiftTypes,
    kotlin: kotlinTypes,
    reactnative: jsTypes,
    flutter: dartTypes,
    unity: csharpTypes,
  };

  const keywords = keywordMap[language];
  const types = typeMap[language];

  const tokenizeLine = (line: string): ReactNode[] => {
    const tokens: ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < line.length) {
      // Check for comments
      if (line.slice(i, i + 2) === '//') {
        tokens.push(
          <span key={key++} className="text-slate-500">{line.slice(i)}</span>
        );
        break;
      }

      // Check for strings (double quotes)
      if (line[i] === '"') {
        let end = i + 1;
        while (end < line.length && line[end] !== '"') {
          if (line[end] === '\\') end++; // Skip escaped chars
          end++;
        }
        end++; // Include closing quote
        tokens.push(
          <span key={key++} className="text-green-400">{line.slice(i, end)}</span>
        );
        i = end;
        continue;
      }

      // Check for string interpolation in Kotlin ${...}
      if (language === 'kotlin' && line.slice(i, i + 2) === '${') {
        let end = i + 2;
        let depth = 1;
        while (end < line.length && depth > 0) {
          if (line[end] === '{') depth++;
          if (line[end] === '}') depth--;
          end++;
        }
        tokens.push(
          <span key={key++} className="text-orange-400">{line.slice(i, end)}</span>
        );
        i = end;
        continue;
      }

      // Check for string interpolation in Swift \(...)
      if (language === 'swift' && line.slice(i, i + 2) === '\\(') {
        let end = i + 2;
        let depth = 1;
        while (end < line.length && depth > 0) {
          if (line[end] === '(') depth++;
          if (line[end] === ')') depth--;
          end++;
        }
        tokens.push(
          <span key={key++} className="text-orange-400">{line.slice(i, end)}</span>
        );
        i = end;
        continue;
      }

      // Check for numbers
      if (/\d/.test(line[i])) {
        let end = i;
        while (end < line.length && /[\d.]/.test(line[end])) end++;
        tokens.push(
          <span key={key++} className="text-orange-400">{line.slice(i, end)}</span>
        );
        i = end;
        continue;
      }

      // Check for identifiers (keywords, types, methods)
      if (/[a-zA-Z_]/.test(line[i])) {
        let end = i;
        while (end < line.length && /[a-zA-Z0-9_]/.test(line[end])) end++;
        const word = line.slice(i, end);

        // Check if it's followed by ( making it a method call
        const isMethodCall = line[end] === '(';
        // Check if preceded by . making it a method
        const isPrecededByDot = i > 0 && line[i - 1] === '.';

        if (keywords.includes(word)) {
          tokens.push(
            <span key={key++} className="text-purple-400">{word}</span>
          );
        } else if (types.includes(word)) {
          tokens.push(
            <span key={key++} className="text-cyan-400">{word}</span>
          );
        } else if (isMethodCall || isPrecededByDot) {
          tokens.push(
            <span key={key++} className="text-blue-400">{word}</span>
          );
        } else {
          tokens.push(
            <span key={key++} className="text-slate-300">{word}</span>
          );
        }
        i = end;
        continue;
      }

      // Default: add character as-is
      tokens.push(<span key={key++} className="text-slate-300">{line[i]}</span>);
      i++;
    }

    return tokens;
  };

  return lines.map((line, lineIndex) => (
    <span key={lineIndex}>
      {tokenizeLine(line)}
      {lineIndex < lines.length - 1 && '\n'}
    </span>
  ));
}

const sdkMethods = [
  { id: 'activate', name: '.activate()', description: 'Initialize the SDK' },
  { id: 'getPaywall', name: '.getPaywall()', description: 'Fetch paywalls' },
  { id: 'makePurchase', name: '.makePurchase()', description: 'Process purchases' },
  { id: 'getProfile', name: '.getProfile()', description: 'Get subscription status' },
  { id: 'restorePurchases', name: '.restorePurchases()', description: 'Restore user purchases' },
];

const codeExamples: Record<string, Record<Language, string>> = {
  activate: {
    swift: `// Initialize Adapty SDK
import Adapty

// Call on app launch
try await Adapty.activate("PUBLIC_SDK_KEY")`,
    kotlin: `// Initialize Adapty SDK
import com.adapty.Adapty

// Call on app launch
Adapty.activate(applicationContext, "PUBLIC_SDK_KEY")`,
    reactnative: `// Initialize Adapty SDK
import { Adapty } from 'react-native-adapty';

// Call on app launch
await Adapty.activate('PUBLIC_SDK_KEY');`,
    flutter: `// Initialize Adapty SDK
import 'package:adapty_flutter/adapty_flutter.dart';

// Call on app launch
await Adapty().activate('PUBLIC_SDK_KEY');`,
    unity: `// Initialize Adapty SDK
using AdaptySDK;

// Call on app launch
Adapty.Activate("PUBLIC_SDK_KEY");`,
  },
  getPaywall: {
    swift: `// Fetch paywall configuration
let paywall = try await Adapty.getPaywall(placementId: "main")

// Get products for the paywall
let products = try await Adapty.getPaywallProducts(paywall: paywall)

// Display to user
for product in products {
    print("\\(product.localizedTitle): \\(product.localizedPrice)")
}`,
    kotlin: `// Fetch paywall configuration
Adapty.getPaywall("main") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywall = result.value
            // Get products for the paywall
            Adapty.getPaywallProducts(paywall) { productsResult ->
                // Display to user
            }
        }
        is AdaptyResult.Error -> { /* handle error */ }
    }
}`,
    reactnative: `// Fetch paywall configuration
const paywall = await Adapty.getPaywall('YOUR_PAYWALL_ID');

// Get products for the paywall
const products = await Adapty.getPaywallProducts(paywall);

// Display to user
products.forEach(product => {
    console.log(\`\${product.localizedTitle}: \${product.localizedPrice}\`);
});`,
    flutter: `// Fetch paywall configuration
final paywall = await Adapty().getPaywall('YOUR_PAYWALL_ID');

// Get products for the paywall
final products = await Adapty().getPaywallProducts(paywall: paywall);

// Display to user
for (final product in products) {
    print('\${product.localizedTitle}: \${product.localizedPrice}');
}`,
    unity: `// Fetch paywall configuration
var paywall = await Adapty.GetPaywall("YOUR_PAYWALL_ID");

// Get products for the paywall
var products = await Adapty.GetPaywallProducts(paywall);

// Display to user
foreach (var product in products) {
    Debug.Log($"{product.LocalizedTitle}: {product.LocalizedPrice}");
}`,
  },
  makePurchase: {
    swift: `// Make a purchase
let purchaseResult = try await Adapty.makePurchase(product: product)

// Check subscription status
if purchaseResult.profile.accessLevels["premium"]?.isActive == true {
    // Grant access to premium features
}`,
    kotlin: `// Make a purchase
Adapty.makePurchase(activity, product) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            if (profile.accessLevels["premium"]?.isActive == true) {
                // Grant access to premium features
            }
        }
        is AdaptyResult.Error -> { /* handle error */ }
    }
}`,
    reactnative: `// Make a purchase
const profile = await Adapty.makePurchase(product);

// Check subscription status
if (profile.accessLevels?.premium?.isActive) {
    // Grant access to premium features
}`,
    flutter: `// Make a purchase
final profile = await Adapty().makePurchase(product: product);

// Check subscription status
if (profile.accessLevels['premium']?.isActive == true) {
    // Grant access to premium features
}`,
    unity: `// Make a purchase
var profile = await Adapty.MakePurchase(product);

// Check subscription status
if (profile.AccessLevels["premium"]?.IsActive == true) {
    // Grant access to premium features
}`,
  },
  getProfile: {
    swift: `// Get current subscription status
let profile = try await Adapty.getProfile()

// Check access level
if let premium = profile.accessLevels["premium"], premium.isActive {
    print("Subscription active until: \\(premium.expiresAt)")
    print("Will renew: \\(premium.willRenew)")
}`,
    kotlin: `// Get current subscription status
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            val premium = profile.accessLevels["premium"]
            if (premium?.isActive == true) {
                println("Subscription active until: \${premium.expiresAt}")
            }
        }
        is AdaptyResult.Error -> { /* handle error */ }
    }
}`,
    reactnative: `// Get current subscription status
const profile = await Adapty.getProfile();

// Check access level
const premium = profile.accessLevels?.premium;
if (premium?.isActive) {
    console.log(\`Subscription active until: \${premium.expiresAt}\`);
    console.log(\`Will renew: \${premium.willRenew}\`);
}`,
    flutter: `// Get current subscription status
final profile = await Adapty().getProfile();

// Check access level
final premium = profile.accessLevels['premium'];
if (premium?.isActive == true) {
    print('Subscription active until: \${premium.expiresAt}');
    print('Will renew: \${premium.willRenew}');
}`,
    unity: `// Get current subscription status
var profile = await Adapty.GetProfile();

// Check access level
var premium = profile.AccessLevels["premium"];
if (premium?.IsActive == true) {
    Debug.Log($"Subscription active until: {premium.ExpiresAt}");
    Debug.Log($"Will renew: {premium.WillRenew}");
}`,
  },
  restorePurchases: {
    swift: `// Restore purchases for returning users
let profile = try await Adapty.restorePurchases()

// Check restored access
if profile.accessLevels["premium"]?.isActive == true {
    // Re-grant access to premium features
    print("Purchases restored successfully!")
}`,
    kotlin: `// Restore purchases for returning users
Adapty.restorePurchases { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            if (profile.accessLevels["premium"]?.isActive == true) {
                // Re-grant access to premium features
            }
        }
        is AdaptyResult.Error -> { /* handle error */ }
    }
}`,
    reactnative: `// Restore purchases for returning users
const profile = await Adapty.restorePurchases();

// Check restored access
if (profile.accessLevels?.premium?.isActive) {
    // Re-grant access to premium features
    console.log('Purchases restored successfully!');
}`,
    flutter: `// Restore purchases for returning users
final profile = await Adapty().restorePurchases();

// Check restored access
if (profile.accessLevels['premium']?.isActive == true) {
    // Re-grant access to premium features
    print('Purchases restored successfully!');
}`,
    unity: `// Restore purchases for returning users
var profile = await Adapty.RestorePurchases();

// Check restored access
if (profile.AccessLevels["premium"]?.IsActive == true) {
    // Re-grant access to premium features
    Debug.Log("Purchases restored successfully!");
}`,
  },
};

const languageTabs: { id: Language; label: string }[] = [
  { id: 'swift', label: 'Swift' },
  { id: 'kotlin', label: 'Kotlin' },
  { id: 'reactnative', label: 'React Native' },
  { id: 'flutter', label: 'Flutter' },
  { id: 'unity', label: 'Unity' },
];

export default function SDKMethods() {
  const [activeMethod, setActiveMethod] = useState('activate');
  const [activeLanguage, setActiveLanguage] = useState<Language>('swift');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeMethod][activeLanguage]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section size="lg" background="white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Just 5 SDK methods to integrate monetization
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            Fetch Paywalls, make purchases, and check the subscription status - that&apos;s all you need to get started quickly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Testimonial and Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Method Selector */}
            <div className="flex flex-wrap gap-2">
              {sdkMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setActiveMethod(method.id)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                    activeMethod === method.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {method.name}
                </button>
              ))}
            </div>

            {/* Testimonial Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center overflow-hidden">
                  <Image
                    src={getAssetPath('/images/testimonials/magnus-olafsson.webp')}
                    alt="Magnus Olafsson"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-bold text-lg">MO</span>';
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={getAssetPath('/images/testimonials/logo-smitten.webp')}
                    alt="Smitten"
                    width={80}
                    height={24}
                    className="h-6 w-auto object-contain"
                    unoptimized
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <blockquote className="text-slate-700 italic mb-4 leading-relaxed">
                &ldquo;Adapty SDK made integrating in-app purchases a walk in the park. With just a few lines of code, I was able to implement subscriptions seamlessly for both iOS and Android.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium text-slate-900">Magnus Olafsson</p>
                  <p className="text-sm text-slate-500">CTO at Smitten</p>
                </div>
              </div>
            </div>

            {/* GitHub Link */}
            <Link
              href="https://github.com/adaptyteam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors group"
            >
              <Github className="w-6 h-6" />
              <span className="font-medium">100% Open Source</span>
              <span className="text-violet-600 group-hover:underline">View on GitHub</span>
            </Link>
          </motion.div>

          {/* Right Side - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#1E293B] rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
              {/* Language Tabs */}
              <div className="flex flex-wrap border-b border-slate-700">
                {languageTabs.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveLanguage(lang.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeLanguage === lang.id
                        ? 'text-white bg-slate-700/50 border-b-2 border-violet-500'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Code Block */}
              <div className="relative">
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
                <pre className="p-6 text-sm text-slate-300 overflow-x-auto min-h-[280px]">
                  <code className="block whitespace-pre">{highlightCode(codeExamples[activeMethod][activeLanguage], activeLanguage)}</code>
                </pre>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700">
                <p className="text-sm text-slate-400">
                  <span className="text-emerald-400">{sdkMethods.find(m => m.id === activeMethod)?.name}</span>
                  {' '}- {sdkMethods.find(m => m.id === activeMethod)?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
