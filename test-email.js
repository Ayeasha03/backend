const nodemailer = require('nodemailer');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


const mailOptions = {
  from: process.env.EMAIL_USER, 
  to: process.env.EMAIL_RECEIVER, 
  subject: 'Test Email from Nodemailer', 
  text: 'This is a test email sent from Nodemailer.', 
};


transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
