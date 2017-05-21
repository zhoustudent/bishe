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
var username = $.cookie().username

$('.z-25').off().on('click', function () {


    if ($('.z-27').width() < 10) {
        $('.z-27').animate({
            width: 200,
            height: 300,
            opacity: 1
        }, 500)
    } else {
        $('.z-27').animate({
            width: 0,
            height: 0,
            opacity: 0
        }, 500)
    }


})

$('.z-106').mouseover(function () {
    $(this).addClass('pulse')
}).mouseout(function () {
    $(this).removeClass('pulse')
})
$('.z-110').mouseover(function () {
    $(this).addClass('pulse')
}).mouseout(function () {
    $(this).removeClass('pulse')
})
$('.z-106').click(function () {
   
    var datas = { username: username, id: videoId }
    datas = JSON.stringify(datas)
     console.log(datas)
    $.ajax({
        url: '/lesson-css/show',
        data: datas,
        type: 'post',
        dataType: 'json',
        success: function (res) {
            console.log(res)
            $('.z-105').fadeOut()
        }
    })

    // 同时发送请求内容是看过这个视频
})
$('.z-110').click(function(){
    $('.z-109').fadeOut()
})
var videoId = null
$('.z-104').click(function () {

    var status = $(this).parent().siblings().eq(0).html()
    videoId = $(this).attr('data-id')
    console.log(status)
    $('.z-115').html($(this).attr('data-price'))
    if (status == '免费') {



        $.get('/lesson-css/' + videoId, function (res) {
            console.log(res)
            if (res.code == 'success') {
                console.log(res.msg)
                var videourlzhui = res.msg.lastIndexOf('.')
                var videourlzhuiname = res.msg.substring(videourlzhui + 1)
                console.log(videourlzhuiname)
                $('.z-108').html("<source src='" + res.msg + "' type='video/" + videourlzhuiname + "'>")
                $('.z-105').fadeIn()
            }
        })


    } else {
        // 写收费情况
        $('.z-109').fadeIn()
        $('.z-117').attr('data-id',videoId)
    }

})


$('.z-117').off().on('click',function(){
    var addshopcar = {username:username,id:$(this).attr('data-id')}
    addshopcar = JSON.stringify(addshopcar)
    $.ajax({
        url:'/lesson-css/addshopcar',
        data: addshopcar,
        type:'post',
        dataType:'json',
        success:function(res){
            console.log(res)
            $('.login-tishi').html(res.msg)
            if(res.code == 'success'){
                 
                    $('.login-tishi').css('background', '#2bc402')
                    tishi()
                    $('.z-109').fadeOut()
            }else{
                $('.login-tishi').removeAttr('style')
                tishi()
            }
        }
    })
})
