const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API Gateway is running' });
});

// Proxy routes
// Auth Service
app.use('/api/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': '/auth', // Rewrites /api/auth/login to /auth/login
    },
}));

// Catalog Service
app.use('/api/catalog', createProxyMiddleware({
    target: process.env.CATALOG_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: {
        '^/api/catalog': '/catalog',
    },
}));

// Order Service
app.use('/api/orders', createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL || 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: {
        '^/api/orders': '/orders',
    },
}));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
