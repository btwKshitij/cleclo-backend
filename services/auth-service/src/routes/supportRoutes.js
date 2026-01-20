const express = require('express');
const supportController = require('../controllers/supportController');

const router = express.Router();

// User/Vendor routes
router.post('/', supportController.createTicket);
router.get('/my-tickets', supportController.getUserTickets); // Pass ?role=vendor for vendor view

// Admin routes
router.get('/admin/all', supportController.getAdminTickets);
router.patch('/:id/status', supportController.updateTicketStatus);

module.exports = router;
