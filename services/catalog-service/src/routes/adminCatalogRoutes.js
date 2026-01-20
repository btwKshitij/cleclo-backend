const express = require('express');
const adminCatalogController = require('../controllers/adminCatalogController');

const router = express.Router();

// Middleware to check admin role should go here (omitted for MVP speed)

// Services CRUD
router.get('/services', adminCatalogController.getAllServices);
router.post('/services', adminCatalogController.createService);
router.put('/services/:id', adminCatalogController.updateService);
router.delete('/services/:id', adminCatalogController.deleteService);

// Categories CRUD
router.get('/categories', adminCatalogController.getAllCategories);
router.post('/categories', adminCatalogController.createCategory);
router.put('/categories/:id', adminCatalogController.updateCategory);
router.delete('/categories/:id', adminCatalogController.deleteCategory);
router.patch('/categories/reorder', adminCatalogController.reorderCategories);

// Items CRUD
router.get('/items', adminCatalogController.getAllItems);
router.post('/items', adminCatalogController.createItem);
router.put('/items/:id', adminCatalogController.updateItem);
router.delete('/items/:id', adminCatalogController.deleteItem);

module.exports = router;
