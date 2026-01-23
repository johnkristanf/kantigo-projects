import type { Team } from "~/types/teams";
import api from "./api";

export const TeamsAPI = {
  // GET /teams
  getAll: async (): Promise<Team[]> => {
    const { data } = await api.get("/teams");
    return data;
  },

  // GET /teams/:id
  getById: async (id: number): Promise<Team> => {
    const { data } = await api.get(`/teams/${id}`);
    return data;
  },

  // POST /teams
  create: async (payload: Partial<Team>): Promise<Team> => {
    const { data } = await api.post("/teams", payload);
    return data;
  },

  // PUT /teams/:id
  update: async (id: number, payload: Partial<Team>): Promise<Team> => {
    const { data } = await api.put(`/teams/${id}`, payload);
    return data;
  },

  // DELETE /teams/:id
  delete: async (id: number): Promise<void> => {
    await api.delete(`/teams/${id}`);
  },

}