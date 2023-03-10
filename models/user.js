const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    DOB: { type: Date },
    email: { type: String, required: true, unique: true },
    phone: { type: String,required: true, unique: true },
    occupation: { type: String },
    company: { type: String },
    password: { type: String, required: true }
},{timestamps:true})

const Contact = mongoose.model("User", contactSchema);
module.exports = Contact;