const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
});

const categorySchema = mongoose.Schema({
    categoryId: {
        type: Number,
        required: true
    },
    products: {
        type: [productSchema],
        required: true
    },
    total: {
        type: Number,
    }
});

const Categories = mongoose.model('Categories', categorySchema);

module.exports = Categories;
