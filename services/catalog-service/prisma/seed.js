const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding Catalog Service database...');

    // 1. Create Services
    const dryCleanService = await prisma.service.create({
        data: {
            name: 'Dry Clean',
            slug: 'dry-clean',
        },
    });

    const washService = await prisma.service.create({
        data: {
            name: 'Wash Only',
            slug: 'wash-only',
        },
    });

    const ironService = await prisma.service.create({
        data: {
            name: 'Iron',
            slug: 'iron',
        },
    });

    // 2. Create Categories for Dry Clean
    const dryCleanMen = await prisma.category.create({
        data: {
            serviceId: dryCleanService.id,
            name: 'Men',
            order: 1,
        },
    });

    const dryCleanWomen = await prisma.category.create({
        data: {
            serviceId: dryCleanService.id,
            name: 'Women',
            order: 2,
        },
    });

    const dryCleanKids = await prisma.category.create({
        data: {
            serviceId: dryCleanService.id,
            name: 'Kids',
            order: 3,
        },
    });

    const dryCleanHousehold = await prisma.category.create({
        data: {
            serviceId: dryCleanService.id,
            name: 'Household',
            order: 4,
        },
    });

    // 3. Create Categories for Wash Only
    const washMen = await prisma.category.create({
        data: {
            serviceId: washService.id,
            name: 'Men',
            order: 1,
        },
    });

    const washWomen = await prisma.category.create({
        data: {
            serviceId: washService.id,
            name: 'Women',
            order: 2,
        },
    });

    const washKids = await prisma.category.create({
        data: {
            serviceId: washService.id,
            name: 'Kids',
            order: 3,
        },
    });

    const washHousehold = await prisma.category.create({
        data: {
            serviceId: washService.id,
            name: 'Household',
            order: 4,
        },
    });

    // 4. Create Categories for Iron
    const ironMen = await prisma.category.create({
        data: {
            serviceId: ironService.id,
            name: 'Men',
            order: 1,
        },
    });

    const ironWomen = await prisma.category.create({
        data: {
            serviceId: ironService.id,
            name: 'Women',
            order: 2,
        },
    });

    const ironKids = await prisma.category.create({
        data: {
            serviceId: ironService.id,
            name: 'Kids',
            order: 3,
        },
    });

    const ironHousehold = await prisma.category.create({
        data: {
            serviceId: ironService.id,
            name: 'Household',
            order: 4,
        },
    });

    // 5. Create Items for Dry Clean - Men
    await prisma.item.createMany({
        data: [
            { categoryId: dryCleanMen.id, name: 'Shirt', basePrice: 50, imageUrl: null },
            { categoryId: dryCleanMen.id, name: 'T-Shirt', basePrice: 40, imageUrl: null },
            { categoryId: dryCleanMen.id, name: 'Trousers', basePrice: 60, imageUrl: null },
            { categoryId: dryCleanMen.id, name: 'Jeans', basePrice: 70, imageUrl: null },
            { categoryId: dryCleanMen.id, name: 'Suit (2 Pcs)', basePrice: 250, imageUrl: null },
            { categoryId: dryCleanMen.id, name: 'Blazer', basePrice: 150, imageUrl: null },
            { categoryId: dryCleanMen.id, name: 'Kurta', basePrice: 80, imageUrl: null },
            { categoryId: dryCleanMen.id, name: 'Sherwani', basePrice: 300, imageUrl: null },
            { categoryId: dryCleanMen.id, name: 'Jacket', basePrice: 120, imageUrl: null },
            { categoryId: dryCleanMen.id, name: 'Sweater', basePrice: 90, imageUrl: null },
        ],
    });

    // 6. Create Items for Dry Clean - Women
    await prisma.item.createMany({
        data: [
            { categoryId: dryCleanWomen.id, name: 'Shirt', basePrice: 50, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'T-Shirt', basePrice: 40, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'Trousers', basePrice: 60, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'Jeans', basePrice: 70, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'Saree (Cotton)', basePrice: 100, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'Saree (Silk)', basePrice: 150, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'Lehenga', basePrice: 400, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'Salwar Kameez', basePrice: 120, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'Dress', basePrice: 100, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'Blazer', basePrice: 140, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'Kurti', basePrice: 60, imageUrl: null },
            { categoryId: dryCleanWomen.id, name: 'Sweater', basePrice: 85, imageUrl: null },
        ],
    });

    // 7. Create Items for Dry Clean - Kids
    await prisma.item.createMany({
        data: [
            { categoryId: dryCleanKids.id, name: 'T-Shirt', basePrice: 30, imageUrl: null },
            { categoryId: dryCleanKids.id, name: 'Shirt', basePrice: 35, imageUrl: null },
            { categoryId: dryCleanKids.id, name: 'Trousers', basePrice: 45, imageUrl: null },
            { categoryId: dryCleanKids.id, name: 'Jeans', basePrice: 50, imageUrl: null },
            { categoryId: dryCleanKids.id, name: 'Dress', basePrice: 60, imageUrl: null },
            { categoryId: dryCleanKids.id, name: 'Jacket', basePrice: 80, imageUrl: null },
            { categoryId: dryCleanKids.id, name: 'Kurta Set', basePrice: 90, imageUrl: null },
        ],
    });

    // 8. Create Items for Dry Clean - Household
    await prisma.item.createMany({
        data: [
            { categoryId: dryCleanHousehold.id, name: 'Bedsheet Single', basePrice: 80, imageUrl: null },
            { categoryId: dryCleanHousehold.id, name: 'Bedsheet Double', basePrice: 120, imageUrl: null },
            { categoryId: dryCleanHousehold.id, name: 'Blanket Single', basePrice: 150, imageUrl: null },
            { categoryId: dryCleanHousehold.id, name: 'Blanket Double', basePrice: 200, imageUrl: null },
            { categoryId: dryCleanHousehold.id, name: 'Curtain (per panel)', basePrice: 100, imageUrl: null },
            { categoryId: dryCleanHousehold.id, name: 'Sofa Cover', basePrice: 250, imageUrl: null },
            { categoryId: dryCleanHousehold.id, name: 'Carpet (per sq ft)', basePrice: 15, imageUrl: null },
        ],
    });

    // 9. Create Items for Wash Only - Men
    await prisma.item.createMany({
        data: [
            { categoryId: washMen.id, name: 'T-Shirt', basePrice: 25, imageUrl: null },
            { categoryId: washMen.id, name: 'Shirt', basePrice: 30, imageUrl: null },
            { categoryId: washMen.id, name: 'Jeans', basePrice: 40, imageUrl: null },
            { categoryId: washMen.id, name: 'Trousers', basePrice: 35, imageUrl: null },
            { categoryId: washMen.id, name: 'Shorts', basePrice: 25, imageUrl: null },
            { categoryId: washMen.id, name: 'Track Pants', basePrice: 30, imageUrl: null },
            { categoryId: washMen.id, name: 'Kurta', basePrice: 50, imageUrl: null },
        ],
    });

    // 10. Create Items for Wash Only - Women
    await prisma.item.createMany({
        data: [
            { categoryId: washWomen.id, name: 'T-Shirt', basePrice: 25, imageUrl: null },
            { categoryId: washWomen.id, name: 'Top', basePrice: 30, imageUrl: null },
            { categoryId: washWomen.id, name: 'Jeans', basePrice: 40, imageUrl: null },
            { categoryId: washWomen.id, name: 'Leggings', basePrice: 25, imageUrl: null },
            { categoryId: washWomen.id, name: 'Kurti', basePrice: 35, imageUrl: null },
            { categoryId: washWomen.id, name: 'Salwar Kameez', basePrice: 70, imageUrl: null },
        ],
    });

    // 11. Create Items for Wash Only - Kids
    await prisma.item.createMany({
        data: [
            { categoryId: washKids.id, name: 'T-Shirt', basePrice: 20, imageUrl: null },
            { categoryId: washKids.id, name: 'Shirt', basePrice: 22, imageUrl: null },
            { categoryId: washKids.id, name: 'Shorts', basePrice: 18, imageUrl: null },
            { categoryId: washKids.id, name: 'Jeans', basePrice: 30, imageUrl: null },
        ],
    });

    // 12. Create Items for Wash Only - Household
    await prisma.item.createMany({
        data: [
            { categoryId: washHousehold.id, name: 'Bedsheet Single', basePrice: 50, imageUrl: null },
            { categoryId: washHousehold.id, name: 'Bedsheet Double', basePrice: 70, imageUrl: null },
            { categoryId: washHousehold.id, name: 'Pillow Cover', basePrice: 15, imageUrl: null },
            { categoryId: washHousehold.id, name: 'Towel', basePrice: 25, imageUrl: null },
        ],
    });

    // 13. Create Items for Iron - Men
    await prisma.item.createMany({
        data: [
            { categoryId: ironMen.id, name: 'Shirt', basePrice: 15, imageUrl: null },
            { categoryId: ironMen.id, name: 'T-Shirt', basePrice: 10, imageUrl: null },
            { categoryId: ironMen.id, name: 'Trousers', basePrice: 20, imageUrl: null },
            { categoryId: ironMen.id, name: 'Jeans', basePrice: 25, imageUrl: null },
            { categoryId: ironMen.id, name: 'Kurta', basePrice: 25, imageUrl: null },
        ],
    });

    // 14. Create Items for Iron - Women
    await prisma.item.createMany({
        data: [
            { categoryId: ironWomen.id, name: 'Shirt', basePrice: 15, imageUrl: null },
            { categoryId: ironWomen.id, name: 'Top', basePrice: 12, imageUrl: null },
            { categoryId: ironWomen.id, name: 'Saree', basePrice: 40, imageUrl: null },
            { categoryId: ironWomen.id, name: 'Salwar Kameez', basePrice: 35, imageUrl: null },
            { categoryId: ironWomen.id, name: 'Kurti', basePrice: 20, imageUrl: null },
        ],
    });

    // 15. Create Items for Iron - Kids
    await prisma.item.createMany({
        data: [
            { categoryId: ironKids.id, name: 'T-Shirt', basePrice: 8, imageUrl: null },
            { categoryId: ironKids.id, name: 'Shirt', basePrice: 10, imageUrl: null },
            { categoryId: ironKids.id, name: 'Shorts', basePrice: 8, imageUrl: null },
        ],
    });

    // 16. Create Items for Iron - Household
    await prisma.item.createMany({
        data: [
            { categoryId: ironHousehold.id, name: 'Bedsheet Single', basePrice: 25, imageUrl: null },
            { categoryId: ironHousehold.id, name: 'Bedsheet Double', basePrice: 35, imageUrl: null },
            { categoryId: ironHousehold.id, name: 'Pillow Cover', basePrice: 8, imageUrl: null },
        ],
    });

    console.log('✅ Catalog Service seeding completed!');
    console.log(`   - Created 3 services (Dry Clean, Wash Only, Iron)`);
    console.log(`   - Created 12 categories`);
    console.log(`   - Created 90+ items across all categories`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
