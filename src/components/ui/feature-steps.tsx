"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAssetPath } from "@/lib/utils"
import { BadgeShadcn } from "./badge-shadcn"

export interface Feature {
  step: string
  title?: string
  content?: string
  image: string
  badges?: string[]
  href?: string
}

export interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
}

export function FeatureSteps({
  features,
  className,
  title,
  autoPlayInterval = 5000,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  const handleStepClick = (index: number) => {
    setCurrentFeature(index)
    setProgress(0)
  }

  return (
    <div className={cn("p-4 md:p-8", className)}>
      <div className="max-w-6xl mx-auto w-full">
        {title && (
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-8 text-center leading-tight">
            {title}
          </h2>
        )}

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Steps List - Left Side */}
          <div className="order-2 md:order-1 space-y-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "flex items-start gap-4 md:gap-5 cursor-pointer p-4 rounded-xl transition-all duration-300",
                  index === currentFeature
                    ? "bg-gray-50"
                    : "hover:bg-gray-50/50"
                )}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleStepClick(index)}
              >
                {/* Step Circle - B/W Minimalist Style */}
                <div className="flex-shrink-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                      index === currentFeature
                        ? "bg-gray-900 text-white"
                        : index < currentFeature
                        ? "bg-white border border-gray-300 text-gray-400"
                        : "bg-white border border-gray-200 text-gray-400"
                    )}
                  >
                    {index <= currentFeature ? (
                      <Check className="w-5 h-5" strokeWidth={2.5} />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "text-lg md:text-xl font-semibold mb-1 transition-colors",
                    index === currentFeature ? "text-gray-900" : "text-gray-500"
                  )}>
                    {feature.title || feature.step}
                  </h3>

                  {feature.content && (
                    <p className="text-sm text-gray-500 mb-2">
                      {feature.content}
                    </p>
                  )}

                  {/* Badges */}
                  {feature.badges && feature.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {feature.badges.map((badge) => (
                        <BadgeShadcn
                          key={badge}
                          variant="outline"
                          className="px-2.5 py-0.5 text-xs text-gray-600 bg-white border-gray-200 font-normal"
                        >
                          {badge}
                        </BadgeShadcn>
                      ))}
                    </div>
                  )}

                  {/* Learn More - B/W Minimalist */}
                  {feature.href && index === currentFeature && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <Link
                        href={feature.href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image - Right Side */}
          <div className="order-1 md:order-2 relative w-full h-[280px] md:h-[320px] lg:h-[380px]">
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-2xl overflow-hidden bg-gray-100"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <Image
                        src={getAssetPath(feature.image)}
                        alt={feature.title || feature.step}
                        className="w-full h-full object-contain"
                        fill
                        unoptimized
                      />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureSteps
