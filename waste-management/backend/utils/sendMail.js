const nodemailer = require("nodemailer");

const sendMail = (otp, email) => {
  try {
    const transport = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password OTP",
      html: `<div>Hello user,
       Your One Time Password is ${otp}</div>`,
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error("Failed to send email");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = sendMail;
