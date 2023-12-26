"use client";
import { motion } from "framer-motion";

import { transition } from "lib/animation";

type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Props) {
  return (
    <motion.div
      className="w-full"
      transition={transition.spring}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0.5, 1], opacity: [0, 1] }}
    >
      {children}
    </motion.div>
  );
}
