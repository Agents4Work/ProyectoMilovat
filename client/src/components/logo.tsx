import { memo } from "react";
import logoImage from "../assets/Logo-Milotav-Positivo1-2022.png";

/**
 * Componente Logo
 * 
 * Este componente muestra el logo de Milovat. Puede mostrar el logo solo o con texto.
 * 
 * @param size - Tamaño del logo (pequeño, mediano o grande)
 * @param showText - Indica si se debe mostrar el texto "Milovat" junto al logo
 * @param textColor - Color del texto (blanco o dorado)
 */
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
    sm: "h-8",
    md: "h-16",
    lg: "h-24",
  };
  
  return (
    <div className="flex flex-col items-center">
      {showText ? (
        <h1 
          className={`text-3xl font-medium milovat-text ${
            textColor === "gold" ? "gold-gradient" : "text-white"
          }`}
        >
          Milovat
        </h1>
      ) : (
        <img 
          src={logoImage} 
          alt="Logo Milovat" 
          className={`${sizes[size]} object-contain`}
        />
      )}
    </div>
  );
});

export default Logo;
