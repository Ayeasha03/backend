const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to parse URL-encoded data (e.g., from HTML forms)
app.use(express.urlencoded({ extended: true }));
