const mongoose = require('mongoose');
const { increment, decrement } = require('./Counter');

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
        required: [true, "Admin Id is required !"],
    },
    number: {
        type: Number,
        default: 0,
    }, 
    doneOrders: {
        type: Number,
        default: 0,
    }, 
    pendingOrders: {
        type: Number,
        default: 0,
    }, 
    name: {
        type: String,
        required: [true, "Name is required !"],
        trim: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: [true, "Category is required !"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required !"],
    },
    thumbnailImage: {
        type: mongoose.Schema.ObjectId,
        ref: "Image",
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
    subDescription: {
        type: String,
        default: "",
        trim: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true, });
schema.pre('save', function (next) {
    const doc = this;
    if (!doc.isNew) return next();
    increment('services').then(function (count) {
        doc.number = count;
        next();
    });
})


module.exports = mongoose.model('Service', schema);