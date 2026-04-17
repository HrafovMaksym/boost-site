export type UserRole = "USER" | "ADMIN";

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
};
