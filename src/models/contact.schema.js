const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Path `name` is required.'],
      minlength: [4, "Too short to be considered a name. Make it at least 4 characters."],
    },
    email: {
      type: String,
      required: [true, 'Enter an email.'],
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address.'],
    },
    message: {
      type: String,
      required: [true, 'Path `message` is required.'],
      minlength: [25, "Too short to be considered a message. Make it at least 25 characters."],
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Contact", contactSchema);
