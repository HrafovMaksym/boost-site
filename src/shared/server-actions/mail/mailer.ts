"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
  return resend.emails.send({
    from: process.env.RESEND_FROM!,
    to,
    subject,
    html,
  });
}
