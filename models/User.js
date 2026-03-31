'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    subscriptionStatus: {
        type: String,
        enum: ['free', 'premium'],
        default: 'free',
    },
    conversionHistory: [{
        conversionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversion',
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
