/**
 * Componente BackgroundPaths
 * 
 * Este componente genera y anima un conjunto de caminos SVG que flotan
 * en el fondo, creando un efecto visual dinámico para la sección hero.
 * 
 * Características principales:
 * - Generación procedural de caminos SVG con diferentes propiedades
 * - Animación suave y continua de los caminos usando framer-motion
 * - Optimización de rendimiento mediante memo y useMemo
 * - Creación de efecto visual de profundidad mediante capas
 * - Transiciones suaves para mejorar la experiencia visual
 */

import { memo, useMemo } from "react";
import { motion } from "framer-motion";

// Componente optimizado con memo
const FloatingPaths = memo(function FloatingPaths({ position }: { position: number }) {
    // Reducimos el número de caminos para mejor rendimiento
    // y usamos useMemo para evitar recálculos innecesarios
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
            width: 0.5 + i * 0.03,
            // Cada camino tiene una duración ligeramente diferente para evitar sincronización
            duration: 20 + Math.random() * 10,
        }));
    }, [position]);

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="url(#goldGradient)"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.01}
                        initial={{ pathLength: 0.3, opacity: 0.2 }}
                        animate={{
                            pathLength: 1,
                            opacity: 0.2,
                            pathOffset: [0, 1],
                        }}
                        transition={{
                            duration: path.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
                {/* Definimos un gradiente dorado para aplicarlo a los trazos */}
                <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F7DE79" />
                        <stop offset="50%" stopColor="#F5A623" />
                        <stop offset="100%" stopColor="#E8A826" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
});

// Componente principal optimizado con memo
export const BackgroundPaths = memo(function BackgroundPaths() {
    return (
        <motion.div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        >
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </motion.div>
    );
});