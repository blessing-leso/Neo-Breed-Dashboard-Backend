import nodemailer from "nodemailer";
import htmlText from "html-text";

export class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.split(" ")[0];
    this.url = url;
    this.from = `Fhatuwani Mulaudzi <${process.env.EMAIL_FROM}`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return 1;
    }

    return (nodemailer.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    }));
  }

  async send(template, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlText,
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "welcome to neo breed family");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for 10 min)"
    );
  }
}
