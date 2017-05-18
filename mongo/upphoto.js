var mongoose = require('mongoose')
var photoSchema = mongoose.Schema({
    username: String,
    photo: String
})
var mokeuserphoto = mongoose.model('photos',photoSchema)
module.exports = mokeuserphoto
