import type { Team } from "~/types/teams";
import api from "./api";

export const TeamsAPI = {
  getAll: async (): Promise<Team[]> => {
    const { data } = await api.get("/teams");
    return data;
  },

  getTeamsUnderProject: async (project_id: number): Promise<Team[]> => {
    const { data } = await api.get(`/teams/project/${project_id}`);
    console.log("data 123: ", data);
    
    return data;
  },

  getById: async (id: number): Promise<Team> => {
    const { data } = await api.get(`/teams/${id}`);
    return data;
  },

  create: async (payload: Partial<Team>): Promise<Team> => {
    const { data } = await api.post("/teams", payload);
    return data;
  },

  update: async (id: number, payload: Partial<Team>): Promise<Team> => {
    const { data } = await api.put(`/teams/${id}`, payload);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/teams/${id}`);
  },

}