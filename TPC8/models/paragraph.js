const mongoose = require('mongoose');

var paraSchema = new mongoose.Schema({
    date: String,
    paragraph: String
})

module.exports = mongoose.model('paragraph',paraSchema,"paragraphs");