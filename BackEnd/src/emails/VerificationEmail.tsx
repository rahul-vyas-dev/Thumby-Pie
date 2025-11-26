import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Img,
  Container,
} from "@react-email/components";

import * as React from "react";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({
  username,
  otp,
}) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Your Verification Code</title>

        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      {/* This appears as the email preview in Gmail */}
      <Preview>Your verification code is {otp}</Preview>

      <Container
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #e5e5e5",
          fontFamily: "Roboto, Verdana, sans-serif",
          maxWidth: "550px",
          margin: "0 auto",
        }}
      >
        {/* Banner Image */}
        <Img
          src="https://res.cloudinary.com/dyorxt0jx/image/upload/v1764182848/Gemini_Generated_Image_a4tczja4tczja4tc_mvch8z.png"
          alt="Welcome Banner"
          width="100%"
          style={{
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />

        <Section>
          <Heading
            as="h2"
            style={{
              fontSize: "22px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Welcome, {username}! 👋
          </Heading>

          <Text style={{ fontSize: "15px", marginBottom: "12px" }}>
            Thanks for signing up. To complete your registration, please use the
            verification code below:
          </Text>

          {/* OTP Highlight box */}
          <Section
            style={{
              backgroundColor: "#f5f5f5",
              padding: "14px 20px",
              borderRadius: "6px",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            <Text
              style={{
                fontSize: "28px",
                fontWeight: "700",
                letterSpacing: "6px",
                color: "#000",
              }}
            >
              {otp}
            </Text>
          </Section>

          <Text style={{ fontSize: "14px", marginBottom: "20px" }}>
            This code is valid for a limited time. If you did not request this
            code, please ignore this email.
          </Text>

          <Text style={{ fontSize: "13px", color: "#444" }}>
            Thanks,
            <br />
            The ThumbyPie Team
          </Text>
        </Section>
      </Container>
    </Html>
  );
};

export default VerificationEmail;
