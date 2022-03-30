var mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({
    date: Date,
    file: String,
    size: Number,
    type: String,
    text: String
})

module.exports = mongoose.model('file', fileSchema, 'files')