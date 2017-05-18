var mongoose = require('mongoose')
var usermoneySchema = mongoose.Schema({
    username: String,
    usermoney: String
    
})
var mokeusermoney = mongoose.model('usermoney',usermoneySchema)
module.exports = mokeusermoney
