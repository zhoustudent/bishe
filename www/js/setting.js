console.log($.cookie())
function tishi() {
    $('.login-tishi').animate({
        opacity: 1,
        top: 100
    }, 1000)
    setTimeout(function () {
        $('.login-tishi').animate({
            opacity: 0,
            top: -20
        }, 1000)
    }, 1500)
}
$('.asdExit').off().on('click', function () {
    $('.exit').css('display', 'block')
})
$('.exit-4').off().on('click', function () {
    $('.exit').css('display', 'none')
})
$('.exit-3').off().on('click', function () {
    $.get('/user/signout', null, function (res) {
        console.log(res)
        $('.login-tishi').css('background', '#2bc402')
        $('.login-tishi').html(res.msg)
        if (res.code == 'success') {
            function tishi() {
                $('.login-tishi').animate({
                    opacity: 1,
                    top: 100
                }, 1000)
                setTimeout(function () {
                    $('.login-tishi').animate({
                        opacity: 0,
                        top: -20
                    }, 1000)
                    setTimeout(function () {
                        $('.weideng').show()
                        $('.yonghu').remove()
                        location.href = 'login.html'
                    }, 1000)
                }, 1500)
            }
            tishi()

        }
    })
})
$('.ads-registList').click(function () {
    $('.ads-registLists').css('display', 'block').siblings().css('display', 'none')
})
$('.ads-registerZhe').click(function () {
    $('.ads-registerZhes').css('display', 'block').siblings().css('display', 'none')
})
$('.ads-addlesson').click(function () {
    $('.ads-addlessons').css('display', 'block').siblings().css('display', 'none')
})
$('.ads-nowlesson').click(function () {
    $('.ads-nowlessons').css('display', 'block').siblings().css('display', 'none')
})
$('.ads-userzhanghu').click(function () {
    $('.ads-userzhanghus').css('display', 'block').siblings().css('display', 'none')
})
$('.ads-recharge').click(function () {
    $('.ads-recharges').css('display', 'block').siblings().css('display', 'none')
})

$('.ads-goulesson').click(function () {
    $('.ads-goulessons').css('display', 'block').siblings().css('display', 'none')
})

$('.ads-allmoney').click(function () {
    $.get('/adsallmoney/chaxun', null, function (res) {
        console.log(res)
        if (res.code == 'success') {
            $('.ads-allmoneys-show').html('￥' + res.msg)
        }
    })
    $('.ads-allmoneys').css('display', 'block').siblings().css('display', 'none')
})




var myChart = echarts.init(document.getElementById('main'));
// 显示标题，图例和空的坐标轴
myChart.setOption({
    title: {
        text: '用户注册实时更新折线图'
    },
    tooltip: { trigger: 'axis' },
    legend: {
        data: ['人数']
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'line',
        data: []
    }]
});

$.get('/adsuserlist/zhe', null, function (res) {
    if (res.code == 'success') {
        //console.log(res.msg[0]['createTime'])

        var obj = {}
        for (var i = 0; i < res.msg.length; i++) {
            var value = res.msg[i]['createTime']
            // console.log(value)
            if (obj[value]) {
                obj[value] = obj[value] + 1
            } else {
                obj[value] = 1
            }
        }
        console.log(obj)
        // 从对象中获取所有的key值
        //console.log(Object.keys(obj))
        var arrArr = []
        for (var j in obj) {
            // console.log(obj[j])
            arrArr.push(obj[j])
        }
        console.log(arrArr)

        myChart.setOption({
            xAxis: {
                data: Object.keys(obj)
            },
            series: [{
                // 根据名字对应到相应的系列
                name: '同时间注册人数',
                data: arrArr

            }]
        });


    }
})



// 增添新课程
$('#addlessonfirst').submit(function (ev) {
    ev.preventDefault()
    var datas = $(this).serialize()
    // console.log(datas)
    console.log($('#lessonprice').val())
    if ($('#lessonprice').val() < 0) {
        $('.login-tishi').html('您输入的价格小于0')
        tishi()
    } else {
        if ($('input:radio[name="lessonmoneydecide"]:checked').val() == '免费') {
            if ($('#lessonprice').val() > 0) {
                console.log($('#lessonprice').val())
                $('.login-tishi').html('免费课程下您的课程价格应该为0')
                tishi()
            } else {
                $.post('/addnewlesson/first', datas, function (res) {
                    console.log(res)
                    if (res.code == 'success') {
                        $('.progress-bar-success').animate({
                            width: '70%'
                        }, 1000)
                        $('.addformfirst').fadeOut()
                        $('.addformsecond').fadeIn()
                    } else {
                        $('.login-tishi').html(res.msg)
                        tishi()
                    }
                })
            }
        } else {
            $.post('/addnewlesson/first', datas, function (res) {
                console.log(res)
                if (res.code == 'success') {
                    $('.progress-bar-success').animate({
                        width: '70%'
                    }, 1000)
                    $('.addformfirst').fadeOut()
                    $('.addformsecond').fadeIn()
                } else {
                    $('.login-tishi').html(res.msg)
                    tishi()
                }
            })
        }
    }

})
// 添加新课程第二步
$('#addlessonsecond').submit(function (ev) {
    ev.preventDefault()



    var data = new FormData(this)
    $.post({
        url: '/addnewlesson/second',
        data: data,
        contentType: false,  //默认的格式是 application/x-www-form-urlencoded
        processData: false, // 默认发送到服务器的数据，会发生数据转换，防止自动转换数据格式
        success: function (res) {


            if (res.code == 'success') {
                $('.progress-bar-success').animate({
                    width: '100%'
                }, 1000)
                $('.login-tishi').html(res.msg)
                $('.login-tishi').css('background', '#2bc402')
                tishi()
                setTimeout(function () {
                    window.location.reload()
                }, 3000)

            } else {
                $('.login-tishi').html(res.msg)
                tishi()
                console.log('2222')
            }


        },
        error: function () {
            $('.login-tishi').html('系统异常请重试')
            tishi()
            console.log('333')
        }
    })
})
$('.lessondel').click(function () {
    var thisId = $(this).parent().siblings().eq(1).html()


    $('.z-40').css('display', 'block')


    $('.z-43').click(function () {
        $.get('/lessondel/' + thisId, function (res) {
            if (res.code == 'success') {
                $('.login-tishi').html(res.msg)
                $('.login-tishi').css('background', '#2bc402')
                tishi()
                setTimeout(function () {
                    window.location.reload()
                }, 3000)
            }
        })
    })

})
$('.z-42').off().on('click', function () {
    $('.z-40').css('display', 'none')
})

$('.addsubmon').click(function () {
    var thisuser = $(this).parent().siblings().eq(2).html()

    var addprice = $(this).parent().siblings().eq(3).children('input')
    if (addprice.val() > 0) {
        var moneyobj = { username: thisuser, usermoney: addprice.val() }
        console.log(moneyobj)
        moneyobj = JSON.stringify(moneyobj)
        $.ajax({
            url: '/adsmoney/usermoney',
            data: moneyobj,
            type: 'post',
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.code == 'success') {
                    $('.login-tishi').html(res.msg)
                    $('.login-tishi').css('background', '#2bc402')
                    tishi()
                }
            }

        })
    } else {
        $('.login-tishi').html('您输入的金额小于等于0')
        tishi()
    }
})

