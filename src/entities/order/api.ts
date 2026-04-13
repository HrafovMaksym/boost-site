// import { serverFetch } from "@/shared/api";
// import type { Order, CreateOrderDto } from "./types";
// import type { User } from "@/entities/user/types";

// export async function getOrders(user: User): Promise<Order[]> {
//   return serverFetch<Order[]>(`/orders?email=${user.email}`);
// }

// export async function createOrder(
//   dto: CreateOrderDto,
//   user: User,
// ): Promise<Order> {
//   return serverFetch<Order>("/orders", {
//     method: "POST",
//     body: JSON.stringify({ ...dto, userId: user.email }),
//   });
// }
