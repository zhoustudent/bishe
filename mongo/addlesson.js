var mongoose = require('mongoose')
var lessonSchema = mongoose.Schema({
    lessonname: String,
    lessonaut: String,
    lessonintro: String,
    lessonmoneydecide: String,
    lessonurl: String,
    lessongrade: String,
    lessondeviation:String,
    createTime: String,
    createTimeshow: String,
    lessonprice:String
})
var mokeuserlesson = mongoose.model('lessonfirst',lessonSchema)
module.exports = mokeuserlesson
