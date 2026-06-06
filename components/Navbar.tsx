"use client";

import { useState, useEffect } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "AI Solutions", href: "/ai-receptionist" },
  { name: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6",
          scrolled || mobileMenuOpen
            ? "bg-luxury-white/90 backdrop-blur-md py-4 border-b border-luxury-border/30 shadow-sm"
            : "bg-transparent"
        )}
      >
        <Container className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <span className="font-serif text-2xl tracking-tighter">
              YA<span className="text-luxury-gold">.</span>
            </span>
            <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-luxury-gray group-hover:text-luxury-gold transition-colors duration-500 mt-1">
              Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[11px] uppercase tracking-[0.2em] font-medium text-luxury-black hover:text-luxury-gold transition-colors duration-500",
                  link.name === "AI Solutions" && "text-luxury-gold font-semibold relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-luxury-gold"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/#contact">
              <button className="border border-luxury-black/10 px-6 py-2 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-luxury-black hover:text-luxury-white transition-all duration-500 cursor-pointer">
                Hire Me
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-luxury-black hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </Container>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-luxury-white/95 pt-28 px-8 md:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl font-serif text-luxury-black hover:text-luxury-gold transition-colors flex items-center justify-between group",
                      link.name === "AI Solutions" && "text-luxury-gold italic"
                    )}
                  >
                    <span>{link.name}</span>
                    <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity text-luxury-gold font-sans font-light">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 pt-8 border-t border-luxury-border/30"
            >
              <p className="text-xs uppercase tracking-widest text-luxury-gray">Direct Inquiries</p>
              <a href="mailto:yashaher0913@gmail.com" className="text-lg font-serif text-luxury-black hover:text-luxury-gold transition-colors">
                yashaher0913@gmail.com
              </a>
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                <button className="w-full bg-luxury-black text-luxury-white py-4 uppercase tracking-[0.2em] font-medium hover:bg-luxury-gold transition-colors duration-500 cursor-pointer">
                  Hire Me
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
