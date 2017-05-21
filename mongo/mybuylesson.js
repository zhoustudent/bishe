var mongoose = require('mongoose')
var buylessonSchema = mongoose.Schema({
    username:String,
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
var mokeuserbuyoverlesson = mongoose.model('userbuyoverlesson',buylessonSchema)
module.exports = mokeuserbuyoverlesson