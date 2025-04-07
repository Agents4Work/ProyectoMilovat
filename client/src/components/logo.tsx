import { memo } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textColor?: "white" | "gold";
}

const Logo = memo(function Logo({ 
  size = "md",
  showText = false,
  textColor = "white" 
}: LogoProps) {
  
  const sizes = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };
  
  return (
    <div className="flex flex-col items-center">
      <svg 
        className={sizes[size]} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M50 11L90 34V67L50 90L10 67V34L50 11Z" 
          fill="#39B7CD"
        />
        <path 
          d="M50 11L90 34L50 57L10 34L50 11Z" 
          fill="#F7DE79"
        />
        <path 
          d="M50 57L90 34V67L50 90V57Z" 
          fill="#D4AF37"
        />
        <path 
          d="M50 57L10 34V67L50 90V57Z" 
          fill="#3B4095"
        />
      </svg>
      
      {showText && (
        <h1 
          className={`mt-4 text-2xl font-medium ${
            textColor === "gold" ? "gold-gradient" : "text-white"
          }`}
        >
          Milovat
        </h1>
      )}
    </div>
  );
});

export default Logo;
