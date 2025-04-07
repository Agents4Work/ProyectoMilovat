import { memo } from "react";
import { ChevronDown } from "lucide-react";

interface DiscoverMoreProps {
  onClick: () => void;
}

export const DiscoverMore = memo(function DiscoverMore({ onClick }: DiscoverMoreProps) {
  return (
    <div 
      className="flex flex-col items-center mt-8 mb-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="group">
        <div className="gold-highlight-text font-medium flex flex-col items-center">
          <span className="mb-2 bounce-animation">
            Descubre más
          </span>
          <div className="bounce-animation" style={{ animationDelay: "0.2s" }}>
            <ChevronDown className="stroke-[#FFB400]" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
});