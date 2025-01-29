// Import necessary packages
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure this is at the top to load environment variables

// Set up the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can replace this with another service if needed
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
});

// Set up the email options
const mailOptions = {
  from: process.env.EMAIL_USER, // Your email
  to: process.env.EMAIL_RECEIVER, // Recipient's email (can be your own for testing)
  subject: 'Test Email from Nodemailer', // Subject of the email
  text: 'This is a test email sent from Nodemailer.', // Email content (plain text)
};

// Send the test email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
