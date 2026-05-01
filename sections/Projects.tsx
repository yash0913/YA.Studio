"use client";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Eteto",
    image: "/images/eteto.png",
    link: "https://www.eteto.in/"
  },
  {
    title: "JP Agro",
    image: "/images/jp-agro.png",
    link: "https://www.jp-agro.in/"
  },
  {
    title: "Nailies Sparkle Studio",
    image: "/images/Nailies.png",
    link: "https://nailies-sparkle-studio.lovable.app/"
  },
  {
    title: "We Morph",
    image: "/images/we-morph.png",
    link: "https://glassmorphism-glow-portal.lovable.app/"
  },
  {
    title: "Maison Écru",
    image: "/images/MAISON.png",
    link: "https://esthetic-bloom-gallery.vercel.app/"
  },
  {
    title: "Gen-Z",
    image: "/images/Genz.png",
    link: "https://raisin-boutique-display.lovable.app/"
  },
  {
    title: "Luxe Threads",
    image: "/images/Luxe-threads.png",
    link: "https://fashion-street-self.vercel.app/"
  }
];

const ProjectCard = ({ project, index, scrollYProgress }: any) => {
  const totalProjects = projects.length;
  const start = index / totalProjects;
  
  // Card enters from bottom
  const y = useTransform(
    scrollYProgress, 
    [Math.max(0, start - 0.1), Math.max(0, start)], 
    ["100vh", "0vh"]
  );
  
  // Card scales down slightly when covered, but stays 100% opaque
  const nextStart = (index + 1) / totalProjects;
  const nextEnd = (index + 1.4) / totalProjects;
  const scale = useTransform(
    scrollYProgress, 
    [Math.min(1, nextStart), Math.min(1, nextEnd)], 
    [1, 0.95]
  );

  return (
    <motion.div
      style={{ 
        y: index === 0 ? 0 : y,
        scale,
        opacity: 1, // Fixed opacity as per user request
        zIndex: index,
        top: `${10 + index * 2}vh`, 
      }}
      className="sticky h-[75vh] w-[94%] md:w-full max-w-6xl rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/10 bg-black mb-10 cursor-pointer group/card"
    >
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full h-full relative"
      >
        <motion.div 
          className="w-full h-full overflow-hidden"
          whileHover={{ 
            scale: 1.03,
            filter: "brightness(1.1)",
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      </a>
    </motion.div>
  );
};

export const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <Section id="projects" className="bg-white p-0 overflow-visible">
      {/* Sticky Title Section */}
      <div className="sticky top-0 h-screen w-full flex items-center z-0 pointer-events-none">
        <Container>
          <motion.div
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0.2]),
              y: useTransform(scrollYProgress, [0, 0.05], [0, -20])
            }}
          >
            <span className="text-luxury-gold text-[12px] uppercase tracking-[0.6em] font-black mb-6 block">
              Portfolio
            </span>
            <h2 className="text-6xl md:text-[9rem] font-serif leading-[0.8] tracking-tighter opacity-10">
              PROJECTS<span className="text-luxury-gold">.</span>
            </h2>
          </motion.div>
        </Container>
      </div>

      {/* Main Scroll Content with snap points */}
      <div 
        ref={containerRef} 
        className="relative h-[800vh] flex flex-col items-center -mt-[100vh]"
      >
        {/* Anchor points for snapping - one for each project + initial title */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-[100vh] snap-start" /> {/* Title snap */}
          <div className="h-[100vh] snap-start" /> {/* Project 1 snap */}
          <div className="h-[100vh] snap-start" /> {/* Project 2 snap */}
          <div className="h-[100vh] snap-start" /> {/* Project 3 snap */}
          <div className="h-[100vh] snap-start" /> {/* Project 4 snap */}
          <div className="h-[100vh] snap-start" /> {/* Project 5 snap */}
          <div className="h-[100vh] snap-start" /> {/* Project 6 snap */}
          <div className="h-[100vh] snap-start" /> {/* Project 7 snap */}
        </div>

        {/* Spacer for the title section */}
        <div className="h-[100vh] w-full" />
        
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index} 
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
      
      <div className="h-[20vh]" />
    </Section>
  );
};

