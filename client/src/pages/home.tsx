import { useEffect, useRef, useState } from "react";
import { AnimatedHero } from "@/components/animated-hero";
import { BackgroundPaths } from "@/components/background-paths";
import { AboutSection } from "@/components/about-section";
import { AnimatedBuildingSection } from "@/components/animated-building-section";
import { FeatureGrid } from "@/components/feature-grid";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import IntroLoader from "@/components/intro-loader";

export default function Home() {
  const [, navigate] = useLocation();
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  
  // Check if user is already authenticated
  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole) {
      // Skip intro and directly navigate to dashboard if authenticated
      window.forceSkipIntro = true;
      navigate('/dashboard');
    }
  }, [navigate]);

  // Listen for introCompleted state changes
  useEffect(() => {
    const checkIntroStatus = () => {
      if (window.introCompleted) {
        setShowIntro(false);
      }
    };
    
    // Check initially
    checkIntroStatus();
    
    // Setup listener for checking intro status
    window.addEventListener('storage', checkIntroStatus);
    
    // Setup a timer to periodically check intro status (backup)
    const intervalId = setInterval(checkIntroStatus, 200);
    
    return () => {
      window.removeEventListener('storage', checkIntroStatus);
      clearInterval(intervalId);
    };
  }, []);
  
  // Scroll to about section function
  const scrollToAboutSection = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Intro loader animation */}
      <AnimatePresence>
        {showIntro && <IntroLoader />}
      </AnimatePresence>
      
      {/* Hero section with black background and animated paths */}
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background animated paths */}
        <BackgroundPaths />
        
        {/* Main hero section with animated text */}
        <main className="flex-1 flex flex-col items-center justify-center relative z-10 h-full">
          <AnimatedHero />
          
          {/* Space for additional content if needed */}
        </main>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-amber-500 flex flex-col items-center z-20 cursor-pointer hover:scale-110 transition-transform duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
              opacity: { delay: 2, duration: 1 },
              y: { 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "easeInOut" 
              }
          }}
          onClick={scrollToAboutSection}
        >
          <p className="text-sm mb-2 font-medium metallic-elegant-text">Descubre más</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </div>
      
      {/* About section with dark gray background */}
      <div ref={aboutSectionRef}>
        <AboutSection />
      </div>
      
      {/* Animated Building Section with black background */}
      <AnimatedBuildingSection />

      {/* Feature Grid Section */}
      <FeatureGrid />
    </div>
  );
}
