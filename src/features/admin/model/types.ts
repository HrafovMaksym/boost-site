import type { OrderStatus, UserRole } from "@/shared/lib/generated/prisma/client";

export interface AdminOrder {
  id: string;
  status: OrderStatus;
  service: string;
  currentValue: number;
  desiredValue: number;
  options: Record<string, boolean>;
  total: string;
  createdAt: string;
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
  createdAt: string;
  _count: {
    orders: number;
  };
}
