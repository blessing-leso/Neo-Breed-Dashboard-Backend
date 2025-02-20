import nodemailer from "nodemailer";
import 'dotenv/config';

const sendEmail = async (email, subject, message) => {
  //(1) create Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //(2) Define the email Options
  const mailOptions = {
    from: `Tlhogi <${process.env.MY_EMAIL}>`,
    to: email,
    subject: subject,
    text: message,
  };

  //Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
