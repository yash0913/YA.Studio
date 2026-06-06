"use client";

import React, { useState, useEffect, useRef } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  X,
  ArrowRight,
  MessageSquare,
  Calendar,
  Database,
  Sparkles,
  Building,
  Scissors,
  Heart,
  Palette,
  ChevronDown,
  ChevronUp,
  Star,
  Phone,
  ShieldAlert,
  BarChart2,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Users,
  Grid,
  Zap,
  HelpCircle,
} from "lucide-react";

// --- Types & Interfaces ---
interface FAQItem {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  role: string;
  salon: string;
  rating: number;
  text: string;
}

// --- Data ---
const problemCards = [
  { text: "Missed WhatsApp messages", desc: "Clients expect replies in 5 minutes. If you're busy, they find another salon." },
  { text: "Slow response times", desc: "Manual replies take time, especially during busy weekends or peak salon hours." },
  { text: "Inquiries outside business hours", desc: "No one is active at midnight to take bookings, causing lost night-time leads." },
  { text: "Staff busy serving clients", desc: "Front desk staff multi-tasking between calls, billing, and welcoming walk-ins." },
  { text: "Lost bookings & drop-offs", desc: "Forgetting to follow up or send reminders means empty slots and lower salon revenue." },
  { text: "Manual appointment management", desc: "Writing bookings in registers or excel sheets leads to scheduling conflicts." }
];

const features = [
  {
    title: "24/7 WhatsApp Replies",
    desc: "Instantly reply to customer inquiries, greetings, and booking requests day or night.",
    icon: Clock,
  },
  {
    title: "Appointment Booking",
    desc: "Automate the entire booking loop, from service selection to final confirmation.",
    icon: Calendar,
  },
  {
    title: "Available Slot Checking",
    desc: "Real-time calendar synchronization to verify and show available time slots to clients.",
    icon: Check,
  },
  {
    title: "Google Sheets Integration",
    desc: "Every booking and lead is recorded instantly in a simple Google Sheet or CRM tool.",
    icon: Database,
  },
  {
    title: "Lead Collection",
    desc: "Capture names, phone numbers, preferred treatments, and service history automatically.",
    icon: Users,
  },
  {
    title: "Customer Data Storage",
    desc: "Grow your database of loyal clients with tags for personalized promotional offers.",
    icon: Grid,
  },
  {
    title: "Human Handover Support",
    desc: "Easily step in and take over the chat whenever a client requests custom guidance.",
    icon: MessageSquare,
  },
  {
    title: "Multi-Branch Support",
    desc: "Direct bookings to different branch calendars based on the user's location input.",
    icon: Building,
  },
  {
    title: "No Missed Leads",
    desc: "Ensure every user who message you gets a warm, immediate, and helpful response.",
    icon: Zap,
  },
  {
    title: "Works Even When You're Busy",
    desc: "Let your staff focus on rendering premium beauty services instead of answering phone calls.",
    icon: Sparkles,
  }
];

const targetAudience = [
  { title: "Beauty Parlours", icon: Heart, desc: "Manage hair styling, makeup packages, and threading bookings seamlessly." },
  { title: "Unisex Salons", icon: Scissors, desc: "Balance high volumes of walk-ins and multiple stylist schedules effortlessly." },
  { title: "Spa Centers", icon: Sparkles, desc: "Let clients choose massage styles, therapists, and duration via automated chat." },
  { title: "Nail Studios", icon: Palette, desc: "Manage detailed nail art bookings and technician slots in real time." },
  { title: "Beauty Clinics", icon: Building, desc: "Qualify clinic leads and book specialized skin & hair consultations." },
  { title: "Hair Salons", icon: Scissors, desc: "Sync stylist availability and send automated reminders to reduce no-shows." }
];

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Salon Director",
    salon: "Aura Beauty & Spa, Mumbai",
    rating: 5,
    text: "Before introducing the AI receptionist, we were losing at least 15-20 bookings every month because we were too busy to reply on WhatsApp. Now, bookings happen automatically even at 11 PM. Our revenue increased by 22% in the first month!",
  },
  {
    name: "Rohan Mehta",
    role: "Founder",
    salon: "Glow & Cut Unisex Lounge, Pune",
    rating: 5,
    text: "I was skeptical about AI, but our clients love how fast it replies. They book their haircuts and hair spa sessions in under a minute. The integration with Google Sheets is flawless, and it works 24/7 without complaining.",
  },
  {
    name: "Anjali Gupta",
    role: "Owner",
    salon: "Nailies Sparkle Studio, Delhi",
    rating: 5,
    text: "As a nail artist, my hands are always busy. I couldn't check my calendar and text clients back. The AI Assistant handles everything now—checking slots, booking, and collecting client details. It's like having a full-time receptionist for a fraction of the cost.",
  }
];

