import { NextResponse } from "next/server";
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { createHash } from "crypto";

import { sendMail } from "@/shared/lib/mail/mailer";
import { verifyEmailTemplate } from "@/shared/lib/mail/templates/verify-email";
import prisma from "@/shared/lib/prisma/prisma";
import { getUrl } from "@/shared/server-actions/get-url";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const existedUser = await prisma.user.findUnique({ where: { email } });
    if (existedUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const token = uuidv4();
    const hashedPassword = await argon2.hash(password);
    const hashedToken = createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.create({
      data: {
        email,
        name: email.split("@")[0],
        password: hashedPassword,
        isVerified: false,
        verificationToken: {
          create: {
            token: hashedToken,
            expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
          },
        },
      },
    });

    const url = await getUrl();

    const verifyUrl = `${url}/auth/verify?token=${hashedToken}`;
    await sendMail({
      to: email,
      subject: "Verify your email — Carryme",
      html: verifyEmailTemplate({
        name: user.name,
        verifyUrl,
      }),
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
