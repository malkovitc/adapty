'use client';

import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export const useChartAnimation = (delay = 100) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView && !animated) {
      const timer = setTimeout(() => setAnimated(true), delay);
      return () => clearTimeout(timer);
    }
  }, [inView, animated, delay]);

  return { ref, inView, animated };
};
