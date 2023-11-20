const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

module.exports.sendConfirmationEmail = async (
  name,
  email,
  confirmationCode,
  url
) => {
  await transporter.sendMail({
    from: "fide.edu.register@gmail.com",
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}!</h2>
          <div>
          <p>You are one step away from becoming part of the FIDE education community.</p>
          <p>This link will verify your email address. Please complete your registration by clicking on our logo below:</p>
          <a href="${url}/user/confirm/${confirmationCode}"><img src="cid:edulogo"/></a><br/>
          <a href="${url}/user/confirm/${confirmationCode}">Click here, if the logo is missing</a>
          </div>
          <p>Best regards, FIDE Education Commission</p>`,
    attachments: [
      {
        filename: "edulogo.png",
        path: __dirname + "/../public/edulogo.png",
        cid: "edulogo",
      },
    ],
  });
};

module.exports.sendPasswordResetEmail = async (name, email, link, url) => {
  await transporter.sendMail({
    from: "fide.edu.register@gmail.com",
    to: email,
    subject: "Password Reset",
    html: `<h1>Password Reset</h1>
          <h2>Hello ${name}!</h2>
          <div>
          <p>Please set a new password by clicking on the following link</p>
          <a href="${url}${link}"> Click here</a>
          </div>`,
  });
};
