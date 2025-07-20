import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sendInvoice = async ({ to, userName, courseName, amount }) => {
  return new Promise((resolve, reject) => {
    const invoiceDir = path.resolve(__dirname, "../invoice");

    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }
    const filePath = path.join(invoiceDir, `${userName}-${Date.now()}.pdf`);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text("Digital Pathshala - Invoice", {
      align: "center",
      underline: true,
    });
    doc.moveDown(2);

    doc.rect(50, doc.y, 500, 200).stroke();

    doc.moveDown(0.5);
    doc.fontSize(14);

    doc.text(`Name: ${userName}`, 70);
    doc.moveDown(0.5);
    doc.text(`Course: ${courseName}`, 70);
    doc.moveDown(0.5);
    doc.text(`Amount Paid: Rs ${amount}`, 70);
    doc.moveDown(0.5);
    doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, 70);
    doc.end();

    stream.on("finish", async () => {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,
          },
        });
        console.log(" PDF saved at:", filePath);
        const mailOptions = {
          from: `"Digital Pathshala" <${process.env.AUTH_EMAIL}>`,
          to,
          subject: "Receipt - Digital Pathshala",
          text: `Dear ${userName},\n\nAttached is your invoice for the course "${courseName}".`,
          attachments: [
            {
              filename: "invoice.pdf",
              path: filePath,
            },
          ],
        };

        await transporter.sendMail(mailOptions);

        // fs.unlink(filePath, () => {});
        resolve("Email sent successfully");
      } catch (error) {
        reject("Failed to send email: " + error.message);
      }
    });

    stream.on("error", (err) => {
      reject("Failed to generate PDF: " + err.message);
      console.log("Stream error:", err);
    });
  });
};

export default sendInvoice;
