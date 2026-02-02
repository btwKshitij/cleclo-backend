const { PrismaClient: AuthPrisma } = require('../auth-service/node_modules/@prisma/client');
const { PrismaClient: CatalogPrisma } = require('../catalog-service/node_modules/@prisma/client');
const { PrismaClient: OrderPrisma } = require('../order-service/node_modules/@prisma/client');

const authDb = new AuthPrisma();
const catalogDb = new CatalogPrisma();
const orderDb = new OrderPrisma();

async function main() {
    console.log('🔍 Fetching real IDs from databases...\n');

    // Get users
    const customers = await authDb.user.findMany({
        where: { role: 'customer' },
        take: 3,
        select: { id: true, name: true, email: true },
    });

    const vendors = await authDb.user.findMany({
        where: { role: 'vendor', vendorProfile: { isApproved: true } },
        take: 2,
        select: { id: true, name: true, email: true },
    });

    const riders = await authDb.user.findMany({
        where: { role: 'rider' },
        take: 2,
        select: { id: true, name: true },
    });

    // Get items
    const items = await catalogDb.item.findMany({
        take: 5,
        select: { id: true, name: true },
    });

    console.log('📋 Copy these IDs to seed.js in order-service:\n');

    console.log('const customerIds = [');
    customers.forEach(c => console.log(`  '${c.id}', // ${c.name} (${c.email})`));
    console.log('];\n');

    console.log('const vendorIds = [');
    vendors.forEach(v => console.log(`  '${v.id}', // ${v.name} (${v.email})`));
    console.log('];\n');

    console.log('const riderIds = [');
    riders.forEach(r => console.log(`  '${r.id}', // ${r.name}`));
    console.log('];\n');

    console.log('const itemIds = [');
    items.forEach(i => console.log(`  '${i.id}', // ${i.name}`));
    console.log('];\n');

    console.log('✅ Now update the seed.js file in order-service with these IDs and run:');
    console.log('   cd backend/services/order-service');
    console.log('   node prisma/seed.js');
}

main()
    .catch((e) => {
        console.error('❌ Error:', e.message);
        console.log('\n⚠️  Make sure you have already seeded auth-service and catalog-service first!');
        process.exit(1);
    })
    .finally(async () => {
        await authDb.$disconnect();
        await catalogDb.$disconnect();
        await orderDb.$disconnect();
    });
