const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const testProducts = [
    {
        name: 'Product 1',
        description: 'This is a description for Product 1.',
        price: 29.99,
        image: 'https://via.placeholder.com/150',
        category: 'Category 1',
    },
    {
        name: 'Product 2',
        description: 'This is a description for Product 2.',
        price: 49.99,
        image: 'https://via.placeholder.com/150',
        category: 'Category 2',
    },
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.insertMany(testProducts);
        console.log('Test data imported!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();
