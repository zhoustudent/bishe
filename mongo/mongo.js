var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/zixue')
var db = mongoose.connection
db.on('error',function(){
    console.log('数据库连接失败')
})
db.once('open',function(){
    console.log('数据库连接成功，请使用')
})
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createTime: String
})
var mokeuser = mongoose.model('users',userSchema)
module.exports = mokeuser
