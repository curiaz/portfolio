"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type ScatterWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotation?: number;
};

export function ScatterWrapper({ children, className = "", delay = 0, rotation = -2 }: ScatterWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50, scale: 0.9, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
