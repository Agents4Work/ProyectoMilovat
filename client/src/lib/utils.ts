/**
 * Archivo utils.ts
 * 
 * Biblioteca de utilidades para la aplicación cliente.
 * Contiene funciones de ayuda reutilizables en toda la aplicación.
 * 
 * Características principales:
 * - Función cn() para combinar clases de Tailwind CSS
 * - Utiliza clsx para gestionar condicionales en las clases
 * - Utiliza tailwind-merge para resolver conflictos entre clases
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
