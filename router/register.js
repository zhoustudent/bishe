var express = require('express')
var bodyParser = require('body-parser')
var user = require('../mongo/mongo')
var router = express.Router()

router.post('/user/register', function (req, res) {
    console.log(req.body)

    user.find({ username: req.body.username}).exec(function (err, datas) {
        console.log(datas.length)
        if (!err) {
            if (datas.length > 0) {
     
                 res.json({ code: 'false', msg: '该用户已被注册' })
            } else {
                user.find({email: req.body.email}).exec(function(err,dadtas){
                    if(!err){
                        if(dadtas.length > 0){
                            res.json({code:'false',msg:'一个邮箱只能注册一次，请使用其他邮箱地址'})
                        }else{
                            req.body.createTime = new Date().toLocaleString()
                            console.log(req.body)
                            var user1 = new user(req.body)
                            user1.save(function (err, data) {
                                if (!err) {
                                    console.log('用户注册成功')
                                    res.json({ code: 'success', msg: '注册成功，3秒后跳转至登录界面' })
                                } else {
                                    console.log('用户注册失败')
                                    res.json({ code: 'false', msg: '系统错误请重新注册' })
                                }
                            })
                        }
                    }
                })
                
               
            }
        }
    })

})

module.exports = router