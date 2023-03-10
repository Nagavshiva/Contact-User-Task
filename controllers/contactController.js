const bcrypt = require("bcryptjs");
const Contact = require("../models/user");
const { signToken } = require("../middleware/auth");



// Create contact
exports.createContact = async (req, res) => {

    try {
        const { firstName, lastName, middleName, DOB, email, phone, occupation, company, password } = req.body;
        // Check if contact already exists
        const existingContact = await Contact.findOne({ email });

        if (existingContact) {
            return res.status(400).json({ error: "Contact already exists" });
        }

        // hashedPassword 
       const hashedPassword = await bcrypt.hash(password,10);

        // Create new contact
        const newContact = new Contact({ firstName, lastName, middleName, DOB, email, phone, occupation, company, password:hashedPassword});

        // Save contact to database
        await newContact.save();
        const token = signToken(newContact._id);
        return res.status(200).json({ message: "Successfully created contact" ,token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find().select('-password');
      res.json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

// Get single contact
exports.getContactById = async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id).select('-password');
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

// Update contact
exports.updateContact = async (req, res) => {

    try {
        const { id } = req.params;
        const { firstName, lastName, middleName, DOB, email, phone, occupation, company, password } = req.body;
        // Check if contact exists
        const existingContact = await Contact.findById(id);
        if (!existingContact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        existingContact.firstName = firstName;
        existingContact.lastName = lastName;
        existingContact.middleName = middleName;
        existingContact.DOB = DOB;
        existingContact.email = email;
        existingContact.phone = phone;
        existingContact.occupation = occupation;
        existingContact.company = company;

        if (password) {
            // hashpassword 
            const hashpassword = await bcrypt.hash(password, 10);
            existingContact.password = hashpassword;
        }

        // Save updated contact to database
        await existingContact.save();

        res.status(200).json({ message: "Contact updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Delete contact
exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        return res.status(200).json({ message: "Contact deleted" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};



