interface VerifyEmailProps {
  name: string;
  verifyUrl: string;
}

export function verifyEmailTemplate({ name, verifyUrl }: VerifyEmailProps) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:0;background:#080d1e;font-family:system-ui,-apple-system,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#080d1e;padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="480" cellpadding="0" cellspacing="0" style="background:#131b38;border:1px solid #1e2a4a;border-radius:20px;padding:40px;">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <h1 style="margin:0;font-size:24px;color:#f0f0f5;">Verify Your Email</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:24px;color:#9d9db5;font-size:15px;line-height:1.6;">
                    Hi ${name},<br/><br/>
                    Thanks for signing up! Please verify your email address by clicking the button below.
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <a href="${verifyUrl}" style="display:inline-block;padding:14px 32px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:12px;font-weight:600;font-size:15px;">
                      Verify Email
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#5c5c75;font-size:13px;line-height:1.5;">
                    If you didn't create an account, you can safely ignore this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
