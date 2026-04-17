interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const getContactEmailHtml = ({ name, email, subject, message }: ContactEmailProps) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Message</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            margin: 0;
            padding: 0;
            background-color: #f4f7f9;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          }
          .header {
            background: linear-gradient(135deg, #7c3aed, #06b6d4);
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
          }
          .content {
            padding: 30px;
          }
          .field {
            margin-bottom: 20px;
          }
          .label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #7c3aed;
            font-weight: 700;
            margin-bottom: 5px;
          }
          .value {
            font-size: 16px;
            color: #333;
            background: #f9fafb;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
          }
          .message-box {
            white-space: pre-wrap;
          }
          .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Message from CarryMe</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From</div>
              <div class="value">${name} (${email})</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            Sent via CarryMe Contact Form • ${new Date().toLocaleString()}
          </div>
        </div>
      </body>
    </html>
  `;
};
