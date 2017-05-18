var express = require('express')
var router = express.Router()
var user = require('../mongo/mongo')
router.get('/shopcar.html', function (req, res) {

    user.find( function (err, data) {
        if (!err) {
            console.log('--------------')
            console.log(data)
            var lengths = data.length
            console.log(lengths)
            res.render('shopCar', {
                title: '购物车',
                datas:data,
                length:lengths
                
            })

        }
    })
    
})
    
    
module.exports = router