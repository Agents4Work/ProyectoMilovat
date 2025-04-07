import { memo, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Componente FloatingPaths
 * 
 * Este componente genera líneas doradas animadas que flotan en el fondo.
 * Se utiliza para crear un efecto visual elegante y dinámico.
 * 
 * @param position - Posición relativa de las líneas en pantalla
 */
const FloatingPaths = memo(function FloatingPaths({ position }: { position: number }) {
    // Reducimos el número de trazos para mejorar el rendimiento
    // y usamos useMemo para evitar recálculos innecesarios
    const paths = useMemo(() => {
        // Reducimos a solo 12 trazos para disminuir la carga de renderizado
        return Array.from({ length: 12 }, (_, i) => ({
            id: i,
            d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
                380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
                152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
                684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
            // Mejoramos la visibilidad pero reducimos la sobrecarga de renderizado
            strokeOpacity: 0.1 + i * 0.01,
            width: 0.3 + i * 0.02,
            // Agregamos un retraso más largo para cada trayecto
            delay: i * 0.3,
            // Duración base más larga para cada trayecto
            duration: 30 + (i % 3) * 5,
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
                        strokeOpacity={path.strokeOpacity}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: 0.3,
                            pathOffset: [0, 1],
                        }}
                        transition={{
                            duration: path.duration,
                            delay: path.delay,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            // Eliminamos la animación de opacidad para reducir el parpadeo
                        }}
                    />
                ))}
                {/* Definimos un gradiente dorado para aplicarlo a los trazos */}
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

/**
 * Componente BackgroundPaths
 * 
 * Este componente crea un fondo animado con trazos dorados que se mueven lentamente.
 * Se utiliza en la página principal para crear un ambiente visualmente atractivo.
 */
export const BackgroundPaths = memo(function BackgroundPaths() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
});
