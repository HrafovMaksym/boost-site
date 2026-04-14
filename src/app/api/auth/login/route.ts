import { withRateLimit } from "@/shared/api/middleware";

const BACKEND_URL = process.env.BACKEND_API_URL;

async function loginHandler(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(data, { status: response.status });
    }

    const res = Response.json(data, { status: response.status });

    const setCookies = response.headers.getSetCookie();
    setCookies.forEach((cookie) => {
      res.headers.append("set-cookie", cookie);
    });

    return res;
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Ограничиваем: 5 попыток в минуту
export const POST = withRateLimit(loginHandler, { max: 5, window: "1m" });
