"use server";

import { sendMail } from "@/shared/server-actions/mail/mailer";
import { getContactEmailHtml } from "@/shared/server-actions/mail/templates/contact-email";
import { ContactFormData } from "./validation";

export async function sendContactEmail(data: ContactFormData) {
  try {
    const html = getContactEmailHtml({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    await sendMail({
      to: process.env.SUPPORT_EMAIL!,
      subject: `New Contact Request: ${data.subject}`,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact email error:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}
