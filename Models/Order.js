const mongoose = require('mongoose');
const { increment } = require('./Counter');
const configs = require('../ServerConfigs/ServerConfigs.json');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User Id is required !"],
    },
    number: {
        type: Number,
        default: 0,
        index: true,
    },
    serviceId: {
        type: mongoose.Schema.ObjectId,
        ref: "Service",
        index: true,
        required: [true, "Service Id is required !"],
    },
    status: {
        type: String,
        enum: configs.orderStatus,
        default: "pending",
    },
    responsableAdmins: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Admin",
            required:[true,"Please Enter AdminId"],
        }],
        default: [],
    },

    notes: {
        type: String,
        default: "",
    },
    dateSelected: {
        type: String,
        default: null,
    },
    refuseReason: {
        type: String,
        default: null,
    },
}, { timestamps: true, });
schema.pre('save', function (next) {
    const doc = this;
    if (!doc.isNew) return next();
    increment('orders').then(function (count) {
        doc.number = count;
        next();
    });
})
module.exports = mongoose.model('Order', schema);