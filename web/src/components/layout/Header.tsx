"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { PAGES } from "config";

import logoSrc from "public/logo.svg";

export default function Header() {
  return (
    <header>
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1.1, 1],
        }}
      >
        <Link href={PAGES.HOME} className="container-logo">
          <Image src={logoSrc} alt="Fastned-logo" fill priority />
        </Link>
      </motion.div>
    </header>
  );
}
