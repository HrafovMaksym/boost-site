import { withRateLimit } from "@/shared/api/middleware";

const BACKEND_URL = process.env.BACKEND_API_URL;

async function registerHandler(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(data, { status: response.status });
    }

    const res = Response.json(data, { status: response.status });

    // Пробрасываем все куки от бэкенда (access_token, refresh_token и т.д.)
    const setCookies = response.headers.getSetCookie();
    setCookies.forEach((cookie) => {
      res.headers.append("set-cookie", cookie);
    });

    return res;
  } catch (error) {
    console.error("Registration Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Ограничиваем регистрацию: 3 аккаунта в час с одного IP
export const POST = withRateLimit(registerHandler, { max: 3, window: "1h" });
