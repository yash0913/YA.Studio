"use client";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { useState } from "react";
import { Button } from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    niche: "",
    details: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", phone: "", niche: "", details: "" });
      } else {
        setStatus("error");
        setFeedback(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setFeedback("Failed to send inquiry. Please check your connection.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Section id="contact" className="bg-white border-t border-luxury-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-medium mb-6 block"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-serif mb-12"
            >
              Let's create something <span className="italic">extraordinary</span>.
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-12"
            >
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-medium mb-4">Location</h4>
                <p className="text-xl font-serif">Based in Mumbai, available globally.</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-medium mb-4">Direct Contact</h4>
                <a 
                  href="mailto:yashaher0913@gmail.com"
                  className="text-xl font-serif hover:text-luxury-gold transition-colors duration-500 cursor-pointer"
                >
                  yashaher0913@gmail.com
                </a>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-medium mb-4">Social Presence</h4>
                <div className="flex gap-8">
                  {[
                    { name: "LinkedIn", href: "https://www.linkedin.com/in/yash-aher-3b2a27355?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
                    { name: "GitHub", href: "https://github.com/yash0913" },
                    { name: "Instagram", href: "https://www.instagram.com/y.ashhhh_09?igsh=c2oxajZndXJpMXZy" }
                  ].map((social) => (
                    <a 
                      key={social.name} 
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm uppercase tracking-widest hover:text-luxury-gold transition-colors duration-500 cursor-pointer"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-luxury-white border border-luxury-border p-12 md:p-16 min-h-[600px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center space-y-8"
                >
                  <div className="w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(140,106,44,0.3)]">
                    <motion.svg 
                      initial={{ pathLength: 0 }} 
                      animate={{ pathLength: 1 }} 
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="w-10 h-10 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </div>
                  <h3 className="text-3xl font-serif">Inquiry Received</h3>
                  <p className="text-luxury-gray font-light text-lg">
                    Thank you for reaching out. I will personally review your project details and get back to you within 24 hours.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setStatus("idle")}
                    className="mt-8"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="space-y-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-luxury-gray font-medium">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      className="w-full bg-transparent border-b border-luxury-border pb-4 focus:border-luxury-gold outline-none transition-colors duration-500 font-serif text-lg"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-luxury-gray font-medium">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 000-0000" 
                      className="w-full bg-transparent border-b border-luxury-border pb-4 focus:border-luxury-gold outline-none transition-colors duration-500 font-serif text-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-luxury-gray font-medium">Business Niche *</label>
                    <input 
                      type="text" 
                      name="niche"
                      value={formData.niche}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Luxury Real Estate, Fintech" 
                      className="w-full bg-transparent border-b border-luxury-border pb-4 focus:border-luxury-gold outline-none transition-colors duration-500 font-serif text-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-luxury-gray font-medium">Project Details</label>
                    <textarea 
                      rows={4} 
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Tell me about your vision and goals..." 
                      className="w-full bg-transparent border-b border-luxury-border pb-4 focus:border-luxury-gold outline-none transition-colors duration-500 font-serif text-lg resize-none"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full py-5 disabled:opacity-50"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Processing..." : "Submit Inquiry"}
                    </Button>
                    
                    {feedback && status === "error" && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-center font-medium text-red-600"
                      >
                        {feedback}
                      </motion.p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>

      <div className="mt-40 border-t border-luxury-border py-12">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="font-serif text-xl tracking-tighter">YA<span className="text-luxury-gold">.</span></span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gray">
            © 2026 Yash. All rights reserved. Built with precision.
          </span>
          <div className="flex gap-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-gray hover:text-luxury-gold transition-colors cursor-pointer">Privacy</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-gray hover:text-luxury-gold transition-colors cursor-pointer">Terms</span>
          </div>
        </Container>
      </div>
    </Section>
  );
};
