import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const protectedRoutes = ["/profile"];
const authRoutes = ["/login", "/registration"];
export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/profile/:path*", "/login", "/registration"],
};
