import { api } from "@/shared/config/axios-config";
import { Order } from "@/shared/lib/generated/prisma/client";
import { AxiosResponse } from "axios";

export const orderApi = {
  getOrders: (): Promise<AxiosResponse<Order[]>> =>
    api.get<Order[]>("orders", {
      withCredentials: true,
    }),
};
