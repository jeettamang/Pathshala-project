import nodemailer from "nodemailer";
import fs from "fs";

const emailWithAttachedBill = async (to, pdfPath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });
};

const mailOptions = {
  from: `"Digital pathshala" <${process.env.AUTH_EMAIL}>`,
  to,
  subject: "Receipt - digital Pathshala",
  text: "Please check the attached receipt. Thank you!",
  attachments: [
    {
      filename: "receipt.pdf",
      path: pdfPath,
    },
  ],
};
