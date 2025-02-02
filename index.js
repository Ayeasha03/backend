const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require("dotenv")
const connectDB = require("./src/config/config");
const contactRoutes = require("./src/routes/contact.routes"); 
require('dotenv').config();


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

dotenv.config();
app.use(cors({
  origin: "https://ayeashacreations.io",
  methods: ["POST"],  
  allowedHeaders: ["Content-Type"]  
}));

app.use(bodyParser.json())

connectDB()

app.use("/api/messages", contactRoutes)


const PORT = process.env.PORT || 9000;



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


