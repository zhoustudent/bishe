var mongoose = require('mongoose')
var addshopcarSchema = mongoose.Schema({
    lessonname: String,
    username: String,
    createTime: String,
    status:String
})
var mokeshopcar = mongoose.model('shopcar',addshopcarSchema)
module.exports = mokeshopcar
