import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/prisma";
import { getTokenFromRequest } from "@/shared/api/get-token";

export async function GET(req: Request) {
  try {
    const decoded = getTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { role: true },
    });

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: { select: { orders: true } },
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Admin Users API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
