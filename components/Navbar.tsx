"use client";

import { useState, useEffect } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6",
        scrolled ? "bg-luxury-white/80 backdrop-blur-md py-4 border-b border-luxury-border" : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-serif text-2xl tracking-tighter">
            YA<span className="text-luxury-gold">.</span>
          </span>
          <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-luxury-gray group-hover:text-luxury-gold transition-colors duration-500 mt-1">
            Portfolio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-luxury-black hover:text-luxury-gold transition-colors duration-500"
            >
              {link.name}
            </Link>
          ))}
          <Link href="#contact">
            <button className="border border-luxury-black/10 px-6 py-2 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-luxury-black hover:text-luxury-white transition-all duration-500">
              Hire Me
            </button>
          </Link>
        </nav>

        {/* Mobile menu button could go here */}
      </Container>
    </motion.header>
  );
};
