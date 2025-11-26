import VerificationEmail from "./VerificationEmail";
import React from "react";

interface EmailParams {
  name: string;
  verifyCode: string;
}

export const getVerificationEmailHtml =async ({name,verifyCode}:EmailParams): Promise<React.ReactNode> => {
  return <VerificationEmail username={name} otp={verifyCode} />;
};
