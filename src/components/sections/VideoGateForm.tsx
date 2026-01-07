'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { Button, Input } from '@/components/ui';

export interface VideoGateFormProps {
  id?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  placeholder?: string;
  successMessage?: string;
  background?: 'white' | 'gray';
  onSubmit?: (email: string) => Promise<void> | void;
}

export default function VideoGateForm({
  id = 'demo',
  title = 'Watch what you can build in two minutes',
  subtitle = '(or less)',
  ctaLabel = 'Watch the demo',
  placeholder = 'Enter your email',
  successMessage,
  background = 'white',
  onSubmit,
}: VideoGateFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id={id} size="lg" background={background}>
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {title} {subtitle && <span className="text-slate-400">{subtitle}</span>}
          </h2>

          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                size="lg"
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                icon={<Play className="w-4 h-4" fill="currentColor" />}
                iconPosition="left"
              >
                {ctaLabel}
              </Button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
              <div className="aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-900 to-slate-900">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110 text-white hover:text-white"
                    aria-label="Play demo video"
                  >
                    <Play className="!w-8 !h-8 ml-1" fill="white" />
                  </Button>
                </div>
              </div>
              {successMessage && (
                <p className="text-sm text-slate-500 mt-4" role="status">
                  {successMessage}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
