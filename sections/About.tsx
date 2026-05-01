"use client";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { motion } from "framer-motion";
import Image from "next/image";

export const About = () => {
  return (
    <Section id="about" className="bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-[4/5] bg-luxury-white border border-luxury-border p-4"
            >
              <div className="w-full h-full relative overflow-hidden">
                <Image 
                  src="/images/yash.jpeg" 
                  alt="Yash Profile" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 border-b border-r border-luxury-gold pointer-events-none" />
          </div>

          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-medium mb-6 block"
            >
              The Philosophy
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-serif leading-tight mb-8"
            >
              Simplicity is the ultimate <span className="italic">sophistication</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-luxury-gray text-lg font-sans font-light leading-relaxed"
            >
              <p>
                With over 2 years of experience in full-stack development, I specialize in 
                architecting scalable web solutions that don't just work—they inspire. 
                My approach combines technical rigor with a keen eye for aesthetic detail.
              </p>
              <p>
                I believe that every line of code should serve a purpose, much like every 
                element in a well-designed space. I work with high-growth startups and 
                established luxury brands to bring their digital visions to life.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-luxury-border"
            >
              <div>
                <h4 className="font-serif text-xl mb-4">Core Expertise</h4>
                <ul className="text-sm space-y-2 text-luxury-gray uppercase tracking-wider">
                  <li>Architecture Design</li>
                  <li>Next.js & React</li>
                  <li>Node.js / Python</li>
                  <li>UI/UX Engineering</li>
                </ul>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-4">Experience</h4>
                <ul className="text-sm space-y-2 text-luxury-gray uppercase tracking-wider">
                  <li>2+ Years Industry</li>
                  <li>Lead Engineer</li>
                  <li>Freelance Consultant</li>
                  <li>Open Source Contributor</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
