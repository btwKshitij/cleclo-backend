const express = require('express');
const adminController = require('../controllers/adminController');
const settlementController = require('../controllers/settlementController');

const router = express.Router();

// Middleware to check admin role should go here (omitted for MVP speed)
// TODO: Add auth middleware to verify admin role

// ============================================
// DASHBOARD
// ============================================
router.get('/dashboard/stats', adminController.getDashboardStats);

// ============================================
// USER MANAGEMENT
// ============================================
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.patch('/users/:id/block', adminController.blockUser);
router.get('/users/:id/addresses', adminController.getUserAddresses);

// ============================================
// WALLET MANAGEMENT
// ============================================
router.get('/users/:id/wallet', adminController.getUserWallet);
router.post('/users/:id/wallet', adminController.adjustWallet);

// ============================================
// VENDOR MANAGEMENT
// ============================================
router.get('/vendors', adminController.getAllVendors);
router.get('/vendors/pending', adminController.getPendingVendors);
router.put('/vendors/:id', adminController.updateVendor);
router.patch('/vendors/:vendorId/approve', adminController.approveVendor);
router.patch('/vendors/:id/suspend', adminController.suspendVendor);
router.get('/vendors/:id/payouts', adminController.getVendorPayouts);

// ============================================
// SETTLEMENTS / FINANCE
// ============================================
router.get('/settlements', settlementController.getAllSettlements);
router.get('/settlements/stats', settlementController.getSettlementStats);
router.post('/settlements', settlementController.createSettlement);
router.patch('/settlements/:id/paid', settlementController.markSettlementPaid);

module.exports = router;
