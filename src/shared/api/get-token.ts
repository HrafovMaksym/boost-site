import { verify } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
  email: string;
}

export function getTokenFromRequest(req: Request): TokenPayload | null {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookieHeader
      .split("; ")
      .filter(Boolean)
      .map((c) => {
        const [key, ...rest] = c.split("=");
        return [key, rest.join("=")];
      }),
  );
  const accessToken = cookies["access_token"];

  if (!accessToken) return null;

  try {
    return verify(accessToken, process.env.JWT_SECRET!) as TokenPayload;
  } catch {
    return null;
  }
}
