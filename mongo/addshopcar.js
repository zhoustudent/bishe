var mongoose = require('mongoose')
var addshopcarSchema = mongoose.Schema({
    lessonname: String,
    username: String,
    createTime: String,
    lessonprice:String,
    status:String,
    imageurl:String
})
var mokeshopcar = mongoose.model('shopcar',addshopcarSchema)
module.exports = mokeshopcar
