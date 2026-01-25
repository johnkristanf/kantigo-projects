export type ProjectStatus = "IN_PROGRESS" | "PENDING" | "COMPLETED";

export type Project = {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  start_date: string;
  end_date: string;
};

export const defaultProjectFormValues: Partial<Project> = {
  name: "",
  description: "",
  start_date: "",
  end_date: "",
};


export type Task = {
  id: number;
  name: string;
  start_date: string;     
  end_date: string;       
  status: number;
  project_id: number;
  weight_id: number;
  assignee_id: number;
  created_at: string;     
  updated_at: string;     
};

export type AssignTeamsToProject = {
  projectId: number;
  teamIds: number[];
};



export enum TaskStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}
