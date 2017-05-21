var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var template = require('art-template')
var cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('www'))


// 解析cookie
app.use(cookieParser())
//解析模板
app.engine('.html', template.__express)
app.set('view engine', 'html')
template.config('cache', false)

// 清除cookie
app.get('/user/signout', function (req, res) {

    res.clearCookie('user')
    res.clearCookie('username')
    res.json({code:'success',msg:'退出成功'})
    console.log('222')
})


app.use(require('./router/login'))
app.use(require('./router/register'))
app.use(require('./router/person'))
app.use(require('./router/shopcar'))
app.use(require('./router/setting'))
app.use(require('./router/mymoney'))
app.use(require('./router/lesson-css'))
app.use(require('./router/lesson-html'))
app.use(require('./router/lesson-js'))
app.use(require('./router/lesson-vue'))
app.use(require('./router/mybuylesson'))
app.use(require('./router/viewed'))

app.listen(3000, function () {
    console.log('监听端口为3000')
})