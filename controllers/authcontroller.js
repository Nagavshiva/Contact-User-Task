const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Contact = require('../models/user');
const {signToken} = require("../middleware/auth")


// login

exports.login = async (req, res) => {

  try {
      // Destructure email and password from the request body
      const { email, password } = req.body;

      // Log the password for debugging purposes
      console.log(password)

      // Find a Contact document with the matching email
      const contact = await Contact.findOne({ email });

      // If there's no matching Contact document, return a 400 response
      if (!contact) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare the input password with the hashed password in the Contact document
      const passwordMatch = await bcrypt.compare(password, contact.password);

      // If the passwords don't match, return a 400 response
      if (!passwordMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // If the passwords match, create a JWT token and send it in the response
      const token = signToken(contact._id)
      res.json({ message: 'Login successful', token });

  } catch (error) {
      // If there's an error, log it and return a 500 response
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
  }
}
