import type {
  AssignTeamsToProject,
  Project,
} from "~/types/projects";
import api from "./api";

export const ProjectsAPI = {
  // GET /projects
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get("/projects");
    console.log("data: ", data);
    
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

  // Assign teams to a project
  assignTeams: async (payload: AssignTeamsToProject): Promise<Project> => {
    const { data } = await api.post(`/projects/assign/teams/${payload.projectId}`, {
      team_ids: payload.teamIds,
    });
    return data;
  },

  getProjectsUnderUser: async (userId: number): Promise<Project[]> => {
    const { data } = await api.get(`/projects/user/${userId}`);
    return data;
  },
};
