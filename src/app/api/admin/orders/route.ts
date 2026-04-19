import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/prisma";
import { getTokenFromRequest } from "@/shared/api/get-token";

export async function GET(req: Request) {
  try {
    const decoded = getTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    // Fetch all system orders with user data
    const allOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json(allOrders, { status: 200 });
  } catch (error) {
    console.error("Admin API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
