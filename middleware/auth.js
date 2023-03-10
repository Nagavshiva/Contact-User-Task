const jwt = require("jsonwebtoken");
const Contact = require("../models/user");

// verifyToken

const verifyToken = async (req, res, next) => {

    try {
        // Get the authorization header and extract the token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error("Access token not found");

        // Verify the token using the JWT_TOKEN key
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)

        // Find the user associated with the decoded token's id
        const user = await Contact.findById(decoded.id);
        if (!user) throw new Error("User not found");

        // Attach the user object to the request object for further use
        req.user = user;
        next();
    } catch (error) {
        // If any error occurs, send a 401 Unauthorized response with an error message
        res.status(401).json({ message: error.message });
    }
}


// signToken

const signToken = (id) => {
    const token =  jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRE });
    return token;
}


module.exports = { verifyToken, signToken };