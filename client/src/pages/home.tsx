import { useEffect, useRef } from "react";
import { AnimatedHero } from "@/components/animated-hero";
import { BackgroundPaths } from "@/components/background-paths";
import { AboutSection } from "@/components/about-section";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  
  // Check if user is already authenticated
  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  // Scroll to about section function
  const scrollToAboutSection = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Hero section with black background and animated paths */}
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background animated paths */}
        <BackgroundPaths />
        
        {/* Main hero section with animated text */}
        <main className="flex-1 flex flex-col items-center justify-center relative z-10 h-full">
          <AnimatedHero />
          
          {/* Space for additional content if needed */}
        </main>
      </div>
      
      {/* About section with dark gray background */}
      <div ref={aboutSectionRef}>
        <AboutSection />
      </div>
    </div>
  );
}
