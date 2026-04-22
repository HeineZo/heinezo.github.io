import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  index?: number;
  className?: React.ComponentProps<'div'>['className'];
  disabled?: boolean;
}

/**
 * Révèle un élément lorsqu'il est visible à l'écran
 * @param children - Element à afficher
 * @param index - Index de l'élément dans la liste
 * @param className - Style à ajouter à l'élément
 * @param disabled - Désactive l'animation
 */
export default function Reveal({ children, index, className, disabled }: RevealProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: () => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: index && index * 0.2,
      },
    }),
  };
  return (
    <motion.div
      className={cn('w-fit', className)}
      initial={disabled ? 'visible' : 'hidden'}
      variants={fadeIn}
      viewport={{ once: true }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}