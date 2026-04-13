// import { withAuth, withRateLimit } from "@/shared/api";
// import { getOrders, createOrder } from "@/entities/order/api";

// // GET /api/orders — получить заказы текущего пользователя
// export const GET = withRateLimit(
//   withAuth(async (_req, user) => {
//     const orders = await getOrders(user);
//     return Response.json(orders);
//   }),
//   { max: 30, window: "1m" },
// );

// // POST /api/orders — создать заказ
// export const POST = withRateLimit(
//   withAuth(async (req, user) => {
//     const body = await req.json();
//     const order = await createOrder(body, user);
//     return Response.json(order, { status: 201 });
//   }),
//   { max: 10, window: "1m" },
// );
