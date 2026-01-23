import type { Task } from "~/types/projects";
import api from "./api";

export const TasksAPI = {
  // GET /tasks
  getAll: async (): Promise<Task[]> => {
    const { data } = await api.get("/tasks");
    return data;
  },

  getAllWeights: async (): Promise<Task[]> => {
    const { data } = await api.get("/tasks/weights");
    return data;
  },

  getAllPriorities: async (): Promise<Task[]> => {
    const { data } = await api.get("/tasks/priorities");
    return data;
  },


  // GET /tasks/:id
  getById: async (id: number): Promise<Task> => {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  },

  // POST /tasks
  create: async (payload: Partial<Task>): Promise<Task> => {
    const { data } = await api.post("/tasks", payload);
    return data;
  },

  // PUT /tasks/:id
  update: async (
    id: number,
    payload: Partial<Task>
  ): Promise<Task> => {
    const { data } = await api.put(`/tasks/${id}`, payload);
    return data;
  },

  // DELETE /tasks/:id
  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};