import type { CreateUser, Postions, User, UserWithRolesPositions } from "~/types/users";
import api from "./api";

export const UsersAPI = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get("/users");
    return data;
  },

  getAllPositions: async (): Promise<Postions[]> => {
    const { data } = await api.get("/users/positions");
    return data;
  },

  getAllMembers: async (): Promise<UserWithRolesPositions[]> => {
    const { data } = await api.get("/users/members");
    return data;
  },

  create: async (user: CreateUser) => {
    const { data } = await api.post("/users", user);
    return data;
  },

}