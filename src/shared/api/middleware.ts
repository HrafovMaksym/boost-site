import { cookies } from "next/headers";
// import { Ratelimit, type Duration } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
import { User } from "@/entities/user/types";
import { serverFetch, ServerFetchError } from "./server-fetch";

type AuthHandler = (req: Request, user: User) => Promise<Response>;

export function withAuth(handler: AuthHandler) {
  return async (req: Request): Promise<Response> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const user = await serverFetch<User>("/auth/me");
      return handler(req, user);
    } catch (err) {
      if (err instanceof ServerFetchError && err.status === 401) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  };
}

// const redis = Redis.fromEnv();

// const limiters = new Map<string, Ratelimit>();

// function getLimiter(max: number, window: Duration): Ratelimit {
//   const key = `${max}:${window}`;
//   let limiter = limiters.get(key);
//   if (!limiter) {
//     limiter = new Ratelimit({
//       redis,
//       limiter: Ratelimit.slidingWindow(max, window),
//       prefix: "@carryme/ratelimit",
//     });
//     limiters.set(key, limiter);
//   }
//   return limiter;
// }

// function getClientIp(req: Request): string {
//   const forwarded = req.headers.get("x-forwarded-for");
//   if (forwarded) return forwarded.split(",")[0].trim();
//   return "unknown";
// }

// type RouteHandler = (req: Request) => Promise<Response>;

// interface RateLimitOptions {
//   max?: number; // макс. запросов за окно (по умолчанию 30)
//   window?: Duration; // окно: "1m", "10s", "1h" (по умолчанию "1m")
// }

// export function withRateLimit(
//   handler: RouteHandler,
//   options: RateLimitOptions = {},
// ): RouteHandler {
//   const { max = 30, window = "1m" } = options;
//   const limiter = getLimiter(max, window);

//   return async (req: Request): Promise<Response> => {
//     const ip = getClientIp(req);
//     const identifier = `${ip}:${new URL(req.url).pathname}`;

//     const { success, reset } = await limiter.limit(identifier);

//     if (!success) {
//       const retryAfter = Math.ceil((reset - Date.now()) / 1000);
//       return Response.json(
//         { error: "Too many requests" },
//         {
//           status: 429,
//           headers: { "Retry-After": String(retryAfter) },
//         },
//       );
//     }

//     return handler(req);
//   };
// }
