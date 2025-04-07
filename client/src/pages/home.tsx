import { useState, useEffect } from "react";
import { AnimatedHero } from "@/components/animated-hero";
import { BackgroundPaths } from "@/components/background-paths";
import Logo from "@/components/logo";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();
  
  // Check if user is already authenticated
  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background animation */}
      <BackgroundPaths />
      
      {/* Header with logo */}
      <header className="container mx-auto pt-8 pb-4 px-4 relative z-10">
        <div className="flex flex-col items-center">
          <Logo size="lg" />
          <h1 className="text-center text-4xl font-normal mt-4 text-white">Milovat</h1>
        </div>
      </header>
      
      {/* Main hero section with animated text */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <AnimatedHero />
        
        <div className="mt-16 text-amber-500 animate-bounce">
          <span className="sr-only">Descubre más</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
      </main>
    </div>
  );
}
