const express = require('express');
const { saveMessage } = require("../controller/contact.controller");


const router = express.Router();

router.post("/", saveMessage);

module.exports = router;
