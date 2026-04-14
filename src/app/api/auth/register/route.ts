import { NextResponse } from "next/server";
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { createHash } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Проверяем, существует ли пользователь
    // const existedUser = await prisma.user.findUnique({ where: { email } });
    const existedUser = null; // Заглушка, пока не подключена БД

    if (existedUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    // 2. Генерируем токены и хешируем пароль
    const token = uuidv4();
    const hashedPassword = await argon2.hash(password);
    const hashedToken = createHash("sha256").update(token).digest("hex");

    // 3. Создаем пользователя в БД
    /*
    await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        verificationToken: hashedToken,
        verificationTokenExpiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
        isEmailVerified: false,
        locale,
        theme,
      },
    });
    */

    // 4. Отправляем Email (нужно реализовать сервис отправки)
    console.log(
      `Sending verification email to ${email} with token ${hashedToken}`,
    );
    // await sendVerificationEmail(email, hashedToken, locale);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
