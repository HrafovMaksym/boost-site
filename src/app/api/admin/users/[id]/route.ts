import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/prisma";
import { getTokenFromRequest } from "@/shared/api/get-token";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const decoded = getTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const admin = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { role: true },
    });

    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const { steamLink } = await req.json();

    const user = await prisma.user.update({
      where: { id },
      data: { steamLink: steamLink || null },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        steamLink: true,
        createdAt: true,
        _count: { select: { orders: true } },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Admin user update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
