import nodemailer from "nodemailer";

export const kirimEmail = (dataEmail) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: "faragi691@gmail.com", // generated ethereal user
      pass: "gneaocldknggfyvh", // generated ethereal password
    },
  });
  return transporter.sendMail(dataEmail);
  // .then((info) => console.log(`email terkirim: ${info}`))
  // .catch((err) => console.log(`terjadi kesalahan: ${err}`));
};
