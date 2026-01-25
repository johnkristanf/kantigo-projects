import type { AddTeamMembers, CreateUser, Postions, User, UserWithPositions } from "~/types/users";
import api from "./api";
import type { Team } from "~/types/teams";

export const UsersAPI = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get("/users");
    return data;
  },

  getAllPositions: async (): Promise<Postions[]> => {
    const { data } = await api.get("/users/positions");
    return data;
  },

  getAllMembers: async (): Promise<UserWithPositions[]> => {
    const { data } = await api.get("/users/all/members");
    return data;
  },

  getMembersWithinTeam: async (teamId: number): Promise<UserWithPositions[]> => {
    const { data } = await api.get(`/users/members/${teamId}`);
    return data;
  },

  create: async (payload: CreateUser) => {
    const { data } = await api.post("/users", payload);
    return data;
  },

  addTeamMembers: async (payload: AddTeamMembers): Promise<Team> => {
    const { data } = await api.post("/teams/add/members", payload);
    return data;
  },


}