# CleClo Backend

Backend microservices for the CleClo laundry management application.

## 🏗️ Architecture

This backend consists of 3 microservices:

| Service | Port | Purpose | Database |
|---------|------|---------|----------|
| **Auth Service** | 3001 | User authentication, authorization, wallets, vendor management | cleclo_auth |
| **Catalog Service** | 3002 | Service catalog, categories, items, pricing | cleclo_catalog |
| **Order Service** | 3003 | Order management, tracking, rider/vendor assignment | cleclo_orders |

## 📚 Documentation

- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API reference for all endpoints
- **[Intern Setup Guide](./INTERN_SETUP_GUIDE.md)** - Step-by-step guide for new developers
- **[Architecture Overview](./ARCHITECTURE.md)** - System design and architecture details
- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed setup instructions

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL v14+
- npm or yarn

### Setup

1. **Install dependencies for all services:**
```bash
cd services/auth-service && npm install
cd ../catalog-service && npm install
cd ../order-service && npm install
```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` in each service folder
   - Update DATABASE_URL with your PostgreSQL credentials

3. **Run migrations:**
```bash
cd services/auth-service; npx prisma migrate dev
cd ../catalog-service; npx prisma migrate dev
cd ../order-service; npx prisma migrate dev
```

4. **Seed databases with test data:**
```bash
# Auth Service (users, vendors, riders)
cd services/auth-service
node prisma/seed.js

# Catalog Service (items, categories)
cd ../catalog-service
node prisma/seed.js

# Order Service (sample orders)
# First get real IDs:
cd ..
node get-ids-for-orders.js
# Then update order-service/prisma/seed.js with those IDs
cd order-service
node prisma/seed.js
```

5. **Start services:**
```bash
# Terminal 1
cd services/auth-service && npm start

# Terminal 2
cd services/catalog-service && npm start

# Terminal 3
cd services/order-service && npm start
```

### Quick Test

```bash
# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ravindra@example.com","password":"password123"}'

# Get catalog
curl http://localhost:3002/catalog/services
```

## 🧪 Test Accounts

Default password for all accounts: `password123`

| Role | Email | Type |
|------|-------|------|
| Admin | admin@cleclo.com | Full access |
| Customer | ravindra@example.com | VIP customer |
| Vendor | vendor1@cleclo.com | Approved vendor |
| Rider | rahul.rider@cleclo.com | Active rider |

## 📁 Project Structure

```
backend/
├── services/
│   ├── auth-service/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.js
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   └── middleware/
│   │   ├── .env
│   │   └── package.json
│   │
│   ├── catalog-service/
│   │   ├── prisma/
│   │   ├── src/
│   │   └── ...
│   │
│   └── order-service/
│       ├── prisma/
│       ├── src/
│       └── ...
│
├── get-ids-for-orders.js  # Helper to get real IDs for order seeding
├── API_DOCUMENTATION.md
├── INTERN_SETUP_GUIDE.md
└── README.md (this file)
```

## 🛠️ Development

### View Database
```bash
cd services/SERVICE_NAME
npx prisma studio
```

### Reset Database
```bash
cd services/SERVICE_NAME
npx prisma migrate reset
node prisma/seed.js
```

### Generate Prisma Client
```bash
cd services/SERVICE_NAME
npx prisma generate
```

## 🔐 Security Notes

- JWT tokens expire in 24 hours
- Passwords are hashed with bcrypt (10 rounds)
- All admin routes require authentication middleware
- CORS is configured for development (update for production)

## 📊 Database Schema

Each service has its own PostgreSQL database:

**Auth Service:**
- User, Address, Outlet
- VendorProfile
- Wallet, WalletTransaction
- VendorSettlement
- SupportTicket

**Catalog Service:**
- Service, Category, Item

**Order Service:**
- Order, OrderItem, OrderImage

## 🤝 Contributing

For new developers:
1. Read [INTERN_SETUP_GUIDE.md](./INTERN_SETUP_GUIDE.md)
2. Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. Set up your local environment
4. Seed test data
5. Test APIs with Postman or curl

## 📝 License

Private - CleClo Project
