"use server";
import { Resend } from "resend";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const response = await resend.emails.send({
    from: process.env.SUPPORT_EMAIL!,
    to,
    subject,
    html,
  });

  return response;
}
