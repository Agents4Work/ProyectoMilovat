import { memo } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface DiscoverMoreProps {
  onClick: () => void;
}

export const DiscoverMore = memo(function DiscoverMore({ onClick }: DiscoverMoreProps) {
  return (
    <motion.div 
      className="flex flex-col items-center mt-8 mb-4 cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative group">
        <div className="gold-gradient-text font-medium flex flex-col items-center">
          <motion.span 
            className="mb-2"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            Descubre más
          </motion.span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            <ChevronDown className="stroke-[#F5A623]" size={24} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});