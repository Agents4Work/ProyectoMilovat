import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
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

// Definición de la tabla de incidencias
export const incidencias = pgTable("incidencias", {
  id: serial("id").primaryKey(),
  titulo: text("titulo").notNull(),
  descripcion: text("descripcion").notNull(),
  fecha: text("fecha").notNull(),
  estado: text("estado").notNull(), // "Abierto", "En Proceso", "Resuelto"
  departamento: text("departamento").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema para insertar incidencias
export const insertIncidenciaSchema = createInsertSchema(incidencias).pick({
  titulo: true,
  descripcion: true,
  fecha: true,
  estado: true,
  departamento: true,
});

export type InsertIncidencia = z.infer<typeof insertIncidenciaSchema>;
export type Incidencia = typeof incidencias.$inferSelect;
