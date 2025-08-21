import Mailjet from "node-mailjet";

const mailjetClient = Mailjet.apiConnect(
  process.env.MAILJET_API_PUBLIC_KEY!,
  process.env.MAILJET_API_PRIVATE_KEY!
);

export async function sendEmail(email: string, name: string, token: string) {
  try {
    const subject = `Password Reset Request for ${name}`;
    const textPart = `Hi ${name},\n\nWe received a request to reset your password.\n\nVisit this link to reset your password: ${process.env.NEXTAUTH_URL}/resetpassword?token=${token}`;

    const htmlPart = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; color: #333;">
        <h2 style="color: #0070f3;">Hi ${name}, 👋</h2>
        <p>We received a request to reset your password for your <strong>Tour App</strong> account.</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${process.env.NEXTAUTH_URL}/resetpassword?token=${token}" 
             style="background-color: #0070f3; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
             Reset your password
          </a>
        </div>
        
        <p>If the button doesn’t work, you can also reset your password by copying and pasting this link into your browser:</p>
        <code style="word-break: break-all; display: block; background: #eee; padding: 10px; border-radius: 6px;">
          ${process.env.NEXTAUTH_URL}/resetpassword?token=${token}
        </code>

        <p style="margin-top: 40px;">If you didn’t request a password reset, you can safely ignore this email.</p>
        <p><strong>– The Dev Team</strong></p>
      </div>
    `;

    const requestMail = mailjetClient
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "tour@timilsinaprashant.com.np",
              Name: "Tours Webapp",
            },
            To: [{ Email: email, Name: name }],
            Subject: subject,
            TextPart: textPart,
            HTMLPart: htmlPart,
          },
        ],
      });

    const result = await requestMail;
    return result.body;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}
