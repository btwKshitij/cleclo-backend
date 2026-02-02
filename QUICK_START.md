


```bash
# Auth service
cd backend/services/auth-service
npx prisma migrate dev --name init
node prisma/seed.js

# Catalog service
cd ../catalog-service
npx prisma migrate dev --name init
node prisma/seed.js

# Order service
cd ../order-service
npx prisma migrate dev --name init
node prisma/seed.js

# Get IDs for orders
cd ..
node get-ids-for-orders.js

# Copy the IDs shown, update order-service/prisma/seed.js (lines 12-30)
# Then seed orders:
cd order-service
node prisma/seed.js
```

### 6️⃣ Start Services

Open 3 terminals:

**Terminal 1:**
```bash
cd backend/services/auth-service
npm start
```

**Terminal 2:**
```bash
cd backend/services/catalog-service
npm start
```

**Terminal 3:**
```bash
cd backend/services/order-service
npm start
```

---

## ✅ Quick Test

**Windows PowerShell:**
```powershell
$body = @{email="ravindra@example.com"; password="password123"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3001/auth/login" -Method Post -Body $body -ContentType "application/json"
```

**Mac/Linux:**
```bash
curl -X POST http://localhost:3001/auth/login -H "Content-Type: application/json" -d '{"email":"ravindra@example.com","password":"password123"}'
```

Should return: `{ "message": "Login successful", "token": "...", "user": {...} }`

---

## 🧰 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to database" | Start PostgreSQL service |
| "password authentication failed" | Check PASSWORD in .env files |
| "database does not exist" | Run step 3 (create databases) |
| "bcryptjs not found" | Run `npm install` in auth-service |
| Port already in use | Close other services or change PORT in .env |

---

## 📊 What You'll Have

After setup:
- ✅ 19 users (1 admin, 10 customers, 5 vendors, 3 riders)
- ✅ 90+ catalog items with pricing
- ✅ 7 sample orders
- ✅ All with realistic data for testing

**Default password:** `password123`

---

## 📱 Test Accounts

| Email | Role | Password |
|-------|------|----------|
| admin@cleclo.com | Admin | password123 |
| ravindra@example.com | Customer (VIP) | password123 |
| vendor1@cleclo.com | Vendor | password123 |
| rahul.rider@cleclo.com | Rider | password123 |

---

## 🆘 Stuck?

1. Read error message carefully
2. Check [INTERN_SETUP_GUIDE.md](./INTERN_SETUP_GUIDE.md) (detailed guide)
3. Ask your mentor with:
   - Error message screenshot
   - Which step you're on
   - What you already tried

---

**Time to complete:** ~15-20 minutes (first time)  
**Next:** Start testing APIs or integrate with Flutter app! 🎉
