"use client";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";

// Force client-side only to fix hydration lock
const LiquidBackground = dynamic(
  () => import("@/components/LiquidBackground").then((mod) => mod.LiquidBackground),
  { ssr: false }
);

export const Hero = () => {
  return (
    <Section className="min-h-screen flex items-center justify-center pt-32 relative overflow-hidden">
      {/* REAL WebGL Liquid Background Layer - Fixed Stacking */}
      <LiquidBackground />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-medium mb-6"
          >
            Senior Full-Stack Engineer
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-8 max-w-4xl relative group"
          >
            {/* Liquid Text Shine Effect */}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-black via-[#666] to-black bg-[length:200%_auto] bg-clip-text text-transparent animate-text-shine">
                Crafting Digital
              </span>
            </span>
            <br /> 
            <span className="italic relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-luxury-gold via-[#D4AF37] to-luxury-gold bg-[length:200%_auto] bg-clip-text text-transparent animate-text-shine-delayed">
                Excellence
              </span>
              {/* Subtle Glow behind the italic word */}
              <motion.span 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 blur-2xl bg-luxury-gold/20 -z-10"
              />
            </span>
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-black via-[#444] to-black bg-[length:200%_auto] bg-clip-text text-transparent animate-text-shine">
                through Precise Code.
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-luxury-gray text-lg md:text-xl font-sans font-light max-w-xl mb-12 leading-relaxed"
          >
            Focused on building high-performance, aesthetically pleasing, and 
            user-centric web applications with modern technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Button variant="primary">View My Work</Button>
            <Button variant="outline">Let's Talk</Button>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
