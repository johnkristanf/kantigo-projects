import type {
  Project,
} from "~/types/projects";
import api from "./api";

export const ProjectsAPI = {
  // GET /projects
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get("/projects");
    return data;
  },

  // GET /projects/:id
  getById: async (id: number): Promise<Project> => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },

  // POST /projects
  create: async (payload: Partial<Project>): Promise<Project> => {
    const { data } = await api.post("/projects", payload);
    return data;
  },

  // PUT /projects/:id
  update: async (
    id: number,
    payload: Partial<Project>
  ): Promise<Project> => {
    const { data } = await api.put(`/projects/${id}`, payload);
    return data;
  },

  // DELETE /projects/:id
  delete: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};
