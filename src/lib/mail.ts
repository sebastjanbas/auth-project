import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onbording@resend.dev",
    to: email,
    subject: "Two-factor authentication code",
    html: `
            <h1>Two-factor authentication code</h1>
            <p>Your two-factor authentication code is: <strong>${token}</strong></p>
        `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  // change in production
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `
            <h1>Verify your email</h1>
            <p>Click the link below to verify your email address.</p>
            <a href="${confirmLink}">Verify your email</a>
        `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
            <h1>Reset your password</h1>
            <p>Click the link below to reset your password.</p>
            <a href="${resetLink}">Reset your password</a>
        `,
  });
};
