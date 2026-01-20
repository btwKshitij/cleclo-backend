const express = require('express');
const cors = require('cors');
const orderRoutes = require('./src/routes/orderRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
// Serve uploaded images static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/orders', orderRoutes);
app.use('/admin/orders', require('./src/routes/adminOrderRoutes'));
app.use('/vendor/orders', require('./src/routes/vendorOrderRoutes'));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Order Service is running' });
});

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});
