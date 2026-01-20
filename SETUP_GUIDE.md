# Backend Setup & Testing Guide

Follow this guide to connect your backend to PostgreSQL and test APIs using Postman.

## 1. 🗄️ PostgreSQL Setup

1.  **Install PostgreSQL**: If you haven't, download and install it from [postgresql.org](https://www.postgresql.org/download/).
2.  **Create Databases**:
    Open your terminal or PGAdmin and run the following SQL commands to create three separate databases (microservices best practice):
    ```sql
    CREATE DATABASE cleclo_auth;
    CREATE DATABASE cleclo_catalog;
    CREATE DATABASE cleclo_order;
    ```
    *(Alternatively, you can use a single `cleclo_db` but having separate ones ensures true microservice isolation.)*

## 2. 📝 Environment Configuration (`.env`)

You need to create a `.env` file in **each** service directory.

### **Auth Service**
File: `backend/services/auth-service/.env`
```env
PORT=3001
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/cleclo_auth?schema=public"
JWT_SECRET="your_super_secret_key"
```
*Replace `yourpassword` with your actual Postgres password.*

### **Catalog Service**
File: `backend/services/catalog-service/.env`
```env
PORT=3002
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/cleclo_catalog?schema=public"
```

### **Order Service**
File: `backend/services/order-service/.env`
```env
PORT=3003
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/cleclo_order?schema=public"
```

### **API Gateway**
File: `backend/gateway/.env`
```env
PORT=3000
AUTH_SERVICE_URL="http://localhost:3001"
CATALOG_SERVICE_URL="http://localhost:3002"
ORDER_SERVICE_URL="http://localhost:3003"
```

## 3. � Install Dependencies

**Crucial Step:** You must install dependencies in **every** service folder to ensure the correct libraries (like Prisma) are used.

```bash
# 1. Auth Service
cd backend/services/auth-service
npm install

# 2. Catalog Service
cd ../catalog-service
npm install

# 3. Order Service
cd ../order-service
npm install

# 4. API Gateway
cd ../../gateway
npm install
```

*This prevents "Module not found" or "Prisma Version Mismatch" errors.*

## 4. 🚀 Database Migrations

Once dependencies are installed and `.env` files are set, push your schema to the database.

```bash
# Auth Service
cd backend/services/auth-service
npx prisma db push

# Catalog Service
cd ../catalog-service
npx prisma db push

# Order Service
cd ../order-service
npx prisma db push
```

## 5. ▶️ Start Services

We have a handy script to start everything at once!

1.  Open terminal in `backend/` folder.
2.  Run:
    ```bash
    .\start_services.bat
    ```
    This will open 4 new windows for Gateway, Auth, Catalog, and Order services.

## 6. 🧪 Testing in Postman

Now you can test the APIs!

### Option A: Import Manually
1.  Open Postman.
2.  Create a new Collection named **"CleClo Backend"**.
3.  Add folders: `Auth`, `Admin`, `Vendor`, `Orders`, `Catalog`.
4.  Copy request details from **`API_DOCUMENTATION.md`** (located in this folder).

### Option B: Quick Test Flow
1.  **Login**:
    *   POST `http://localhost:3000/api/auth/login` (via Gateway) or `http://localhost:3001/auth/login` (Direct).
    *   Body: `{ "email": "admin@cleclo.com", "password": "..." }`
2.  **Get Token**: Copy the `token` from response.
3.  **Test Admin Route**:
    *   GET `http://localhost:3001/admin/users`
    *   Headers: `Authorization: Bearer <your_token>`

### Troubleshooting
- **Connection Refused?** Check if Postgres is running on Port 5432.
- **Prisma Error?** Check if `DATABASE_URL` password is correct in `.env`.
- **EADDRINUSE Error?** Run `taskkill /IM node.exe /F` to kill stuck processes, then restart.
