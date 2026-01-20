export type ProjectStatus = "IN_PROGRESS" | "PENDING" | "COMPLETED";

export type Project = {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
};

export type ProjectFormValues = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

export const defaultProjectFormValues: ProjectFormValues = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
};
