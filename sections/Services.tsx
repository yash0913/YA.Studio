"use client";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code, Layout, MessageSquareCode, Sparkles, Check, ArrowRight } from "lucide-react";

const servicesList = [
  {
    title: "Full-Stack Web Development",
    desc: "Architecting high-performance websites, ecommerce platforms, and custom SaaS web applications. Built using React, Next.js, Node.js, and cloud databases.",
    icon: Code,
    features: ["Performance-First Code", "Database Architecture", "Custom API Integrations", "Security & Auditing"],
    featured: false,
    link: "/#contact",
    btnText: "Discuss Project"
  },
  {
    title: "WhatsApp AI Receptionist",
    desc: "Automate bookings, enquiries, lead collection, and customer support directly on WhatsApp. Trained specifically with your business menu, locations, and calendars.",
    icon: MessageSquareCode,
    features: ["24/7 Smart Responses", "Automated Slot Booking", "Google Sheets Sync", "Instant Lead Notifications"],
    featured: true,
    link: "/ai-receptionist",
    btnText: "Learn More"
  },
  {
    title: "UI/UX & Creative Engineering",
    desc: "Designing premium digital experiences with sophisticated typography, animations, and layouts. Merging modern art directions with functional frontend code.",
    icon: Layout,
    features: ["Art Direction & Branding", "Interactive WebGL Graphics", "Mobile Responsive Layouts", "Aesthetic Precision"],
    featured: false,
    link: "/#contact",
    btnText: "Discuss Project"
  }
];

export const Services = () => {
  return (
    <Section id="services" className="bg-[#FAF8F5] border-t border-b border-luxury-border/30">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif"
          >
            Premium Digital <span className="italic text-luxury-gold">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-luxury-gray font-light mt-6 max-w-xl mx-auto text-base"
          >
            Bridging complex software development with sophisticated design to deliver exceptional value.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`flex flex-col justify-between p-8 md:p-10 rounded-[36px] transition-all duration-500 relative ${
                  service.featured
                    ? "bg-luxury-black text-white border-2 border-luxury-gold shadow-xl shadow-luxury-gold/5 lg:scale-105 z-10"
                    : "bg-white border border-luxury-border/30 hover:border-luxury-gold/50 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Featured Service Badge */}
                {service.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-luxury-gold text-white text-[9px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 fill-current" />
                    <span>Featured Service</span>
                  </div>
                )}

                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 ${
                    service.featured ? "bg-luxury-gold text-white" : "bg-luxury-gold/10 text-luxury-gold"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className={`font-serif text-2xl mb-4 ${service.featured ? "text-luxury-white" : "text-luxury-black"}`}>
                    {service.title}
                  </h3>

                  <p className={`text-sm leading-relaxed mb-8 font-light ${service.featured ? "text-neutral-300" : "text-luxury-gray"}`}>
                    {service.desc}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs uppercase tracking-wider">
                        <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                        <span className={service.featured ? "text-neutral-400" : "text-luxury-gray"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link href={service.link} className="w-full block">
                    {service.featured ? (
                      <Button variant="secondary" className="w-full flex items-center justify-center gap-2 group">
                        <span>{service.btnText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                        <span>{service.btnText}</span>
                      </Button>
                    )}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
