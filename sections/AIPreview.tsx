"use client";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, MessageSquareCode, Users, Database, ArrowRight } from "lucide-react";

const previewCards = [
  {
    title: "24/7 Customer Replies",
    desc: "Instantly reply to customer queries, greetings, and booking requests day or night. Never let a client wait.",
    icon: Clock,
  },
  {
    title: "WhatsApp Booking Automation",
    desc: "Let clients choose service treatments, pick slots, and confirm appointments entirely through chat.",
    icon: MessageSquareCode,
  },
  {
    title: "Lead Collection & Storage",
    desc: "Capture names, phone numbers, treatment preferences, and service history automatically in real time.",
    icon: Users,
  },
  {
    title: "Google Sheets Integration",
    desc: "Sync all bookings and lead databases instantly to a clean Google Sheet that your staff can view.",
    icon: Database,
  }
];

export const AIPreview = () => {
  return (
    <Section id="ai-solutions" className="bg-white border-t border-luxury-border/30 relative">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl text-left">
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
              Business Transformation
            </span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Automate Your Business <span className="italic text-luxury-gold">with AI</span>
            </h2>
            <p className="text-luxury-gray font-light mt-6 leading-relaxed max-w-xl text-base">
              Say goodbye to missed messages and scheduling conflicts. Scale your operations with an assistant that acts as a full-time receptionist for a fraction of the price.
            </p>
          </div>

          <div className="shrink-0 text-left">
            <Link href="/ai-receptionist">
              <Button variant="secondary" className="flex items-center gap-3 group">
                <span>Explore AI Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {previewCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-[#FCFBFA] border border-luxury-border/30 p-8 rounded-3xl hover:border-luxury-gold/50 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-luxury-black mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-luxury-gray font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
