import { memo, useMemo } from "react";
import { motion } from "framer-motion";

// Optimized component with memo
const FloatingPaths = memo(function FloatingPaths({ position }: { position: number }) {
    // Reduce the number of paths for better performance
    // and use useMemo to avoid unnecessary recalculations
    const paths = useMemo(() => {
        return Array.from({ length: 24 }, (_, i) => ({
            id: i,
            d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
                380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
                152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
                684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
            // Improve visibility while reducing rendering overhead
            strokeOpacity: 0.15 + i * 0.01,
            width: 0.3 + i * 0.02,
            // Add custom delay for each path
            delay: i * 0.15,
            // Base duration for each path
            duration: 15 + (i % 5) * 4,
        }));
    }, [position]);

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
                style={{ willChange: 'transform' }}
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="url(#goldGradient)"
                        strokeWidth={path.width}
                        strokeOpacity={path.strokeOpacity}
                        initial={{ pathLength: 0.1, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.2, 0.5, 0.2],
                            pathOffset: [0, 1],
                        }}
                        transition={{
                            duration: path.duration,
                            delay: path.delay,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            opacity: {
                                duration: path.duration / 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }
                        }}
                        style={{ 
                            willChange: 'opacity, stroke-dashoffset',
                            paintOrder: 'stroke'
                        }}
                    />
                ))}
                {/* Gold gradient for the strokes */}
                <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F7DE79" />
                        <stop offset="50%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#F7DE79" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
});

// Main component
export const BackgroundPaths = memo(function BackgroundPaths() {
    return (
        <motion.div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </motion.div>
    );
});
