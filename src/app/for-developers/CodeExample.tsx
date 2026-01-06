'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Github } from 'lucide-react';
import Link from 'next/link';

const platforms = [
  { id: 'swift', name: 'iOS (Swift)', icon: '' },
  { id: 'kotlin', name: 'Android (Kotlin)', icon: '' },
  { id: 'react-native', name: 'React Native', icon: '' },
];

const codeExamples: Record<string, string> = {
  swift: `// iOS - Just 3 steps
import Adapty

// 1. Configure
Adapty.activate("YOUR_API_KEY")

// 2. Identify user (optional)
Adapty.identify("user_123")

// 3. Get paywall and purchase
let paywall = try await Adapty.getPaywall("main")
let result = try await Adapty.makePurchase(product)`,
  kotlin: `// Android - Just 3 steps
import com.adapty.Adapty

// 1. Configure
Adapty.activate(applicationContext, "YOUR_API_KEY")

// 2. Identify user (optional)
Adapty.identify("user_123")

// 3. Get paywall and purchase
Adapty.getPaywall("main") { paywall ->
    Adapty.makePurchase(activity, product) { result ->
        // Handle result
    }
}`,
  'react-native': `// React Native - Just 3 steps
import { adapty } from 'react-native-adapty';

// 1. Configure
await adapty.activate('YOUR_API_KEY');

// 2. Identify user (optional)
await adapty.identify('user_123');

// 3. Get paywall and purchase
const paywall = await adapty.getPaywall('main');
const result = await adapty.makePurchase(product);`,
};

export default function CodeExample() {
  const [activeTab, setActiveTab] = useState('swift');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAFAFA]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Simple SDK, powerful features
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Just 3 methods: configure, identify, purchase. We handle the complexity.
          </p>
        </motion.div>

        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
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
                <code className="block whitespace-pre-wrap break-words sm:whitespace-pre">
                  {codeExamples[activeTab]}
                </code>
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
    </section>
  );
}
