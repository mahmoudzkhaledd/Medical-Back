const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
        required: [true, "Admin Id is required !"],
    },
    serviceId: {
        type: mongoose.Schema.ObjectId,
        ref: "Service",
    },
    type: {
        type: String,
        enum: ["thumbnail", 'image',"profileImage"],
    },
    asset_id: String,
    public_id: String,
    version: String,
    version_id: String,
    signature: String,
    width: Number,
    height: Number,
    format: String,
    resource_type: String,
    created_at: String,
    tags: [String],
    bytes: Number,
    type: String,
    etag: String,
    placeholder: Boolean,
    url: String,
    secure_url: String,
    folder: String,
    original_filename: String,
    api_key: String,
}, { timestamps: true, });

module.exports = mongoose.model('Image', schema);