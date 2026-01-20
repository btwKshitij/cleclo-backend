const express = require('express');
const vendorOrderController = require('../controllers/vendorOrderController');

const router = express.Router();

// Middleware to check vendor role should go here (omitted for MVP speed)

// Dashboard stats
router.get('/stats', vendorOrderController.getVendorStats);

// Orders
router.get('/', vendorOrderController.getVendorOrders);
router.patch('/:id/status', vendorOrderController.updateOrderProgress);
router.patch('/:id/accept', vendorOrderController.acceptOrder);
router.patch('/:id/ready', vendorOrderController.markReadyForDelivery);

module.exports = router;
