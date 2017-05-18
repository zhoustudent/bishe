var express = require('express')
var bodyParser = require('body-parser')
var user = require('../mongo/mongo')
var usermoney = require('../mongo/usermoney')
var router = express.Router()


router.get('/person/findmoney/:username',function(req,res){
    var username = req.params.username
    usermoney.find({username:username},function(err,data){
        if(!err){
            if(data.length > 0){
                res.json({code:'success',msg:data[0].usermoney})
            }else{
                res.json({code:'false',msg:'没有此账户金库'})
            }
        }
    })
})


module.exports = router