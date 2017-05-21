var express = require('express')
var router = express.Router()
var users = require('../mongo/mongo')
var shopcar = require('../mongo/addshopcar')
var usermoneys = require('../mongo/usermoney')
var shopcars = require('../mongo/addshopcar')
var mybuylessons = require('../mongo/mybuylesson')
var lessonallshow = require('../mongo/addlesson')
router.get('/shopcar.html', function (req, res) {

    shopcar.find({ username: req.cookies.username, status: '0' }, function (err, data) {
        if (!err) {
            // console.log('--------------')
            // console.log(data)
            var lengths = data.length
            console.log(lengths)
            res.render('shopCar', {
                title: '购物车',
                datas: data,
                length: lengths

            })

        }
    })

})

var moneyorange = null
router.get('/shopcar/showmoney/:username', function (req, res) {
    var usernames = req.params.username
    usermoneys.find({ username: usernames }, function (err, data) {
        if (!err) {
            if (data.length > 0) {
                if (data[0].usermoney == 0) {
                    res.json({ code: 'success', msg: '0(您的账户没钱了，想看的视频买不了了，赶紧充值下)' })
                } else {
                    moneyorange = data[0].usermoney
                    res.json({ code: 'success', msg: data[0].usermoney })
                }

            } else {
                res.json({ code: 'success', msg: '0(您还没有进行充值过，请充值后购买)' })
            }
        }
    })
})
router.post('/shopcar/passwordcheck', function (req, res) {
    var passwordcheck = JSON.parse(Object.keys(req.body))
    // console.log(passwordcheck)
    users.find(passwordcheck).exec(function (err, data) {
        if (!err) {
            console.log(data)
            if (data.length > 0) {
                res.json({ code: 'success', msg: '密码输入正确' })
            } else {
                res.json({ code: 'false', msg: '密码输入有误，请重新输入' })

            }
        }
    })
})
router.post('/shopcar/moneynow', function (req, res) {
    var moneynow = JSON.parse(Object.keys(req.body))
    // console.log(moneynow)
    usermoneys.update({ usermoney: moneyorange, username: moneynow.username }, { usermoney: moneynow.usermoney }).exec(function (err, data) {
        if (!err) {

            res.json({ code: 'success', msg: '账户更新成功' })




        } else {
            res.json({ code: 'false', msg: '系统错误，请重试' })
        }
    })
})
router.post('/shopcar/lessonupdates', function (req, res) {
    var lessonupdates = JSON.parse(Object.keys(req.body))
    // console.log(lessonupdates)
    var lessonupdatesarrId = lessonupdates.ids
    console.log(lessonupdatesarrId)
    var videocreatetime = new Date().toLocaleString()


    for (var i = 0; i < lessonupdatesarrId.length; i++) {
        shopcars.findByIdAndUpdate(lessonupdatesarrId[i], { status: '1', createTime: videocreatetime }).exec(function (err, data) {
            if (!err) {
                console.log('chenggong')

            }
        })

    }

    for (var j = 0; j < lessonupdatesarrId.length; j++) {
        shopcars.findById(lessonupdatesarrId[j], function (err, data) {
            if (!err) {

                lessonallshow.find({ lessonname: data.lessonname }, function (err, data1) {
                    if (!err) {
                        // console.log(data1)
                        var buycreatetime = new Date().toLocaleString()
                        data1[0].createTimeshow = buycreatetime
                        data1[0].username = lessonupdates.username
                       var  buysaveobj = { username: lessonupdates.username,lessonname: data1[0].lessonname,lessonaut:data1[0].lessonaut, lessonintro:data1[0].lessonintro,lessonmoneydecide:data1[0].lessonmoneydecide,lessonurl:data1[0].lessonurl,lessongrade:data1[0].lessongrade,lessondeviation:data1[0].lessondeviation,createTimeshow:buycreatetime,createTime:data1[0].createTime,lessonprice:data1[0].lessonprice}
                        console.log(buysaveobj)
                        var mybuylessons1 = new mybuylessons(buysaveobj)
                        mybuylessons1.save(function (err, data2) {
                            if (!err) {
                                console.log('jiaruwodeshipinle')
                            }
                        })
                    }
                })
            }
        })
    }


    res.json({ code: 'success', msg: '更新成功' })
})
module.exports = router