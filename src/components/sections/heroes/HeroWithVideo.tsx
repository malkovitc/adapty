'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { getAssetPath } from '@/lib/utils';
import { Button, Input, EmailIcon } from '@/components/ui';
import Container from '@/components/ui/Container';

export interface HeroWithVideoProps {
  /** Main title text */
  title: string;
  /** Part of title to highlight with gradient (must be substring of title) */
  titleHighlight?: string;
  /** Subtitle/description text */
  subtitle: string;
  /** Video thumbnail image path */
  videoThumbnail: string;
  /** Optional video URL - if provided, shows play button */
  videoUrl?: string;
  /** Whether video requires email to unlock */
  emailGated?: boolean;
  /** Primary call-to-action button */
  primaryCTA: { text: string; href: string };
  /** Callback when email is submitted (for gated content) */
  onEmailSubmit?: (email: string) => void;
}

/**
 * Hero with Video - For Onboarding Builder page
 *
 * Features:
 * - Large video thumbnail with play button overlay
 * - Optional email gate for video access
 * - Title with gradient highlight option
 * - Primary CTA button
 *
 * @example
 * // Without email gate
 * <HeroWithVideo
 *   title="Personalized onboarding experiences"
 *   titleHighlight="onboarding"
 *   subtitle="Build custom onboarding flows..."
 *   videoThumbnail="/images/onboarding-preview.webp"
 *   videoUrl="https://youtube.com/..."
 *   primaryCTA={{ text: "Try for free", href: "/signup" }}
 * />
 *
 * @example
 * // With email gate
 * <HeroWithVideo
 *   title="Personalized onboarding experiences"
 *   subtitle="Build custom onboarding flows..."
 *   videoThumbnail="/images/onboarding-preview.webp"
 *   emailGated={true}
 *   primaryCTA={{ text: "Try for free", href: "/signup" }}
 *   onEmailSubmit={(email) => console.log(email)}
 * />
 */
export default function HeroWithVideo({
  title,
  titleHighlight,
  subtitle,
  videoThumbnail,
  videoUrl,
  emailGated = false,
  primaryCTA,
  onEmailSubmit,
}: HeroWithVideoProps) {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailSubmitted(true);
    onEmailSubmit?.(email);
    if (videoUrl) {
      setIsVideoPlaying(true);
    }
  };

  const handlePlayClick = () => {
    if (emailGated && !emailSubmitted) {
      // Show email form instead of playing
      return;
    }
    if (videoUrl) {
      setIsVideoPlaying(true);
    }
  };

  // Split title around the highlight text
  const renderTitle = () => {
    if (!titleHighlight) {
      return <span className="text-[var(--text-primary)]">{title}</span>;
    }

    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0] && <span className="text-[var(--text-primary)]">{parts[0]}</span>}
        <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          {titleHighlight}
        </span>
        {parts[1] && <span className="text-[var(--text-primary)]">{parts[1]}</span>}
      </>
    );
  };

  // Extract YouTube video ID if it's a YouTube URL
  const getYouTubeId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = videoUrl ? getYouTubeId(videoUrl) : null;

  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--bg-subtle)]"
      aria-label="Hero section with video"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/60 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <Container className="relative z-20 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-bold)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-center mb-[var(--spacing-lg)]"
          >
            {renderTitle()}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[var(--text-secondary)] text-center leading-[var(--leading-relaxed)] mb-[var(--spacing-xl)] max-w-[42rem]"
          >
            {subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="mb-[var(--spacing-2xl)]"
          >
            <Button
              variant="primary"
              size="lg"
              href={primaryCTA.href}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {primaryCTA.text}
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 pb-[var(--spacing-2xl)]"
      >
        <Container size="full">
          <div className="relative rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-2xl)] border border-[var(--border-default)] aspect-video">
            {isVideoPlaying && youtubeId ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isVideoPlaying && videoUrl && !youtubeId ? (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={videoUrl}
                autoPlay
                controls
              />
            ) : (
              <>
                <Image
                  src={getAssetPath(videoThumbnail)}
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />

                {/* Play button overlay or email form */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  {emailGated && !emailSubmitted ? (
                    <div className="bg-white rounded-[var(--radius-xl)] p-[var(--spacing-xl)] shadow-[var(--shadow-xl)] max-w-md w-full mx-[var(--spacing-md)]">
                      <h3 className="text-xl font-[var(--font-semibold)] text-[var(--text-primary)] text-center mb-[var(--spacing-sm)]">
                        Watch the demo
                      </h3>
                      <p className="text-[var(--text-secondary)] text-center mb-[var(--spacing-md)]">
                        Enter your email to unlock the video
                      </p>
                      <form onSubmit={handleEmailSubmit} className="space-y-[var(--spacing-md)]">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          icon={<EmailIcon />}
                          error={emailError}
                          fullWidth
                          id="video-email"
                        />
                        <Button
                          type="submit"
                          variant="primary"
                          fullWidth
                          icon={<Play className="w-4 h-4" />}
                        >
                          Watch video
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <Button
                      onClick={handlePlayClick}
                      variant="ghost"
                      className="group w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                      aria-label="Play video"
                    >
                      <Play className="w-8 h-8 text-violet-600 ml-1" />
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
