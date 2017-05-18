var express = require('express')
var bodyParser = require('body-parser')
var user = require('../mongo/mongo')
var router = express.Router()


router.post('/usr/login', function (req, res) {
    console.log('--------------')
    console.log(req.body)
    if (req.body.username == '13298310629' && req.body.password == '123456') {
        res.cookie('username', req.body.username)
        res.cookie('user', 'administrators')
        res.json({ code: 'success', msg: '尊敬的管理员您好',user:'administrators' })
    } else {
        user.find(req.body).exec(function (err, data) {
            if (!err) {
                if (data.length == 0) {
                    console.log('该用户名未注册')
                    res.json({ code: 'false', msg: '该用户名未注册请重新输入' })
                } else {
                    res.cookie('username', req.body.username)
                    res.cookie('user', 'customer')
                    res.json({ code: 'success', msg: '登录成功,即将进入首页' ,user:'customer' })
                }
            }
        })
    }

})
module.exports = router