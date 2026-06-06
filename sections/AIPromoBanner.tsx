"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, MessageSquare, ArrowRight } from "lucide-react";

export const AIPromoBanner = () => {
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF8F5] border border-luxury-gold/30 rounded-[32px] p-8 md:p-12 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500"
        >
          {/* Subtle gold blur background */}
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-luxury-gold/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-luxury-gold/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-6 max-w-2xl text-left">
              <div className="flex items-center gap-2.5">
                <span className="bg-luxury-gold text-white text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="w-3 h-3" />
                  <span>NEW</span>
                </span>
                <span className="text-luxury-gold text-[10px] uppercase tracking-[0.3em] font-semibold">
                  Business Automation
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif leading-tight text-luxury-black">
                AI Solutions for Businesses<span className="text-luxury-gold">.</span>
              </h2>

              <p className="text-luxury-gray text-base font-sans font-light leading-relaxed">
                I now help salons and businesses automate customer communication using AI-powered WhatsApp assistants that can answer enquiries, collect leads, manage bookings, and work 24/7.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              <Link href="/ai-receptionist" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full flex items-center justify-center gap-2 group">
                  <span>View AI Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="#contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Book Free Demo</span>
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
