var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    title: String,
    review: String,
    rating: Number,
    user: String,
    updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', ReviewSchema);