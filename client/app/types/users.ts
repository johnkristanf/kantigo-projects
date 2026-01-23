export type User = {
  id: number;
  name: string;
  username: string;
  created_at: string;
  updated_at: string;
};

// "Base" user fields above. For creation, extend/add creation-only fields:
export type CreateUser = Omit<User, "id" | "created_at" | "updated_at"> & {
  password: string;
  positions: number[]; // or number[], depending on your API/model
};

export type Postions = { 
    id: number; 
    tag: string; 
    name: string; 
    created_at: string; 
    updated_at: string 
}
