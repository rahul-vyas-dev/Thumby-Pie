import { Resend } from "resend";
import { ApiResponse } from "../utils/ApiResponse";
import { getVerificationEmailHtml } from "../emails/EmailHtml";
import dotenv from "dotenv";
dotenv.config();

interface email {
  name: string;
  verifyCode: string;
  email: string;
}

export async function sendEmail({
  name,
  verifyCode,
  email,
}: email): Promise<ApiResponse> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: "ThumbyPie <onboarding@resend.dev>",
      to: email,
      subject: "ThumbyPie Message Verification Code",
      react:await getVerificationEmailHtml({ name, verifyCode }),
    });
    console.log(
      "email sent successfully ->(helpers :: sendVerificationEmail)",
      data
    );
    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (emailError) {
    console.error(
      "Error sending verification email ->(helpers :: sendVerificationEmail):",
      emailError
    );
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}
