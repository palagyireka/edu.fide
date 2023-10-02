const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

module.exports.sendConfirmationEmail = async (
  name,
  email,
  confirmationCode
) => {
  await transporter.sendMail({
    from: "sandbox71aa6f78108a4c9fa9ae922d8f820e28.mailgun.org",
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}!</h2>
          <div>
          <p>Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/user/confirm/${confirmationCode}> Click here</a>
          </div>`,
  });
};
