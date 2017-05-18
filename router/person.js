var express = require('express')
var multer = require('multer')
var user = require('../mongo/mongo')
var upphoto = require('../mongo/upphoto')
var router = express.Router()


var timestamp = null
//----------------保存上传文件------------------
var storage = multer.diskStorage({
    destination: 'www/userphoto',
    filename: function (req, file, cb) {
        timestamp = (new Date()).valueOf()
        cb(null, timestamp + '.jpg')
    }
})
var uploads = multer({ storage })
//------------------文件上传请求-----------------------------
router.post('/users/protect', uploads.single('photo'), function (req, res) {
    res.cookie('userphoto', timestamp)
    var photodata = { username: req.cookies.username, photo: timestamp }
    upphoto.find({ username: req.cookies.username }).exec(function (err, datas) {

        if (!err) {
            if (datas.length > 0) {
                var dataId = datas[0]
                upphoto.findByIdAndUpdate(dataId._id, photodata).exec(function (err, data) {
                    if (!err) {
                        res.status(200).json({ code: 'success', msg: '头像更新成功' })
                    }
                })
            } else {
                var upphoto1 = new upphoto(photodata)
                upphoto1.save(function (err, data) {
                    if (!err) {
                        res.status(200).json({ code: 'success', msg: '头像上传成功' })
                    }
                })
            }
        }
    })








})
router.get('/person/photo/:username', function (req, res) {
    var username = req.params.username
    upphoto.find({ username: username }).exec(function (err, data) {
        if (!err) {
            if (data.length > 0) {
                var datas = data[0]
                res.json({ code: 'success', msg: datas.photo })
            }else{
                res.json({code:'false',msg:'请上传头像'})
            }

        }
    })

})


router.post('/upusername/update', function (req, res) {
    user.find({ username: req.body.newusername }).exec(function (err, data) {
        if (!err) {
            if (data.length > 0) {
                res.json({ code: 'false', msg: '该用户名已存在，请更换新用户名' })
            } else {
                user.update({ username: req.body.oldusername }, { username: req.body.newusername }).exec(function (err, data) {
                    if (!err) {
                        upphoto.update({ username: req.body.oldusername }, { username: req.body.newusername }).exec(function (err, data) {
                            if (!err) {
                                res.cookie('username', req.body.newusername)
                                res.json({ code: 'success', msg: '用户名更新成功' })
                            } else {
                                res.json({ code: 'false', msg: '系统错误请重试' })
                            }
                        })
                    } else {
                        res.json({ code: 'false', msg: '系统错误请重试' })
                    }
                })

            }
        }
    })

})

router.post('/uppassword/update', function (req, res) {
    user.find({ username: req.cookies.username, password: req.body.oldpassword }).exec(function (err, data) {
        if (!err) {
            if (data.length > 0) {
                var passworddata = data[0]
                user.findByIdAndUpdate(passworddata._id, { password: req.body.newpassword }).exec(function (err, data) {
                    if (!err) {
                        console.log('更改密码成功')
                        res.json({ code: 'success', msg: '更改密码成功' })
                    }
                })
            } else {
                res.json({ code: 'false', msg: '您输入原始的密码不正确，请重新输入' })

            }
        }
    })

})
router.get('/show/:username', function (req, res) {
    var username = req.params.username
    user.find({ username: username }).exec(function (err, data) {
        if (!err) {
            var datas = data[0]
            res.json({ code: 'success', msg: datas })
        }
    })

})

module.exports = router