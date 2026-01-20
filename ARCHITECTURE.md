# Cleclo Backend Architecture Guide

Welcome to the Cleclo Backend! This document is designed to help you understand **how** the system works, **why** we built it this way, and **where** everything lives.

---

## 1. High-Level Concept: "Microservices"

Imagine a restaurant.
- **Monolith (The Old Way)**: One super-waiter does *everything*: acts as the host, takes orders, cooks the food, washes dishes, and handles payments. If this waiter gets sick or overwhelmed, the whole restaurant stops.
- **Microservices (Our Way)**: We have specialized roles.
    - **Host (Gateway)**: Greets customers and points them to the right place.
    - **Waiter (Order Service)**: Takes orders.
    - **Cook (Catalog/Kitchen)**: Knows the menu and prepares items.
    - **Cashier (Auth Service)**: Handles ID checks and payments.

In our code, we split the backend into these specialized "servers" (services) that talk to each other.

---

## 2. System Architecture Diagram

Here is how the pieces fit together:

```mermaid
graph TD
    User[📱 Mobile App / User] -->|HTTP Requests| Gateway[🛡️ API Gateway\n(Port 3000)]
    
    subgraph "The Backend"
        Gateway -->|/auth/*| AuthService[🔐 Auth Service\n(Port 3001)]
        Gateway -->|/catalog/*| CatalogService[📋 Catalog Service\n(Port 3002)]
        Gateway -->|/orders/*| OrderService[📦 Order Service\n(Port 3003)]
        
        AuthService -->|Reads/Writes| DB_Auth[(🗄️ Auth DB)]
        CatalogService -->|Reads/Writes| DB_Catalog[(🗄️ Catalog DB)]
        OrderService -->|Reads/Writes| DB_Order[(🗄️ Order DB)]
    end
```

---

## 3. The Components (deep dive)

### A. API Gateway (Port 3000)
**Role**: The "Front Door".
- The mobile app **only** knows about `localhost:3000`. It doesn't know there are three other servers behind it.
- **What it does**: It takes a request like `POST /api/auth/login` and proxies (forwards) it to `http://localhost:3001/auth/login`.
- **Why?**: Security and simplicity. We can change the backend services without changing the mobile app code.

### B. Auth Service (Port 3001)
**Role**: Identity Manager.
- **Responsibilities**: Sign up users, log them in, check passwords, and verify OTPs.
- **Key Concept**: **JWT (JSON Web Token)**. When a user logs in, we give them a "digital badge" (Token). They attach this badge to every future request so we know who they are.

### C. Catalog Service (Port 3002)
**Role**: The Menu.
- **Responsibilities**: Stores the list of Services (Dry Clean, Wash), Categories (Men, Women), and Items (Shirt, Jeans).
- **Data**: This data doesn't change often. The mobile app fetches this to build the UI.

### D. Order Service (Port 3003)
**Role**: The Transaction Processor.
- **Responsibilities**:
    - Takes the list of items the user wants.
    - Uploads images (for "Select Your Collection").
    - **Business Logic**: Calculates delivery dates and prices based on rules (Standard vs. Express).
- **Note**: This service is the most complex because it handles the "business" of the app.

---

## 4. Key Technologies & Concepts

### 1. Node.js & Express
We use **Node.js** to run JavaScript on the server and **Express** to create the API endpoints (routes).
- *Learn this*: How to write a `app.get()` route and how `req.body` works.

### 2. PostgreSQL & Prisma
- **PostgreSQL**: The database. It uses tables (rows and columns) like Excel, but powerful.
- **Prisma**: An **ORM (Object-Relational Mapper)**.
    - Instead of writing complex SQL queries like `SELECT * FROM users WHERE email = ...`, we write JavaScript: `prisma.user.findUnique({ where: { email } })`.
    - *Learn this*: Look at the `schema.prisma` file in each service. That is the "blueprint" of our data.

### 3. Folder Structure (MVC Pattern)
In every service, you will see this structure:
- **`src/controllers/`**: The "Brain". It receives the request, decides what to do, and sends a response.
- **`src/routes/`**: The "Map". It lists which URLs go to which Controller function.
- **`src/utils/`**: Helper files (like math for pricing).

---

## 5. How Data Flows (Example)

**Scenario: A User Signs Up**
1. **Mobile App**: Sends user details to `http://localhost:3000/api/auth/signup`.
2. **Gateway**: Receives it. Sees `/api/auth` prefix. Forwards it to `http://localhost:3001/auth/signup`.
3. **Auth Service**:
    - Receives request.
    - Hashes the password (security!).
    - Saves user to Postgres via Prisma.
    - Generates a JWT Token.
    - Sends "Success" back to Gateway.
4. **Gateway**: Sends "Success" back to App.

---

## 6. Setup for Developers
1. **Install Node.js**.
2. **Install PostgreSQL** and create databases (`cleclo_auth`, `cleclo_catalog`, `cleclo_order`).
3. **Run Migrations**: `npx prisma db push` in each service folder (this creates the tables for you).
4. **Start**: Run `start_services.bat`.

---

*Written by Antigravity for the Cleclo Team.*
