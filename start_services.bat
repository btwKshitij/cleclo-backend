@REM @echo off
@REM start "API Gateway" cmd /k "cd gateway && npm start"
@REM start "Auth Service" cmd /k "cd services/auth-service && npm start"
@REM start "Catalog Service" cmd /k "cd services/catalog-service && npm start"
@REM start "Order Service" cmd /k "cd services/order-service && npm start"
@REM echo All services started in separate windows.

@echo off
start "API Gateway" cmd /k "cd gateway && npm run dev"
start "Auth Service" cmd /k "cd services/auth-service && npm run dev"
start "Catalog Service" cmd /k "cd services/catalog-service && npm run dev"
start "Order Service" cmd /k "cd services/order-service && npm run dev"
echo All services started in separate windows.
