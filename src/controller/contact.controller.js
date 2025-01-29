const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Message = require('../models/contact.schema');
const mongoose = require('mongoose');
require('dotenv').config();  // To load environment variables

// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Use the environment variable for Gmail user
        pass: process.env.EMAIL_PASS,  // Use the environment variable for the app password
    },
    tls: {
        rejectUnauthorized: false,  // Useful for bypassing some SSL issues
    },
    port: 587,
    secure: false, 
});

// Verify SMTP connection
transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP Connection Error: ", error);
    } else {
        console.log("SMTP Server is ready to send messages.");
    }
});

// Save the message and send email
const saveMessage = async (req, res) => {
    try {
        // Destructure fields from the request body
        const { name, email, message } = req.body;

        // Input validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Save the message to the database
        const newMessage = new Message({
            name,
            email,
            message,
        });
        await newMessage.save();

        // Mail options for sending the email
        const mailOptions = {
            from: email,  // Set the "from" address to the user's email
            to: process.env.EMAIL_RECEIVER,  // Use environment variable for receiver email
            subject: `New message from ${name}`,  // Subject: New message from the user's name
            text: `You have received a new message from ${name} (${email}):\n\n${message}`,  // Body of the email
        };

        // Send the email using nodemailer
        await transporter.sendMail(mailOptions);

        // Send success response
        res.status(200).json({ message: "Message sent successfully!" });

    } catch (error) {
        // Catch any error during the process
        console.error("Error sending message: ", error);
        res.status(500).json({ message: "Failed to send message", error: error.message });
    }
}

module.exports = { saveMessage, transporter };
