"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  href?: string;
  hidden?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
};

export default function Button(props: Props) {
  const {
    type = "button",
    href,
    hidden = false,
    onClick,
    disabled,
    children,
    className,
  } = props;

  if (hidden) return null;

  const noLink = !href || disabled || onClick;
  const disabledClass = disabled && "disabled";

  const animateHandlers = disabled
    ? {}
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };

  const buttonClassName = `btn ${disabledClass || ""} ${className || ""}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={noLink ? buttonClassName : ""}
      {...animateHandlers}
    >
      {noLink ? (
        children
      ) : (
        <Link href={href} className={buttonClassName}>
          {children}
        </Link>
      )}
    </motion.button>
  );
}
