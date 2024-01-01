const mongoose = require('mongoose');
const { increment, decrement } = require('./Counter');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "First Name is required!"]
    },
    number: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    address: {
        type: String,
        default: '',
        maxLength: 200,
    },
    city: {
        type: String,
        default: '',
        maxLength: 100,
    },
    street: {
        type: String,
        default: '',
        maxLength: 100,
    },
    phone: {
        type: String,
        required: [true, "Phone is required!"]
    },
    gender: {
        type: Boolean,
        required: [true, "Gender is required!"]
    },
    verifiedEmail: {
        type: Boolean,
        default: false,
    },
    banned: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true, });
schema.pre('save', function (next) {
    const doc = this;
    if (!doc.isNew) return next();
    increment('users').then(function (count) {
        doc.number = count;
        next();
    });
}) 
module.exports = mongoose.model('User', schema);