var express = require('express')
var router = express.Router()
var user = require('../mongo/mongo')
var addlesson = require('../mongo/addlesson')
var lessonshow = require('../mongo/lessonshow')
var shopcar = require('../mongo/addshopcar')
router.get('/lesson-html.html', function (req, res) {

    addlesson.find({lessondeviation:'HTML'}).exec( function (err, data) {
        if (!err) {
            // console.log(data)
            var lengths = data.length
            res.render('lesson-html', {
                title: 'CSS专区',
                datas:data,
                length:lengths
                
            })

        }
    })
    
    
})

router.get('/lesson-html/:videoId',function(req,res){
    var videoId = req.params.videoId
    // console.log(videoId)
    addlesson.findById(videoId,function(err,data){
        if(!err){
            // console.log(data)
            res.json({code:'success',msg:data.lessonurl})
            
        }
    })
    
})
router.post('/lesson-html/show',function(req,res){
   
    var videomess = JSON.parse(Object.keys(req.body))
    var videoIds = videomess.id

    addlesson.findById(videoIds,function(err,data){
        if(!err){

            var videoname = data.lessonname
            lessonshow.find(videomess[0],function(err,datas){
                if(!err){
                    if(datas.length > 0){
                        // lessonshow.up
                        var mongomess = {username:videomess.username,videoname:data.lessonname}
                        var videouptime = new Date().toLocaleString()
                        lessonshow.update(mongomess,{videoupdateshowTime:videouptime}).exec(function(err,datad){
                            if(!err){
                                res.json({code:'success',msg:'最新观看时间保存成功'})
                            }
                        })
                        
                        
                    }else{
                        var mongomess = {username:videomess.username,videoname:data.lessonname}
                        var videocreatetime = new Date().toLocaleString()
                        mongomess.videocreateTime = videocreatetime
                        mongomess.videoupdateshowTime = videocreatetime
                        var lessonshow1 = new lessonshow(mongomess)
                        lessonshow1.save(function(err,dataa){
                            if(!err){
                                console.log('观看记录已生成')
                                res.json({code:'success',msg:'第一次观看记录生成'})
                            }
                        })
                    }
                }
            })
            
        }
    })
    
})

router.post('/lesson-html/addshopcar',function(req,res){
    var addshopcar = JSON.parse(Object.keys(req.body))
    var addshopcarvideoId = addshopcar.id
    addlesson.findById(addshopcarvideoId,function(err,data){
        if(!err){
            console.log(data)
            // 视频详细信息
            var shopcarevery = {username:addshopcar.username,lessonname:data.lessonname}
            console.log(shopcarevery)
            shopcar.find(shopcarevery,function(err,dataf){
                if(!err){
                    if(dataf.length > 0){
                        res.json({code:'false',msg:'您已将此视频加入购物车或者以够买过此视频，请勿重复操作'})
                    }else{
                        var createTime = new Date().toLocaleString()
                        shopcarevery.createTime = createTime
                        shopcarevery.lessonprice = data.lessonprice
                        shopcarevery.status = 0
                        shopcarevery.imageurl = data.createTime
                        var addshopcar1 = new shopcar(shopcarevery)
                        addshopcar1.save(function(err,datag){
                            if(!err){
                                res.json({code:'success',msg:'您以将此视频加入购物车，请到购物车中结算'})
                            }
                        })
                    }
                }
            })
        }
    })
})

    
    
module.exports = router