var express = require('express')
var router = express.Router()
var user = require('../mongo/mongo')
var addlesson = require('../mongo/addlesson')
var lessonshow = require('../mongo/lessonshow')
var shopcar = require('../mongo/addshopcar')
var mybuylessons = require('../mongo/mybuylesson')
router.get('/mybuylesson.html', function (req, res) {

    mybuylessons.find().exec( function (err, data) {
        if (!err) {
            // console.log(data)
            var lengths = data.length
            res.render('mybuylesson', {
                title: '购买视频',
                datas:data,
                length:lengths
                
            })

        }
    })
    
    
})

router.get('/mybuylesson/:videoId',function(req,res){
    var videoId = req.params.videoId
    // console.log(videoId)
    mybuylessons.findById(videoId,function(err,data){
        if(!err){
            // console.log(data)
            res.json({code:'success',msg:data.lessonurl})
            
        }
    })
    
})
router.post('/mybuylesson/show',function(req,res){
   
    var videomess = JSON.parse(Object.keys(req.body))
    var videoIds = videomess.id

    mybuylessons.findById(videoIds,function(err,data){
        if(!err){
            console.log(data)
            var videoname = data.lessonname
            lessonshow.find(videomess,function(err,datas){
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



    
    
module.exports = router