'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui';
import type { ReactNode, MouseEventHandler } from 'react';

export interface VideoPreviewProps {
  title?: string;
  description?: string;
  caption?: string;
  background?: 'white' | 'gray';
  buttonLabel?: string;
  onPlay?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export default function VideoPreview({
  title = 'Watch the demo',
  description,
  caption,
  background = 'white',
  buttonLabel = 'Play video',
  onPlay,
  children,
}: VideoPreviewProps) {
  return (
    <Section size="lg" background={background}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          {description && <p className="text-lg text-slate-500 max-w-2xl mx-auto">{description}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-2xl"
        >
          {children ?? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900 to-slate-900">
              <Button
                variant="ghost"
                className="group flex items-center justify-center w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110 px-0"
                onClick={onPlay}
                aria-label={buttonLabel}
              >
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </Button>
            </div>
          )}
          {caption && (
            <div className="absolute bottom-4 left-4 text-white/70 text-sm">
              {caption}
            </div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
