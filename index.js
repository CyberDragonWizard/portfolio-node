const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');
require("dotenv").config({ path: "/.env"});

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

const contactEmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log("error");
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "briand.nester@gmail.com",
    subject: "Contact Form Message",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "failed" });
    } else {
      res.json({ status: "sent" });
    }
  });
});
