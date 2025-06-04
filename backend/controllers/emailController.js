const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GOOGLE_APP_PASSCODE,
  },
});

const sendResetPasswordEmail = async (to, resetLink) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: "Reset Your Password",
    html: `
      <p>You requested a password reset.</p>
      <p>Click this link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetPasswordEmail;
