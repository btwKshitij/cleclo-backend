const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all settlements
const getAllSettlements = async (req, res) => {
    try {
        const { status, vendorId } = req.query;
        const where = {};
        if (status) where.status = status;
        if (vendorId) where.vendorId = vendorId;

        const settlements = await prisma.vendorSettlement.findMany({
            where,
            include: {
                vendor: {
                    select: { id: true, name: true, phone: true, vendorProfile: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(settlements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create settlement for vendor
const createSettlement = async (req, res) => {
    try {
        const { vendorId, amount, note } = req.body;

        const settlement = await prisma.vendorSettlement.create({
            data: {
                vendorId,
                amount: parseFloat(amount),
                note,
                status: 'pending'
            }
        });

        res.status(201).json({ message: 'Settlement created', settlement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark settlement as paid
const markSettlementPaid = async (req, res) => {
    try {
        const { id } = req.params;

        const settlement = await prisma.vendorSettlement.update({
            where: { id },
            data: {
                status: 'paid',
                paidAt: new Date()
            }
        });

        res.json({ message: 'Settlement marked as paid', settlement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get settlement summary stats
const getSettlementStats = async (req, res) => {
    try {
        const [totalPending, totalPaid] = await Promise.all([
            prisma.vendorSettlement.aggregate({
                where: { status: 'pending' },
                _sum: { amount: true },
                _count: true
            }),
            prisma.vendorSettlement.aggregate({
                where: { status: 'paid' },
                _sum: { amount: true },
                _count: true
            })
        ]);

        res.json({
            pending: {
                count: totalPending._count,
                amount: totalPending._sum.amount || 0
            },
            paid: {
                count: totalPaid._count,
                amount: totalPaid._sum.amount || 0
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllSettlements,
    createSettlement,
    markSettlementPaid,
    getSettlementStats
};
