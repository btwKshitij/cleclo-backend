@echo off
start "API Gateway" cmd /k "cd gateway && npm start"
start "Auth Service" cmd /k "cd services/auth-service && npm start"
start "Catalog Service" cmd /k "cd services/catalog-service && npm start"
start "Order Service" cmd /k "cd services/order-service && npm start"
echo All services started in separate windows.
