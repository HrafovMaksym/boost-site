import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_API_URL ?? "";

function buildCookieString(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): string {
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

async function rawFetch(
  path: string,
  cookieHeader: string,
  options: RequestInit = {},
): Promise<Response> {
  return fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader,
      ...options.headers,
    },
  });
}

export async function serverFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = buildCookieString(cookieStore);

  let res = await rawFetch(path, cookieHeader, options);

  // При 401 пробуем обновить токен и повторить запрос
  if (res.status === 401) {
    const refreshRes = await rawFetch("/auth/refresh", cookieHeader, {
      method: "POST",
    });

    if (refreshRes.ok) {
      // Бэкенд вернул новые куки — пробрасываем их
      const updatedCookieHeader = refreshRes.headers.get("set-cookie");
      res = await rawFetch(
        path,
        updatedCookieHeader ?? cookieHeader,
        options,
      );
    }
  }

  if (!res.ok) {
    throw new ServerFetchError(res.status, await res.text());
  }

  return res.json();
}

export class ServerFetchError extends Error {
  constructor(
    public status: number,
    public body: string,
  ) {
    super(`Server fetch failed: ${status}`);
  }
}
