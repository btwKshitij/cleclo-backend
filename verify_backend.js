const http = require('http');

const ports = [3000, 3001, 3002, 3003];
const serviceNames = {
    3000: 'API Gateway',
    3001: 'Auth Service',
    3002: 'Catalog Service',
    3003: 'Order Service'
};

const checkPort = (port) => {
    return new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}/health`, (res) => {
            if (res.statusCode === 200) {
                resolve(`${serviceNames[port]} is UP`);
            } else {
                reject(`${serviceNames[port]} returned status ${res.statusCode}`);
            }
        });
        req.on('error', (err) => {
            reject(`${serviceNames[port]} is DOWN (or not started yet)`);
        });
        req.end();
    });
};

const verify = async () => {
    console.log('Verifying services...');
    for (const port of ports) {
        try {
            const msg = await checkPort(port);
            console.log(`✅ ${msg}`);
        } catch (err) {
            console.log(`❌ ${err}`);
        }
    }
};

verify();
