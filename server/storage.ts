import { users, type User, type InsertUser, incidencias, type Incidencia, type InsertIncidencia } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Métodos de usuarios
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Métodos de incidencias
  getIncidencias(): Promise<Incidencia[]>;
  getIncidencia(id: number): Promise<Incidencia | undefined>;
  createIncidencia(incidencia: InsertIncidencia): Promise<Incidencia>;
  updateIncidencia(id: number, data: Partial<InsertIncidencia>): Promise<Incidencia | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private incidencias: Map<number, Incidencia>;
  currentUserId: number;
  currentIncidenciaId: number;

  constructor() {
    this.users = new Map();
    this.incidencias = new Map();
    this.currentUserId = 1;
    this.currentIncidenciaId = 1;
  }

  // Métodos de usuarios
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Métodos de incidencias
  async getIncidencias(): Promise<Incidencia[]> {
    return Array.from(this.incidencias.values());
  }
  
  async getIncidencia(id: number): Promise<Incidencia | undefined> {
    return this.incidencias.get(id);
  }
  
  async createIncidencia(insertIncidencia: InsertIncidencia): Promise<Incidencia> {
    const id = this.currentIncidenciaId++;
    const createdAt = new Date();
    const incidencia: Incidencia = { 
      ...insertIncidencia, 
      id,
      createdAt
    };
    this.incidencias.set(id, incidencia);
    return incidencia;
  }
  
  async updateIncidencia(id: number, data: Partial<InsertIncidencia>): Promise<Incidencia | undefined> {
    const incidencia = this.incidencias.get(id);
    if (!incidencia) return undefined;
    
    const updatedIncidencia: Incidencia = {
      ...incidencia,
      ...data
    };
    
    this.incidencias.set(id, updatedIncidencia);
    return updatedIncidencia;
  }
}

export const storage = new MemStorage();
