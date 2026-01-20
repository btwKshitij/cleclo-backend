# CleClo Backend API Documentation

This document provides a detailed reference for all backend APIs.

## 🏗️ Services Overview

| Service | Port | Base URL |
|---------|------|----------|
| **Auth Service** | 3001 | `http://localhost:3001` |
| **Catalog Service** | 3002 | `http://localhost:3002` |
| **Order Service** | 3003 | `http://localhost:3003` |

---

# 🔐 Auth Service (Port 3001)

## Public Config & Auth

### 1. Signup (Customer)
- **Endpoint**: `POST /auth/signup`
- **Description**: Register a new customer account.
- **Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "password": "securepassword",
  "address": "123 Main St",
  "lat": 12.9716,
  "lng": 77.5946
}
```
- **Response**:
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1...",
  "user": { "id": "uuid...", "name": "Jane Doe", "role": "customer", ... }
}
```

### 2. Login
- **Endpoint**: `POST /auth/login`
- **Request Body**:
```json
{
  "email": "jane@example.com", 
  "password": "securepassword"
}
```
- **Response**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1...",
  "user": { "id": "uuid...", "role": "customer", ... }
}
```

### 3. Vendor Registration
- **Endpoint**: `POST /auth/vendor/register`
- **Request Body**:
```json
{
  "name": "Vendor Name",
  "email": "vendor@cleclo.com",
  "phone": "9999999999",
  "password": "pass",
  "businessName": "Vendor Laundry",
  "gstRegistered": true,
  "gstNumber": "GST123",
  "businessType": "LLP",
  "servicesOffered": "Dry Clean, Wash",
  "dailyCapacity": 100,
  "bankHolderName": "Name",
  "bankName": "Bank",
  "accountNumber": "1234567890",
  "ifscCode": "IFSC001",
  "outletName": "Main Outlet",
  "outletAddress": "Location Str",
  "lat": 12.0,
  "lng": 77.0,
  "operatingHours": "09:00-21:00",
  "termsAccepted": true,
  "slaAccepted": true
}
```
- **Response**:
```json
{
  "message": "Vendor registered successfully",
  "userId": "uuid..."
}
```

---

## 🛠️ Admin APIs
**Base Path**: `/admin`

### User Management

#### Get All Users
- **Endpoint**: `GET /admin/users`
- **Query Params**: `?role=vendor` | `?status=active` | `?userType=vip`
- **Response**: `[ { "id": "...", "name": "...", "wallet": {...} }, ... ]`

#### Get User Details
- **Endpoint**: `GET /admin/users/:id`
- **Response**: User object with wallet, addresses, and vendorProfile (if vendor).

#### Update User
- **Endpoint**: `PUT /admin/users/:id`
- **Request Body**:
```json
{
  "name": "New Name",
  "email": "new@mail.com",
  "phone": "9876543210",
  "userType": "vip"
}
```

#### Block/Unblock User
- **Endpoint**: `PATCH /admin/users/:id/block`
- **Request Body**: `{ "blocked": true }` or `{ "blocked": false }`

#### Get User Wallet
- **Endpoint**: `GET /admin/users/:id/wallet`
- **Response**: `{ "id": "...", "balance": 500, "transactions": [...] }`

#### Adjust User Wallet
- **Endpoint**: `POST /admin/users/:id/wallet`
- **Request Body**:
```json
{
  "amount": 100,
  "type": "credit", 
  "note": "Refund for order #123"
}
```
*Type can be 'credit' or 'debit'.*

---

### Vendor Management

#### Get All Vendors
- **Endpoint**: `GET /admin/vendors`
- **Query Params**: `?status=active`
- **Response**: List of users with `role: vendor`.

#### Get Pending Vendors
- **Endpoint**: `GET /admin/vendors/pending`
- **Response**: List of vendors with `isApproved: false`.

#### Approve Vendor
- **Endpoint**: `PATCH /admin/vendors/:id/approve`
- **Request Body**: `{ "isApproved": true }`

#### Suspend Vendor
- **Endpoint**: `PATCH /admin/vendors/:id/suspend`
- **Request Body**: `{ "suspended": true }`

#### Get Vendor Payouts
- **Endpoint**: `GET /admin/vendors/:id/payouts`
- **Response**: List of settlement records.

---

### Finance & Settlements

#### Get All Settlements
- **Endpoint**: `GET /admin/settlements`
- **Query Params**: `?status=pending` | `?vendorId=...`

#### Create Settlement (Payout)
- **Endpoint**: `POST /admin/settlements`
- **Request Body**:
```json
{
  "vendorId": "uuid...",
  "amount": 5000,
  "note": "Weekly payout"
}
```

#### Mark Settlement as Paid
- **Endpoint**: `PATCH /admin/settlements/:id/paid`
- **Response**: Settlement object with `status: 'paid'`.

#### Get Settlement Stats
- **Endpoint**: `GET /admin/settlements/stats`
- **Response**:
```json
{
  "pending": { "count": 5, "amount": 25000 },
  "paid": { "count": 120, "amount": 500000 }
}
```

---

## 📊 Vendor Dashboard APIs
**Base Path**: `/vendor`

### Dashboard Stats
- **Endpoint**: `GET /vendor/dashboard/stats`
- **Query**: `?vendorId=...`
- **Response**:
```json
{
  "businessName": "My Laundry",
  "isApproved": true,
  "pendingEarnings": 5000,
  "totalEarnings": 15000,
  "outlets": [...]
}
```

### Earnings History
- **Endpoint**: `GET /vendor/earnings`
- **Query**: `?vendorId=...`, `?startDate=2024-01-01`, `?endDate=2024-01-31`
- **Response**: `{ "earnings": [...], "summary": { "paid": { "amount": 1000 }, "pending": { "amount": 500 } } }`

### Schedule (Operating Hours)
- **Endpoint**: `GET /vendor/schedule?vendorId=...`
- **Response**: `[ { "outletId": "...", "operatingHours": "09:00-21:00" } ]`

#### Update Schedule
- **Endpoint**: `PUT /vendor/schedule`
- **Request Body**: `{ "outletId": "...", "operatingHours": "10:00-20:00" }`

### Services & Capacity
- **Update Services**: `PUT /vendor/services` -> `{ "vendorId": "...", "servicesOffered": "Wash, Iron" }`
- **Update Capacity**: `PUT /vendor/capacity` -> `{ "vendorId": "...", "dailyCapacity": 50 }`

---

## 🎫 Support Ticket APIs
**Base Path**: `/tickets`

### Create Ticket
- **Endpoint**: `POST /tickets`
- **Request Body**:
```json
{
  "userId": "uuid-of-creator",
  "subject": "Missing Payment",
  "message": "I did not receive payout #123",
  "category": "payments",
  "targetId": "uuid-of-vendor" 
}
```
*`targetId` is optional. If missing, ticket goes to Admin. If present, ticket goes to that specific Vendor.*

### Get My Tickets
- **Endpoint**: `GET /tickets/my-tickets`
- **Query**: `?userId=...` & `?role=vendor` (optional)
- **Note**: If role=vendor, returns tickets created BY vendor AND tickets assigned TO vendor.

### Admin: Get All Tickets
- **Endpoint**: `GET /tickets/admin/all`
- **Query**: `?status=open`, `?isEscalated=true`

### Update Ticket Status
- **Endpoint**: `PATCH /tickets/:id/status`
- **Request Body**: `{ "status": "resolved", "isEscalated": true }`

---

# 📦 Order Service (Port 3003)

## Public Order APIs

### Create Order
- **Endpoint**: `POST /orders`
- **Request Body**:
```json
{
  "userId": "uuid...",
  "pickupTime": "2024-03-20T10:00:00Z",
  "serviceType": "standard",
  "items": [
    { "itemId": "uuid...", "quantity": 2, "condition": "good", "images": ["url1"] }
  ]
}
```

### Check Price/Estimated Time
- **Endpoint**: `POST /orders/price-check`
- **Request Body**: `{ "pickupTime": "...", "serviceType": "express" }`
- **Response**: `{ "deliveryDate": "...", "multiplier": 1.5 }`

### Upload Order Image
- **Endpoint**: `POST /orders/upload`
- **Data**: Multipart Form Data (`image` file field)
- **Response**: `{ "imageUrl": "/uploads/filename.jpg" }`

---

## 🛠️ Admin Order APIs
**Base Path**: `/admin/orders`

### Get All Orders
- **Endpoint**: `GET /admin/orders`
- **Query**: `?status=pending`, `?vendorId=...`, `?hasIssue=true`

### Assign Vendor / Rider
- **Assign Vendor**: `PATCH /admin/orders/:id/assign-vendor` -> `{ "vendorId": "..." }`
- **Assign Rider**: `PATCH /admin/orders/:id/assign-rider` -> `{ "riderId": "..." }`

### Update Status
- **Endpoint**: `PATCH /admin/orders/:id/status`
- **Request Body**: `{ "status": "processing" }`

### Issue Management
- **Report**: `POST /admin/orders/:id/issue` -> `{ "issueType": "damaged", "issueNote": "Button broken" }`
- **Resolve**: `PATCH /admin/orders/:id/resolve-issue`

### Dashboard Stats
- **Endpoint**: `GET /admin/orders/dashboard/stats`
- **Response**: `{ "totalOrders": 100, "todayOrders": 5, "revenue": 5000, ... }`

---

## 🚚 Vendor Order APIs
**Base Path**: `/vendor/orders`

### Get My Orders
- **Endpoint**: `GET /vendor/orders`
- **Query**: `?vendorId=...`, `?status=pending`

### Vendor Stats
- **Endpoint**: `GET /vendor/orders/stats?vendorId=...`
- **Response**: `{ "completionRate": 95, "earnings": 2000, "pendingOrders": 2 }`

### Order Actions
- **Accept**: `PATCH /vendor/orders/:id/accept`
- **Ready for Delivery**: `PATCH /vendor/orders/:id/ready`
- **Update Progress**: `PATCH /vendor/orders/:id/status` -> `{ "status": "cleaning" }`

---

# 📚 Catalog Service (Port 3002)

## Public Catalog
- **Endpoint**: `GET /catalog/services`
- **Response**: Returns full hierarchy: Services -> Categories -> Items.

## 🛠️ Admin Catalog APIs
**Base Path**: `/admin`

### Services
- `GET /admin/services`
- `POST /admin/services` -> `{ "name": "Dry Clean" }`
- `PUT /admin/services/:id` -> `{ "name": "New Name" }`
- `DELETE /admin/services/:id`

### Categories
- `GET /admin/categories?serviceId=...`
- `POST /admin/categories` -> `{ "serviceId": "...", "name": "Men", "order": 1 }`
- `PATCH /admin/categories/reorder` -> Body: `{ "categories": [{ "id": "1", "order": 2 }, { "id": "2", "order": 1 }] }`

### Items
- `GET /admin/items?categoryId=...`
- `POST /admin/items` -> `{ "categoryId": "...", "name": "Shirt", "basePrice": 50, "imageUrl": "..." }`
- `PUT /admin/items/:id` -> `{ "basePrice": 60 }`
- `DELETE /admin/items/:id`
