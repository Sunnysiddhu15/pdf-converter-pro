const mongoose = require('mongoose');

const conversionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    conversionType: {
        type: String,
        required: true
    },
    fileNames: {
        type: [String],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Conversion = mongoose.model('Conversion', conversionSchema);

module.exports = Conversion;