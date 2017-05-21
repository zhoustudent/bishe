var express = require('express')
var multer = require('multer')
var router = express.Router()
var user = require('../mongo/mongo')
var addlesson = require('../mongo/addlesson')
var usermoney = require('../mongo/usermoney')
var addshopcar = require('../mongo/addshopcar')
var mybuylesson = require('../mongo/mybuylesson')
router.get('/setting.html', function (req, res) {

    user.find(function (err, data) {

        if (!err) {
            //console.log('--------------')
            var lengthAll = []
            var lengths = data.length
            lengthAll.push(lengths)
            var dataAll = []
            dataAll.push(data)
            addlesson.find(function (err, data2) {
                if (!err) {
                    var lengths2 = data2.length
                    lengthAll.push(lengths2)
                    dataAll.push(data2)

                    usermoney.find(function (err, data3) {
                        if (!err) {
                            var length3 = data3.length
                            lengthAll.push(length3)
                            dataAll.push(data3)

                            addshopcar.find({ status: '1' }).exec(function (err, data3) {
                                if (!err) {
                                    var length3 = data3.length
                                    lengthAll.push(length3)
                                    dataAll.push(data3)
                                    addshopcar.find({ status: '0' }).exec(function (err, data4) {
                                        if (!err) {
                                            var length4 = data3.length
                                            lengthAll.push(length4)
                                            dataAll.push(data4)
                                            res.render('setting', {
                                                title: '管理员中心',
                                                datas: dataAll,
                                                length: lengthAll
                                            })
                                        }
                                    })



                                }
                            })



                        }
                    })



                }
            })

            // //console.log(data)

            // //console.log(lengths)
            // res.render('setting', {
            //     title: 'user',
            //     datas: data,
            //     length: lengths

            // })

        }
    })

})
var timestamp = null
var productmess = null
var storage = multer.diskStorage({
    destination: 'www/productphoto',
    filename: function (req, file, cb) {
        timestamp = (new Date()).valueOf()
        cb(null, timestamp + '.jpg')
    }
})
var uploads = multer({ storage })

router.post('/addnewlesson/second', uploads.single('photo'), function (req, res) {
    //console.log('--+-------------------------------')
    //console.log(timestamp)
    productmess.createTimeshow = new Date().toLocaleString()
    productmess.createTime = timestamp
    //console.log(productmess)
    var addlessonfirst = new addlesson(productmess)
    addlessonfirst.save(function (err, data) {
        if (!err) {
            //console.log('课程创建成功')
            res.json({ code: 'success', msg: '课程创建成功' })
        } else {
            res.json({ code: 'false', msg: '系统异常，请重新创建' })
        }
    })

})


router.get('/adsuserlist/zhe', function (req, res) {
    user.find(function (err, data) {
        if (!err) {
            // //console.log(data)
            // //console.log('55555')
            res.json({ code: 'success', msg: data })
        }
    })
})
router.post('/addnewlesson/first', function (req, res) {
    // //console.log(req.body)
    addlesson.find({ lessonname: req.body.lessonname }, function (err, data) {
        if (!err) {
            if (data.length > 0) {
                res.json({ code: 'false', msg: '该课程名称已被使用，请重新创建' })
            } else {
                productmess = req.body
                res.json({ code: 'success', msg: '后端已保存部分信息' })
            }
        } else {
            res.json({ code: 'false', msg: '系统异常，请重新创建' })
        }
    })
})


router.get('/lessondel/:lessonId', function (req, res) {
    var username = req.params.lessonId
    console.log(username)
    addlesson.findById(username).exec(function (err, data) {
        if (!err) {
            console.log(data.lessonname)
            addshopcar.remove({ lessonname: data.lessonname }).exec(function (err) {
                if (!err) {
                    console.log('购物车删除成功')
                    mybuylesson.remove({ lessonname: data.lessonname }).exec(function (err) {
                        if (!err) {
                            console.log('我的视频删除成功')
                            addlesson.findByIdAndRemove(username, function (err) {
                                console.log('总表删除成功')
                                res.json({ code: 'success', msg: '删除成功' })
                            })
                        }
                    })
                }
            })
        }
    })
})
router.get('/adsallmoney/chaxun', function (req, res) {
    usermoney.find(function (err, data) {
        if (!err) {
            var moneyall = []
            for (var i = 0; i < data.length; i++) {
                moneyall.push(data[i].usermoney)
            }
            var moneyallstr = null
            for (var j = 0; j < moneyall.length; j++) {
                var zhengnum = parseInt(moneyall[j])
                moneyallstr += zhengnum
            }
            console.log(moneyallstr)
            res.json({ code: 'success', msg: moneyallstr })
        }
    })

    // 未完待续


})


router.post('/adsmoney/usermoney', function (req, res) {
    var usermoney1 = JSON.parse(Object.keys(req.body)[0])
    console.log(usermoney1)
    usermoney.find({ username: usermoney1.username }, function (err, data) {
        if (!err) {
            if (data.length > 0) {
                usermoney.update({ username: usermoney1.username }, { usermoney: usermoney1.usermoney }).exec(function (err, dataa) {
                    if (!err) {
                        console.log('账户余额更新成功')
                        res.json({ code: 'success', msg: '账户余额更新成功' })

                    }
                })
            } else {
                var usermoney2 = new usermoney(usermoney1)
                usermoney2.save(function (err, datas) {
                    if (!err) {
                        console.log('保存账户钱成功')
                        res.json({ code: 'success', msg: '账户余额创建并保存成功' })
                    }
                })
            }
        }
    })
})


module.exports = router