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
  start_date: string;      // ISO string representing timestamp
  end_date: string;        // ISO string representing timestamp
  status: number;
  project_id: number;
  weight_id: number;
  assignee_id: number;
  created_at: string;      // ISO string representing timestamp
  updated_at: string;      // ISO string representing timestamp
};


export enum TaskStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}
