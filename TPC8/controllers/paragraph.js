var Paragraph = require('../models/paragraph')
var mongoose = require('mongoose')

module.exports.listar = function (){
    return Paragraph.find().exec()
}

module.exports.inserir = function (p){
    var d = new Date().toISOString().substring(0,16)
    p.date = d
    var par = new Paragraph(p)
    return par.save()
}

module.exports.delete = function(id) {
    return Paragraph.deleteOne({_id: mongoose.Types.ObjectId(id)}).exec()
}

module.exports.edit = async function(id,data) {
    var p = await Paragraph.findOne({_id: mongoose.Types.ObjectId(id)}).exec()
    p.date = new Date().toISOString().substring(0,16)
    p.paragraph = data.paragraph
    return p.save()
}