import { memo } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface DiscoverMoreProps {
  onClick: () => void;
}

export const DiscoverMore = memo(function DiscoverMore({ onClick }: DiscoverMoreProps) {
  return (
    <div className="flex flex-col items-center mt-8 mb-4 cursor-pointer" onClick={onClick}>
      <motion.div
        className="text-gold-gradient gold-gradient-text font-medium flex flex-col items-center"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="mb-2">Descubre más</span>
        <ChevronDown className="stroke-current gold-gradient-text" size={24} />
      </motion.div>
    </div>
  );
});