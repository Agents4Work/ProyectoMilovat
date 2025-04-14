/**
 * Archivo server/routes.ts
 * 
 * Este archivo gestiona el registro de rutas de la API en el servidor Express.
 * Define los endpoints disponibles y crea un servidor HTTP para manejar las peticiones.
 * 
 * Características principales:
 * - Función registerRoutes que recibe la instancia de Express y registra las rutas
 * - Utiliza el módulo storage para realizar operaciones CRUD 
 * - Crea y devuelve una instancia de servidor HTTP
 * - Todas las rutas de la API deben tener el prefijo /api
 */

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
