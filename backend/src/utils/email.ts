import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmail = async (option: {
  email: string;
  subject: string;
  message: string;
}) => {
  console.log(1);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  } as SMTPTransport.Options);
  console.log(2);
  const emailOptions = {
    from: "MyStickers support<support@mystickers.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  console.log(3);
  await transporter.sendMail(emailOptions);
};
