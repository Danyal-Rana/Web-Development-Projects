const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        name: { type: String, required: true, unique: true }
    },
    redirectURL: {
        name: { type: String, required: true }
    },
    visitHistory: [
        {timeStamp: {
            type: Number,
        }}
    ]
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;