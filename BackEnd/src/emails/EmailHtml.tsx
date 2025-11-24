import React from "react";
import { render } from "@react-email/render";
import VerificationEmail from "./VerificationEmail";

interface EmailParams {
  name: string;
  verifyCode: string;
}

export const getVerificationEmailHtml =async ({name,verifyCode}:EmailParams): Promise<string> => {
  const html =await render(
    <VerificationEmail username={name} otp={verifyCode} />
  );
  return html;
};
