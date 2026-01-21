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