const faqItems: FAQItem[] = [
  {
    question: "Will this work on my existing WhatsApp Business number?",
    answer: "Yes! We set this up on your current WhatsApp Business number. You don't need to change your number. We use the official WhatsApp Cloud API, which allows both the AI and your staff to access and answer chats simultaneously.",
  },
  {
    question: "Can customers book appointments completely automatically?",
    answer: "Absolutely. The AI is trained with your menu, prices, and stylist availability. It checks your calendar, suggests free slots, collects customer names and phone numbers, and adds the booking directly into your schedule.",
  },
  {
    question: "Can I edit my services and pricing later?",
    answer: "Yes, you can edit services, prices, and timing whenever you want. We set up an easy-to-use Google Sheet panel where any change you make is instantly updated in the AI's memory.",
  },
  {
    question: "Do I need any technical knowledge to manage this?",
    answer: "None at all. Our team handles the entire setup, API connections, calendar integrations, and testing. You only need to view bookings on your calendar or Google Sheet.",
  },
  {
    question: "Can I take over chats manually if a customer asks a complex question?",
    answer: "Yes. You can monitor all conversations in real-time. If a customer asks a highly custom question or asks to speak with a human, the AI can alert your team, allowing you to take over the chat immediately.",
  },
  {
    question: "How does billing work? Are there any hidden fees?",
    answer: "Our package is a transparent one-time setup fee (₹20,000 for AI Receptionist or ₹25,000 for AI + Website). Standard WhatsApp API messaging fees apply (charged directly by Meta, usually less than 30-40 paise per conversation conversation). There are no hidden charges.",
  }
];

const chatScreenshots = [
  { path: "/artisan-ai/chat-1.png", label: "1. Greeting & Inquiry" },
  { path: "/artisan-ai/chat-2.png", label: "2. Selecting Branch" },
  { path: "/artisan-ai/chat-3.png", label: "3. Service Selection" },
  { path: "/artisan-ai/chat-4.png", label: "4. Slot Checking" },
  { path: "/artisan-ai/chat-5.png", label: "5. Final Confirmation" }
];

