import type { OrderStatus, UserRole } from "@/shared/lib/generated/prisma/client";

export interface AdminOrder {
  id: string;
  status: OrderStatus;
  service: string;
  currentValue: number;
  desiredValue: number;
  options: Record<string, boolean | number>;
  total: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string | null;
  completedAt: string | null;
  user: {
    name: string;
    email: string;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  steamLink: string | null;
  createdAt: string;
  _count: {
    orders: number;
  };
}
