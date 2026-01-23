export type Role = {
  id: number;
  tag: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Position = {
  id: number;
  tag: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  created_at: string;
  updated_at: string;
};

// Merge type using declaration merging pattern
export interface UserWithRolesPositions extends User {
  roles: Role[];
  positions: Position[];
}

// OmittedUser: User type with 'roles' omitted
export type OmittedUser = Omit<User, "roles">;

export type CreateUser = Omit<User, "id" | "created_at" | "updated_at"> & {
  password: string;
  positions: number[];
};

export type Postions = { 
    id: number; 
    tag: string; 
    name: string; 
    created_at: string; 
    updated_at: string 
}
