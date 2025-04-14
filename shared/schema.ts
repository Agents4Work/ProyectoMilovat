/**
 * Archivo shared/schema.ts
 * 
 * Este archivo define el esquema de datos de la aplicación utilizando Drizzle ORM.
 * Contiene las definiciones de tablas, esquemas de inserción y tipos exportados
 * que se utilizan tanto en el cliente como en el servidor.
 * 
 * Características principales:
 * - Definición de la tabla de usuarios con sus campos
 * - Esquemas de validación utilizando Zod para operaciones de inserción
 * - Tipos TypeScript derivados de los esquemas para uso en toda la aplicación
 * - Estructura compartida para mantener consistencia entre frontend y backend
 */

import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
