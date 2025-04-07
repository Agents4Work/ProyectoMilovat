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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Main hero section with animated text */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 min-h-screen">
        <AnimatedHero />
      </main>
    </div>
  );
}
