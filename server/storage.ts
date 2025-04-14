/**
 * Archivo server/storage.ts
 * 
 * Este archivo implementa la capa de acceso a datos de la aplicación.
 * Define una interfaz de almacenamiento común y proporciona una implementación
 * en memoria para desarrollo y pruebas.
 * 
 * Características principales:
 * - Interfaz IStorage que define las operaciones CRUD disponibles
 * - Implementación MemStorage que almacena datos en memoria utilizando Maps
 * - Métodos para crear, obtener y consultar usuarios
 * - Exporta una única instancia de MemStorage para uso en toda la aplicación
 */

import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
