const express = require('express');
const vendorController = require('../controllers/vendorController');

const router = express.Router();

// Middleware to check vendor role should go here (omitted for MVP speed)
// TODO: Add auth middleware to verify vendor role

// Dashboard stats
router.get('/dashboard/stats', vendorController.getDashboardStats);

// Earnings
router.get('/earnings', vendorController.getEarnings);

// Schedule
router.get('/schedule', vendorController.getSchedule);
router.put('/schedule', vendorController.updateSchedule);

// Services & Capacity
router.put('/services', vendorController.updateServices);
router.put('/capacity', vendorController.updateCapacity);

module.exports = router;