export default function SalonReceptionistPage() {
  // Navigation active link logic
  const [activeTab, setActiveTab] = useState("overview");

  // Hero Chat simulator logic
  const [chatStep, setChatStep] = useState(0);
  const mockChatMessages = [
    { sender: "client", text: "Hey! Do you have any open slots for a hair spa today?" },
    { sender: "ai", text: "Hello! Welcome to Aura Salon. 🌸 Yes, I can help you book a hair spa. Which branch would you like to visit?\n\n1. Bandra\n2. Juhu" },
    { sender: "client", text: "Bandra please." },
    { sender: "ai", text: "Perfect! We have these slots open at our Bandra branch today:\n\n1. 02:00 PM\n2. 04:30 PM\n3. 06:00 PM\n\nWhich slot works for you?" },
    { sender: "client", text: "04:30 PM works best." },
    { sender: "ai", text: "Awesome! To confirm your appointment today at 04:30 PM, could I please get your full name and phone number?" },
    { sender: "client", text: "Ananya Sharma, 9876543210" },
    { sender: "ai", text: "🎉 Appointment Confirmed!\n\n💆‍♀️ Service: Hair Spa\n📍 Branch: Bandra\n⏰ Time: Today at 04:30 PM\n👤 Client: Ananya Sharma\n\nSee you soon, Ananya!" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setChatStep((prev) => (prev < mockChatMessages.length ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // ROI Calculator states
  const [missedBookings, setMissedBookings] = useState(10);
  const [avgServiceValue, setAvgServiceValue] = useState(1500);

  const monthlyLoss = missedBookings * avgServiceValue;
  const potentialRecovered = Math.round(monthlyLoss * 0.85); // 85% recovery rate
  const annualLoss = monthlyLoss * 12;

  // Carousel State
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Header scroll detection
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-luxury-white text-luxury-black font-sans min-h-screen selection:bg-luxury-gold selection:text-white antialiased">
      {/* --- STANDALONE HEADER --- */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 ${
          scrolled ? "bg-luxury-white/90 backdrop-blur-md py-4 border-b border-luxury-border/30 shadow-sm" : "bg-transparent"
        }`}
      >
        <Container className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-serif text-2xl tracking-tighter">
              YA<span className="text-luxury-gold">.</span>
            </span>
            <span className="hidden md:block text-[9px] uppercase tracking-[0.3em] text-luxury-gray group-hover:text-luxury-gold transition-colors duration-500 mt-1">
              Portfolio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {[
              { name: "Overview", href: "#hero" },
              { name: "The Problem", href: "#problem" },
              { name: "The Solution", href: "#solution" },
              { name: "Live Demo", href: "#demo" },
              { name: "Features", href: "#features" },
              { name: "Pricing", href: "#pricing" },
              { name: "FAQs", href: "#faq" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] uppercase tracking-[0.2em] font-medium text-luxury-black hover:text-luxury-gold transition-colors duration-500"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact-us">
              <button className="border border-luxury-black/20 px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-luxury-black hover:text-luxury-white transition-all duration-500 cursor-pointer">
                Book Demo
              </button>
            </a>
          </div>
        </Container>
      </motion.header>

      {/* --- SECTION 1: HERO --- */}
      <section id="hero" className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-luxury-white">
        {/* Subtle Decorative Gold Blob */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-luxury-gold/3 blur-[90px] rounded-full -z-10 pointer-events-none" />

        <Container className="relative z-10">
          {/* Breadcrumb & Back Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-luxury-border/20">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-luxury-gray">
              <Link href="/" className="hover:text-luxury-gold transition-colors font-medium">Home</Link>
              <span>→</span>
              <span className="text-luxury-gold font-semibold">AI Solutions</span>
            </div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-luxury-black hover:text-luxury-gold transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span> Back to Portfolio
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-luxury-gold text-[11px] uppercase tracking-[0.5em] font-bold bg-luxury-gold/10 px-4 py-1.5 rounded-full inline-block">
                  WhatsApp AI Automation
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.15]"
              >
                Never Miss a Salon <br className="hidden sm:inline" />
                <span className="italic text-luxury-gold font-serif relative">
                  Booking Again
                  <span className="absolute left-0 bottom-1 w-full h-[2px] bg-luxury-gold/20" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-luxury-gray text-base sm:text-lg font-sans font-light max-w-xl leading-relaxed"
              >
                Your AI Receptionist replies instantly on WhatsApp, books appointments automatically, checks available slots, collects customer details, and works 24/7.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <a href="#contact-us">
                  <Button variant="secondary" className="shadow-lg shadow-luxury-gold/10">Book Free Demo</Button>
                </a>
                <a href="#demo">
                  <Button variant="outline">Watch Live Demo</Button>
                </a>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex items-center gap-8 pt-6 border-t border-luxury-border/30 max-w-md"
              >
                <div>
                  <p className="text-2xl font-serif font-semibold text-luxury-gold">100%</p>
                  <p className="text-[10px] uppercase tracking-wider text-luxury-gray">Automated Replies</p>
                </div>
                <div className="w-[1px] h-8 bg-luxury-border/40" />
                <div>
                  <p className="text-2xl font-serif font-semibold text-luxury-gold">24/7</p>
                  <p className="text-[10px] uppercase tracking-wider text-luxury-gray">Customer Booking</p>
                </div>
                <div className="w-[1px] h-8 bg-luxury-border/40" />
                <div>
                  <p className="text-2xl font-serif font-semibold text-luxury-gold">0</p>
                  <p className="text-[10px] uppercase tracking-wider text-luxury-gray">Missed Calls/Chats</p>
                </div>
              </motion.div>
            </div>

            {/* Right Interactive Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative w-[310px] sm:w-[340px] h-[640px] rounded-[48px] border-8 border-luxury-black bg-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden"
              >
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-luxury-black rounded-b-3xl z-40 flex items-center justify-center">
                  <div className="w-16 h-1 bg-neutral-800 rounded-full mb-1" />
                </div>

                {/* Mockup Screen Content */}
                <div className="w-full h-full bg-[#EAE6DF] flex flex-col relative pt-8 pb-4">
                  {/* Chat Header */}
                  <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 shadow-md z-10">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm text-luxury-white">
                      A
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Aura Salon AI</p>
                      <p className="text-[10px] text-green-300">Online • Active Assistant</p>
                    </div>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs flex flex-col justify-end">
                    <AnimatePresence>
                      {mockChatMessages.slice(0, chatStep).map((msg, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                            msg.sender === "client"
                              ? "bg-[#DCF8C6] self-end rounded-tr-none text-neutral-800"
                              : "bg-white self-start rounded-tl-none text-neutral-800 whitespace-pre-line"
                          }`}
                        >
                          <p className="leading-relaxed">{msg.text}</p>
                          <p className="text-[9px] text-neutral-400 text-right mt-1.5 font-light">
                            {idx % 2 === 0 ? "11:24 AM" : "11:25 AM"}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {chatStep < mockChatMessages.length && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/95 text-neutral-500 self-start p-2 px-4 rounded-full text-[11px] italic flex items-center gap-1 shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-75" />
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-150" />
                      </motion.div>
                    )}
                  </div>

                  {/* Input Footer */}
                  <div className="p-3 bg-neutral-100 flex items-center gap-2 border-t border-neutral-200">
                    <div className="flex-1 bg-white rounded-full py-2 px-4 text-neutral-400 text-[11px] shadow-sm">
                      Type a message...
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center text-white cursor-pointer shadow-md">
                      <SendIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- SECTION 2: THE PROBLEM --- */}
      <Section id="problem" className="bg-white border-t border-b border-luxury-border/30">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
              The Reality
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Most Salons Lose Customers <br />
              <span className="italic text-luxury-gold">Before They Even Visit</span>
            </h2>
            <p className="text-luxury-gray font-light mt-6 max-w-xl mx-auto">
              In the fast-paced beauty industry, convenience is key. If a customer has to wait to book, they switch to a competitor.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problemCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="border border-luxury-border/40 p-8 bg-luxury-white hover:border-luxury-gold/50 transition-all duration-500 group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                    ✕
                  </div>
                  <h3 className="font-serif text-lg font-medium tracking-tight group-hover:text-luxury-gold transition-colors">
                    {card.text}
                  </h3>
                </div>
                <p className="text-sm text-luxury-gray leading-relaxed font-light">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Animated Statistics */}
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-luxury-border/30">
            {[
              { percentage: "82%", label: "Prefer Chat Booking", desc: "Clients favor booking slots via WhatsApp over calls." },
              { percentage: "67%", label: "After-Hours Leads", desc: "Bookings sent when the salon is closed." },
              { percentage: "40%", label: "Unanswered Queries", desc: "Missed bookings due to busy salon hours." },
              { percentage: "₹7,500+", label: "Avg. Monthly Loss", desc: "Conservative revenue lost to poor responses." }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="text-center p-6 bg-[#FCFBFA] rounded-2xl border border-luxury-border/20"
              >
                <p className="text-4xl lg:text-5xl font-serif text-luxury-gold font-semibold mb-2">{stat.percentage}</p>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-luxury-black mb-3">{stat.label}</p>
                <p className="text-xs text-luxury-gray font-light leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- SECTION 3: THE SOLUTION --- */}
      <Section id="solution" className="bg-[#FAF8F5]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
              The System
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Meet Your <span className="italic text-luxury-gold">AI Receptionist</span>
            </h2>
            <p className="text-luxury-gray font-light mt-6 max-w-xl mx-auto">
              A streamlined, official WhatsApp assistant that takes care of the reservation loop from end-to-end.
            </p>
          </div>

          {/* Flow Stepper */}
          <div className="max-w-4xl mx-auto">
            {[
              { step: "01", title: "Customer sends message", desc: "A client initiates a chat on WhatsApp inquiring about services or slots." },
              { step: "02", title: "AI responds instantly", desc: "The assistant responds in seconds with your custom menu and greetings." },
              { step: "03", title: "Collects branch", desc: "If you have multiple locations, the AI asks the client to pick one." },
              { step: "04", title: "Collects service", desc: "Clients pick hair spa, manicure, massage, or consultations." },
              { step: "05", title: "Checks available slots", desc: "AI queries your calendar database in real time for free timings." },
              { step: "06", title: "Collects customer details", desc: "Asks for full name and phone number to avoid spam bookings." },
              { step: "07", title: "Confirms booking", desc: "Instantly sends a formatted booking confirmation on WhatsApp." },
              { step: "08", title: "Stores everything automatically", desc: "Details are fed into Google Sheets and calendars for salon staff." }
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col md:flex-row items-stretch gap-6 md:gap-12"
                >
                  <div className="flex md:flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-full border border-luxury-gold/50 flex items-center justify-center font-serif text-luxury-gold font-bold bg-white shadow-sm">
                      {step.step}
                    </div>
                    {idx < 7 && <div className="hidden md:block w-[1px] flex-1 bg-gradient-to-b from-luxury-gold/50 to-transparent min-h-[60px] my-3" />}
                  </div>
                  <div className="flex-1 bg-white border border-luxury-border/30 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-500">
                    <h3 className="font-serif text-lg font-medium text-luxury-black mb-2 flex items-center gap-2">
                      {step.title}
                      <Check className="w-4 h-4 text-luxury-gold" />
                    </h3>
                    <p className="text-xs sm:text-sm text-luxury-gray font-light leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>

                {idx < 7 && (
                  <div className="flex justify-center my-6 md:hidden">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5 text-luxury-gold rotate-90" />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- SECTION 4: LIVE CHAT DEMO (GALLERY) --- */}
      <Section id="demo" className="bg-white border-t border-b border-luxury-border/30">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
              Gallery Preview
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Real WhatsApp <span className="italic text-luxury-gold">Conversations</span>
            </h2>
            <p className="text-luxury-gray font-light mt-6 max-w-xl mx-auto">
              Click on any screenshot to expand and inspect the natural conversation flow between clients and the AI Receptionist.
            </p>
          </div>

          {/* Screenshot Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {chatScreenshots.map((shot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => {
                  setActiveImageIdx(idx);
                  setLightboxOpen(true);
                }}
                className="cursor-pointer group flex flex-col items-center"
              >
                <div className="relative aspect-[9/18] w-full rounded-2xl overflow-hidden border border-luxury-border/40 shadow-md group-hover:shadow-xl group-hover:border-luxury-gold/50 transition-all duration-500 bg-neutral-100">
                  <Image
                    src={shot.path}
                    alt={shot.label}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-luxury-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-luxury-black text-[10px] uppercase font-bold tracking-wider py-2 px-4 rounded-full shadow">
                      Expand
                    </span>
                  </div>
                </div>
                <p className="text-[11px] font-sans font-medium uppercase tracking-wider text-luxury-gray group-hover:text-luxury-gold transition-colors mt-4 text-center">
                  {shot.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-luxury-black/95 z-50 flex items-center justify-center p-4"
                onClick={() => setLightboxOpen(false)}
              >
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-6 right-6 text-white hover:text-luxury-gold transition-colors text-3xl font-light cursor-pointer"
                >
                  ✕
                </button>

                <div
                  className="relative max-w-md w-full max-h-[85vh] aspect-[9/18] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={chatScreenshots[activeImageIdx].path}
                    alt={chatScreenshots[activeImageIdx].label}
                    fill
                    className="object-contain"
                  />

                  {/* Navigation Arrows inside lightbox */}
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : chatScreenshots.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-xl cursor-pointer"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev < chatScreenshots.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-xl cursor-pointer"
                  >
                    ›
                  </button>

                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="bg-luxury-black/70 text-white text-xs px-4 py-1.5 rounded-full font-light border border-white/5">
                      {chatScreenshots[activeImageIdx].label}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>

      {/* --- SECTION 5: FEATURES --- */}
      <Section id="features" className="bg-[#FAF8F5]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
              Core Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Engineered to <span className="italic text-luxury-gold">Perform</span>
            </h2>
            <p className="text-luxury-gray font-light mt-6 max-w-xl mx-auto">
              Our AI Assistant is packed with enterprise-grade features designed to maximize booking conversions.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="bg-white border border-luxury-border/30 p-8 rounded-[32px] hover:border-luxury-gold/40 transition-all duration-500 shadow-sm flex gap-6 items-start group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-luxury-gold/5 flex items-center justify-center text-luxury-gold shrink-0 group-hover:bg-luxury-gold group-hover:text-white transition-all duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-luxury-black mb-3">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-luxury-gray font-light leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* --- SECTION 6: WHO IS THIS FOR --- */}
      <Section id="who-for" className="bg-white border-t border-b border-luxury-border/30">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
              Tailored Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Perfect Fit for Your <span className="italic text-luxury-gold">Business Niche</span>
            </h2>
            <p className="text-luxury-gray font-light mt-6 max-w-xl mx-auto">
              Whether you run a single boutique nail bar or a luxury chain of spa resorts, we adapt the training parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {targetAudience.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="border border-luxury-border/35 p-8 hover:border-luxury-gold/60 transition-all duration-500 bg-[#FCFBFA] group rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-luxury-black mb-3 group-hover:text-luxury-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-luxury-gray font-light leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* --- SECTION 7: PACKAGE COMPARISON --- */}
      <Section id="pricing" className="bg-[#FAF8F5]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
              Pricing Options
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Simple, <span className="italic text-luxury-gold">Transparent Packages</span>
            </h2>
            <p className="text-luxury-gray font-light mt-6 max-w-xl mx-auto">
              No complex subscription tiers. Select the one-time integration structure that matches your vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Package 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white border border-luxury-border/30 p-10 rounded-[40px] shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gray block mb-4">
                  Standard Setup
                </span>
                <h3 className="text-3xl font-serif mb-4">WhatsApp AI Receptionist</h3>
                <div className="flex items-baseline gap-2 mb-8 border-b border-luxury-border/20 pb-8">
                  <span className="text-4xl font-serif text-luxury-gold font-semibold">₹20,000</span>
                  <span className="text-xs text-luxury-gray font-light">One-time fee</span>
                </div>

                <p className="text-xs text-luxury-black font-semibold uppercase tracking-wider mb-6">What's Included:</p>
                <ul className="space-y-4 mb-10 text-sm font-light text-luxury-gray">
                  {[
                    "Official WhatsApp Cloud API Integration",
                    "Custom trained AI Assistant setup",
                    "Complete Booking Automation",
                    "Slot checking via calendar sync",
                    "Lead recording to Google Sheets",
                    "Client database generation",
                    "1 month of post-launch tech support"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#contact-us">
                <Button variant="outline" className="w-full">Get Started</Button>
              </a>
            </motion.div>

            {/* Package 2 (Highlighted) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-luxury-black border-2 border-luxury-gold p-10 rounded-[40px] shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              {/* Gold Ribbon Badge */}
              <div className="absolute top-5 right-5 bg-luxury-gold text-white text-[9px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow">
                Best Value
              </div>

              <div className="text-white">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold block mb-4">
                  Growth Bundle
                </span>
                <h3 className="text-3xl font-serif mb-4 text-luxury-white">AI Receptionist + Website</h3>
                <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-8">
                  <span className="text-4xl font-serif text-luxury-gold font-semibold">₹25,000</span>
                  <span className="text-xs text-neutral-400 font-light">One-time fee</span>
                </div>

                <p className="text-xs text-luxury-gold font-semibold uppercase tracking-wider mb-6">Everything in Package 1 plus:</p>
                <ul className="space-y-4 mb-10 text-sm font-light text-neutral-300">
                  {[
                    "Professional Brand Website",
                    "Custom 1-5 layout pages",
                    "Mobile responsive & fast loading",
                    "Core SEO setup & structure",
                    "WhatsApp widget integration",
                    "Lead & Appointment Booking forms",
                    "Premium typography & domain mapping"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#contact-us">
                <Button variant="secondary" className="w-full">Get Started</Button>
              </a>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 8: ROI SECTION --- */}
      <Section id="roi" className="bg-white border-t border-b border-luxury-border/30">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
              ROI Calculator
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              One Missed Booking <br />
              <span className="italic text-luxury-gold">Costs More Than This System</span>
            </h2>
            <p className="text-luxury-gray font-light mt-6 max-w-xl mx-auto">
              Drag the sliders below to calculate what missed inquiries are costing your business every month.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#FAF8F5] border border-luxury-border/30 rounded-[40px] p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Sliders */}
              <div className="space-y-8">
                {/* Slider 1 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-luxury-black font-medium uppercase tracking-wider text-[11px]">
                      Est. Missed Bookings / Month
                    </label>
                    <span className="text-luxury-gold font-serif font-bold text-lg">{missedBookings}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="60"
                    step="1"
                    value={missedBookings}
                    onChange={(e) => setMissedBookings(Number(e.target.value))}
                    className="w-full accent-luxury-gold bg-neutral-200 h-1 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-luxury-gray">
                    <span>2 bookings</span>
                    <span>60 bookings</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-luxury-black font-medium uppercase tracking-wider text-[11px]">
                      Avg. Service Value (₹)
                    </label>
                    <span className="text-luxury-gold font-serif font-bold text-lg">₹{avgServiceValue}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={avgServiceValue}
                    onChange={(e) => setAvgServiceValue(Number(e.target.value))}
                    className="w-full accent-luxury-gold bg-neutral-200 h-1 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-luxury-gray">
                    <span>₹500</span>
                    <span>₹5,000</span>
                  </div>
                </div>
              </div>

              {/* Calculations Box */}
              <div className="bg-white border border-luxury-border/30 rounded-3xl p-8 flex flex-col justify-center space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-luxury-gray mb-1">Estimated Monthly Revenue Loss</p>
                  <p className="text-3xl sm:text-4xl font-serif text-red-500 font-semibold">₹{monthlyLoss.toLocaleString()}</p>
                </div>
                <div className="w-full h-[1px] bg-luxury-border/20" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-luxury-gray mb-1">Annual Revenue Leakage</p>
                  <p className="text-2xl font-serif text-red-600 font-medium">₹{annualLoss.toLocaleString()}</p>
                </div>
                <div className="w-full h-[1px] bg-luxury-border/20" />
                <div className="bg-luxury-gold/5 p-4 rounded-xl border border-luxury-gold/20">
                  <p className="text-[10px] uppercase tracking-wider text-luxury-gold font-semibold mb-1">Potential Monthly Savings (85% Recovery)</p>
                  <p className="text-2xl font-serif text-luxury-gold font-bold">₹{potentialRecovered.toLocaleString()}</p>
                  <p className="text-[9px] text-luxury-gray font-light mt-1">Based on instant reply and booking follow-ups.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 9: TESTIMONIALS --- */}
      <Section id="testimonials" className="bg-[#FAF8F5]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Loved by <span className="italic text-luxury-gold">Salon Owners</span>
            </h2>
            <p className="text-luxury-gray font-light mt-6 max-w-xl mx-auto">
              Read how other wellness and beauty businesses transformed their operations using automation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-luxury-border/30 rounded-[40px] p-8 sm:p-12 shadow-sm text-center relative"
              >
                {/* Quote Icon */}
                <span className="absolute top-6 left-8 text-7xl font-serif text-luxury-gold/10 pointer-events-none select-none">
                  “
                </span>

                {/* Rating stars */}
                <div className="flex justify-center gap-1 mb-6 text-luxury-gold">
                  {[...Array(testimonials[testimonialIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <p className="text-lg font-serif italic text-luxury-black mb-8 leading-relaxed">
                  "{testimonials[testimonialIdx].text}"
                </p>

                <h4 className="text-sm font-semibold uppercase tracking-widest text-luxury-black mb-1">
                  {testimonials[testimonialIdx].name}
                </h4>
                <p className="text-xs text-luxury-gray font-light">
                  {testimonials[testimonialIdx].role} — <span className="text-luxury-gold font-normal">{testimonials[testimonialIdx].salon}</span>
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2.5 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === testimonialIdx ? "bg-luxury-gold w-6" : "bg-luxury-border/50 hover:bg-luxury-gold/45"
                  }`}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 10: FAQ --- */}
      <Section id="faq" className="bg-white border-t border-b border-luxury-border/30">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
              Got Questions?
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Frequently Asked <span className="italic text-luxury-gold">Details</span>
            </h2>
            <p className="text-luxury-gray font-light mt-6 max-w-xl mx-auto">
              Find instant answers to general questions about setup, configuration, and workflow.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-luxury-border/30 rounded-2xl bg-[#FCFBFA] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-luxury-black">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-luxury-gold shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-luxury-gold shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-luxury-border/10 text-xs sm:text-sm text-luxury-gray font-light leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* --- SECTION 11: FINAL CTA & CONTACT FORM --- */}
      <section id="contact-us" className="py-24 relative overflow-hidden bg-gradient-to-b from-luxury-white to-[#FAF8F5]">
        {/* Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-luxury-gold/5 via-transparent to-transparent opacity-50 pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
            <span className="text-luxury-gold text-[11px] uppercase tracking-[0.5em] font-semibold block">
              Get Started Today
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif">
              Ready to Automate Your <br />
              <span className="italic text-luxury-gold">Salon Bookings?</span>
            </h2>
            <p className="text-luxury-gray font-light max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              Get your custom-trained WhatsApp AI Receptionist running in days, not months. Secure more bookings and save staff time.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="https://wa.me/919529175877" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </Button>
              </a>
              <a href="#contact-form-block">
                <Button variant="outline">Schedule Demo Call</Button>
              </a>
            </div>
          </div>

          {/* Simple lead form matching portfolio theme */}
          <div id="contact-form-block" className="max-w-xl mx-auto bg-white border border-luxury-border/30 p-10 md:p-14 rounded-[36px] shadow-sm">
            <h3 className="font-serif text-2xl font-medium text-center text-luxury-black mb-8">
              Book a Free 15-Min Demo
            </h3>
            <SalonLeadForm />
          </div>
        </Container>
      </section>

      {/* --- STANDALONE FOOTER --- */}
      <footer className="border-t border-luxury-border/25 py-12 bg-white">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl tracking-tighter">YA<span className="text-luxury-gold">.</span></span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-luxury-gray">Aura AI receptionists</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gray text-center">
            © 2026 Yash. All rights reserved. Built with precision for salons & wellness centers.
          </span>
          <div className="flex gap-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-gray hover:text-luxury-gold transition-colors cursor-pointer">Privacy</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-gray hover:text-luxury-gold transition-colors cursor-pointer">Terms</span>
          </div>
        </Container>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  );
}

function SalonLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    salonName: "",
    salonNiche: "Unisex Salon",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Re-use existing contact API route or handle mock submit
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          niche: `Salon Demo - ${formData.salonNiche}`,
          details: `Requested a WhatsApp AI Receptionist Demo call for brand: ${formData.salonName}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please check inputs and try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to submit request. Please try again or WhatsApp us directly.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-luxury-gold/20">
          <Check className="w-8 h-8 text-white stroke-[3]" />
        </div>
        <h4 className="text-xl font-serif">Demo Scheduled!</h4>
        <p className="text-sm text-luxury-gray font-light leading-relaxed">
          Thank you for reaching out. We will connect with you via WhatsApp within 4 hours to showcase a live simulation on your own phone.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2.5">
        <label className="text-[10px] uppercase tracking-[0.3em] text-luxury-gray font-medium">Your Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g. Priya Sharma"
          className="w-full bg-transparent border-b border-luxury-border pb-3.5 focus:border-luxury-gold outline-none transition-colors duration-500 font-serif text-base"
        />
      </div>

      <div className="space-y-2.5">
        <label className="text-[10px] uppercase tracking-[0.3em] text-luxury-gray font-medium">WhatsApp Number *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="e.g. +91 98765 43210"
          className="w-full bg-transparent border-b border-luxury-border pb-3.5 focus:border-luxury-gold outline-none transition-colors duration-500 font-serif text-base"
        />
      </div>

      <div className="space-y-2.5">
        <label className="text-[10px] uppercase tracking-[0.3em] text-luxury-gray font-medium">Salon / Brand Name</label>
        <input
          type="text"
          name="salonName"
          value={formData.salonName}
          onChange={handleChange}
          required
          placeholder="e.g. Aura Beauty Lounge"
          className="w-full bg-transparent border-b border-luxury-border pb-3.5 focus:border-luxury-gold outline-none transition-colors duration-500 font-serif text-base"
        />
      </div>

      <div className="space-y-2.5 flex flex-col">
        <label className="text-[10px] uppercase tracking-[0.3em] text-luxury-gray font-medium mb-2">Business Type</label>
        <select
          name="salonNiche"
          value={formData.salonNiche}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-luxury-border pb-3.5 focus:border-luxury-gold outline-none transition-colors duration-500 font-serif text-base cursor-pointer"
        >
          <option value="Beauty Parlour">Beauty Parlour</option>
          <option value="Unisex Salon">Unisex Salon</option>
          <option value="Spa Center">Spa Center</option>
          <option value="Nail Studio">Nail Studio</option>
          <option value="Beauty Clinic">Beauty Clinic</option>
          <option value="Hair Salon">Hair Salon</option>
        </select>
      </div>

      <div className="pt-4 space-y-4">
        <Button
          type="submit"
          variant="primary"
          className="w-full py-4.5 disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Scheduling..." : "Schedule My Demo"}
        </Button>

        {status === "error" && (
          <p className="text-xs text-red-500 font-medium text-center">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
