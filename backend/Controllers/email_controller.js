const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ayoubsmirani9@gmail.com',
        pass: 'tjlmarhayfbijzzf'
      }
    });

    const mailOptions = {
      from: 'ayoub',
      to: to,
      subject: subject,
      html: body
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', result.messageId);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
module.exports = {sendEmail}