const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            include: {
                categories: {
                    include: {
                        items: true
                    }
                }
            }
        });
        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getInputData = async (req, res) => {
    try {
        // Optimized hierarchical fetch
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
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createService = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const service = await prisma.service.create({ data: { name, slug } });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const { serviceId, name, order } = req.body;
        const category = await prisma.category.create({ data: { serviceId, name, order } });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const { categoryId, name, basePrice, imageUrl } = req.body;
        const item = await prisma.item.create({ data: { categoryId, name, basePrice, imageUrl } });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getServices,
    getInputData,
    createService,
    createCategory,
    createItem
};
