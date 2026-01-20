
const calculateDeliveryDate = (pickupDate, serviceType) => {
    const date = new Date(pickupDate);
    if (serviceType === 'Express 24h') {
        date.setHours(date.getHours() + 24);
    } else if (serviceType === 'Express 48h') {
        date.setHours(date.getHours() + 48);
    } else {
        // Standard 72h
        date.setHours(date.getHours() + 72);
    }
    return date;
};

const getPriceMultiplier = (serviceType) => {
    if (serviceType === 'Express 24h') return 3.0; // +200%
    if (serviceType === 'Express 48h') return 2.0; // +100%
    return 1.0; // Standard
};

module.exports = {
    calculateDeliveryDate,
    getPriceMultiplier
};
