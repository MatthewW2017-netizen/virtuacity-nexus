import { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function Card({ children, className, animate = true }: CardProps) {
  const content = (
    <div className={cn(
      "glass-card rounded-2xl p-6 transition-all duration-300 hover:border-nexus-indigo/50",
      className
    )}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  );
}
