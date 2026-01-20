# Cleclo Order Backend (Microservices)

This backend follows a Microservices architecture using Node.js, Express, and PostgreSQL.

## Structure

- **gateway**: API Gateway (Port 3000). Routes requests to services.
- **services/auth-service**: Authentication, Users, OTP (Port 3001).
- **services/catalog-service**: Services, Categories, Items (Port 3002).
- **services/order-service**: Order processing, Pricing (Port 3003).

## Prerequisites

1.  **Node.js**: Installed.
2.  **PostgreSQL**: Running locally on port 5432.
3.  **Database Creation**: You typically need to create the databases referenced in `.env` files (or just one DB if sharing).
    - By default, the code expects: `cleclo_auth`, `cleclo_catalog`, `cleclo_order`.
    - You can create them via `psql`:
      ```sql
      CREATE DATABASE cleclo_auth;
      CREATE DATABASE cleclo_catalog;
      CREATE DATABASE cleclo_order;
      ```

## Setup & Running

1.  **Install Dependencies**: (Done if you followed the agent)
    ```bash
    cd backend
    npm install # (if root package logic exists, else go into each service)
    # The agent has already run npm install in each service.
    ```

2.  **Database Migration**:
    for each service, run:
    ```bash
    cd backend/services/auth-service
    npx prisma db push
    cd ../catalog-service
    npx prisma db push
    cd ../order-service
    npx prisma db push
    ```

3.  **Start All Services**:
    We have provided a script `start_services.bat`. Run it in the `backend` folder.
    ```bash
    .\start_services.bat
    ```

4.  **API Endpoints**:
    - **Auth**:
        - `POST http://localhost:3000/api/auth/signup`
        - `POST http://localhost:3000/api/auth/login`
    - **Catalog**:
        - `GET http://localhost:3000/api/catalog/services`
        - `GET http://localhost:3000/api/catalog/input-data`
    - **Orders**:
        - `POST http://localhost:3000/api/orders`

## Notes
- **JWT Secret**: Default is 'supersecret_auth_key'. Change in `auth-service/.env`.
- **Uploads**: Images uploaded to Order Service are stored in `backend/services/order-service/uploads`.
