var express = require('express')
var router = express.Router()
var user = require('../mongo/mongo')
var addlesson = require('../mongo/addlesson')
var lessonshow = require('../mongo/lessonshow')
var shopcar = require('../mongo/addshopcar')
router.get('/viewed.html', function (req, res) {

    lessonshow.find({username:req.cookies.username}).exec( function (err, data) {
        if (!err) {
            // console.log(data)
            var lengths = data.length
            res.render('viewed', {
                title: '观看记录',
                datas:data,
                length:lengths
                
            })

        }
    })
    
    
})



    
    
module.exports = router