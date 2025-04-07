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
        
        <div className="absolute bottom-8 flex flex-col items-center justify-center animate-bounce" style={{ left: "calc(50% - 30px)" }}>
          <div className="text-[#F5A623] font-normal text-sm mb-1">Descubre más</div>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 20L4 12L12 4" 
              stroke="#F5A623" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              transform="rotate(90 12 12)"
            />
          </svg>
        </div>
      </main>
    </div>
  );
}
