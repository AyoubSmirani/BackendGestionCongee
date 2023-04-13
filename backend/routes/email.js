const express = require("express");
const email = require("../Controllers/email_controller");
const router = express.Router();

router.post('/send-email', async (req, res) => {
    const to = req.body.to;
    const subject = req.body.subject;
    const body = req.body.body;
  
    const result = await email.sendEmail(to, subject, body);
    if (result) {
      res.status(200).send('Email sent successfully.');
    } else {
      res.status(500).send('Error sending email.');
    }
  });


module.exports = router
