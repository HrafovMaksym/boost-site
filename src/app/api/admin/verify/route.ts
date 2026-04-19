import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/prisma";
import { getTokenFromRequest } from "@/shared/api/get-token";

export async function GET(req: Request) {
  const decoded = getTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json(null, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.sub },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json({ isAdmin: true });
}
