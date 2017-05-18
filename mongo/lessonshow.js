var mongoose = require('mongoose')
var lessonshowSchema = mongoose.Schema({
    username: String,
    videoname: String,
    videocreateTime:String,
    videoupdateshowTime: String
})
var mokelessonshow = mongoose.model('lessonshow',lessonshowSchema)
module.exports = mokelessonshow
