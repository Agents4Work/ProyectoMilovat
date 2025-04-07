import { useEffect } from "react";
import { AnimatedHero } from "@/components/animated-hero";
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
    <div className="h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Main hero section with animated text */}
      <main className="flex-1 flex items-center justify-center relative z-10 h-full">
        <AnimatedHero />
      </main>
    </div>
  );
}
