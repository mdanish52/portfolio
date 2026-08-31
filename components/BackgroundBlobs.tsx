// components/BackgroundBlobs.tsx
"use client";

import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-accent/25 blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-amber-soft/15 blur-[120px]"
      />
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/15 blur-[100px]"
      />
    </div>
  );
}