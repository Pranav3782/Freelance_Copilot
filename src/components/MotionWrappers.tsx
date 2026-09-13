import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform, useSpring, useReducedMotion, Variants } from 'framer-motion';

// Easing matches the requested premium fluid feel
export const EASE = [0.22, 1, 0.36, 1] as any;

// -------------------------------------------------------------
// FADE IN
// -------------------------------------------------------------
export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  immediate?: boolean;
}> = ({ children, delay = 0, duration = 0.6, direction = 'up', distance = 20, className = '', immediate = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getInitialPosition() }}
      animate={shouldReduceMotion || immediate || isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={shouldReduceMotion ? { duration: 0 } : { duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// -------------------------------------------------------------
// STAGGER CONTAINER & ITEM
// -------------------------------------------------------------
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
  amount?: number;
}> = ({ children, delayChildren = 0, staggerChildren = 0.08, className = '', amount = 0.15 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  scale?: boolean;
  distance?: number;
  className?: string;
}> = ({ children, direction = 'up', scale = false, distance = 25, className = '' }) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: 0, x: 0 };
    }
  };

  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      ...getInitialPosition(),
      ...(scale && { scale: 0.94 })
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      ...(scale && { scale: 1 }),
      transition: { duration: 0.6, ease: EASE as any } 
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

// -------------------------------------------------------------
// ANIMATED NUMBER
// -------------------------------------------------------------
export const AnimatedNumber: React.FC<{
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
}> = ({ value, duration = 1.5, delay = 0, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        
        setDisplayValue(Math.floor(easeProgress * value));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      const timeout = setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay * 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, duration, delay]);

  const formattedValue = new Intl.NumberFormat('en-US').format(displayValue);

  return (
    <span ref={ref}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

// -------------------------------------------------------------
// HOVER TACTILE CARD
// -------------------------------------------------------------
export const HoverCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  whileHover?: any;
}> = ({ children, className = '', whileHover }) => {
  return (
    <motion.div
      whileHover={whileHover || { y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// -------------------------------------------------------------
// PARALLAX
// -------------------------------------------------------------
export const Parallax: React.FC<{
  children: React.ReactNode;
  offset?: number;
  className?: string;
}> = ({ children, offset = 30, className = '' }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
};
