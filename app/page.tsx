import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { AIPromoBanner } from "@/sections/AIPromoBanner";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { Projects } from "@/sections/Projects";
import { AIPreview } from "@/sections/AIPreview";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <AIPromoBanner />
      <About />
      <Services />
      <Projects />
      <AIPreview />
      <Contact />
    </main>
  );
}
