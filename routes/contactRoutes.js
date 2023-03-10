const express = require('express');
const router = express.Router();
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controllers/contactController');
const { verifyToken } = require('../middleware/auth');


// Contact routes
router.post('/', createContact);
router.get('/', verifyToken, getAllContacts);
router.get('/:id', verifyToken, getContactById);
router.put('/:id', verifyToken, updateContact);
router.delete('/:id', verifyToken, deleteContact);


module.exports = router;