import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertIncidenciaSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Ruta para obtener todas las incidencias
  app.get('/api/incidencias', async (req: Request, res: Response) => {
    try {
      const incidencias = await storage.getIncidencias();
      res.json(incidencias);
    } catch (error) {
      console.error('Error al obtener incidencias:', error);
      res.status(500).json({ message: 'Error al obtener incidencias' });
    }
  });

  // Ruta para obtener una incidencia por ID
  app.get('/api/incidencias/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID de incidencia inválido' });
      }

      const incidencia = await storage.getIncidencia(id);
      if (!incidencia) {
        return res.status(404).json({ message: 'Incidencia no encontrada' });
      }

      res.json(incidencia);
    } catch (error) {
      console.error('Error al obtener incidencia:', error);
      res.status(500).json({ message: 'Error al obtener incidencia' });
    }
  });

  // Ruta para crear una nueva incidencia
  app.post('/api/incidencias', async (req: Request, res: Response) => {
    try {
      // Validar datos con Zod
      const validatedData = insertIncidenciaSchema.parse(req.body);
      
      // Crear la incidencia
      const nuevaIncidencia = await storage.createIncidencia(validatedData);
      
      res.status(201).json(nuevaIncidencia);
    } catch (error) {
      console.error('Error al crear incidencia:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Datos de incidencia inválidos',
          errors: error.errors 
        });
      }
      res.status(500).json({ message: 'Error al crear incidencia' });
    }
  });

  // Ruta para actualizar el estado de una incidencia
  app.patch('/api/incidencias/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID de incidencia inválido' });
      }

      // Validar que la incidencia existe
      const incidencia = await storage.getIncidencia(id);
      if (!incidencia) {
        return res.status(404).json({ message: 'Incidencia no encontrada' });
      }

      // Actualizar la incidencia
      const updatedIncidencia = await storage.updateIncidencia(id, req.body);
      res.json(updatedIncidencia);
    } catch (error) {
      console.error('Error al actualizar incidencia:', error);
      res.status(500).json({ message: 'Error al actualizar incidencia' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
