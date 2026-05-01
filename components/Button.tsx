"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-luxury-black text-luxury-white hover:bg-luxury-gold transition-colors duration-500",
    secondary: "bg-luxury-gold text-luxury-white hover:bg-luxury-black transition-colors duration-500",
    outline: "border border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-luxury-white transition-all duration-500",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "px-8 py-3 font-sans text-sm tracking-widest uppercase font-medium focus:outline-none cursor-pointer",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
