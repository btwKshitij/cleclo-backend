const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================
// SERVICES CRUD
// ============================================

const getAllServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            include: {
                categories: {
                    orderBy: { order: 'asc' },
                    include: {
                        items: true
                    }
                }
            }
        });
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createService = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const service = await prisma.service.create({
            data: { name, slug: slug || name.toLowerCase().replace(/\s+/g, '-') }
        });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug } = req.body;
        const service = await prisma.service.update({
            where: { id },
            data: { name, slug }
        });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        // First delete all items in all categories
        await prisma.item.deleteMany({
            where: { category: { serviceId: id } }
        });
        // Then delete all categories
        await prisma.category.deleteMany({
            where: { serviceId: id }
        });
        // Finally delete service
        await prisma.service.delete({ where: { id } });
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ============================================
// CATEGORIES CRUD
// ============================================

const getAllCategories = async (req, res) => {
    try {
        const { serviceId } = req.query;
        const where = serviceId ? { serviceId } : {};
        const categories = await prisma.category.findMany({
            where,
            include: { items: true, service: true },
            orderBy: { order: 'asc' }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const { serviceId, name, order } = req.body;
        const category = await prisma.category.create({
            data: { serviceId, name, order: order || 0 }
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, order } = req.body;
        const category = await prisma.category.update({
            where: { id },
            data: { name, order }
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        // First delete all items
        await prisma.item.deleteMany({ where: { categoryId: id } });
        // Then delete category
        await prisma.category.delete({ where: { id } });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const reorderCategories = async (req, res) => {
    try {
        const { categories } = req.body; // [{id, order}, ...]
        await Promise.all(
            categories.map(c =>
                prisma.category.update({
                    where: { id: c.id },
                    data: { order: c.order }
                })
            )
        );
        res.json({ message: 'Categories reordered' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ============================================
// ITEMS CRUD
// ============================================

const getAllItems = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const where = categoryId ? { categoryId } : {};
        const items = await prisma.item.findMany({
            where,
            include: { category: { include: { service: true } } }
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const { categoryId, name, basePrice, imageUrl } = req.body;
        const item = await prisma.item.create({
            data: { categoryId, name, basePrice: parseFloat(basePrice), imageUrl }
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, basePrice, imageUrl, categoryId } = req.body;
        const data = {};
        if (name !== undefined) data.name = name;
        if (basePrice !== undefined) data.basePrice = parseFloat(basePrice);
        if (imageUrl !== undefined) data.imageUrl = imageUrl;
        if (categoryId !== undefined) data.categoryId = categoryId;

        const item = await prisma.item.update({ where: { id }, data });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.item.delete({ where: { id } });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    // Services
    getAllServices,
    createService,
    updateService,
    deleteService,
    // Categories
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
    // Items
    getAllItems,
    createItem,
    updateItem,
    deleteItem
};
