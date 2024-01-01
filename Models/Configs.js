const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    mostVisitedServices: {
        type: [mongoose.Schema.ObjectId],
        default: [],
    },
    available: {
        type: Boolean,
        default: true,
    },
    closedMessage: {
        type: String,
        default: "",
    },
}, { timestamps: true, });

module.exports = mongoose.model('Configs', schema);