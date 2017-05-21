$(function () {
    console.log($.cookie())

    var username = $.cookie().username
    var user = $.cookie().user



    $.ajax({
        url: '/person/photo/' + username,
        type: 'get',
        success: function (res) {
            if (res.code == 'success') {
                $('.z-46').html("<img src='./userphoto/" + res.msg + ".jpg' ><hr>")

            } else {
                $('.z-29').css({
                    'text-align': 'center',
                    'line-height': '100px'
                })
                $('.z-29').html(res.msg)
            }
        }
    })
    $.get('/person/findmoney/'+ username,function(res){
        if(res.code == 'success'){
            $('.z-52').html('￥' + res.msg)
        }else{
            $('.z-52').html('咱去充值去吧')
        }
    })
    var username = $.cookie().username
    var user = $.cookie().user
    $('.z-45').html('亲爱的' + username + '欢迎您回家')
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


    $('.z-49').off().on('click', function () {
        $('.z-55').css('display', 'none')
        $('.z-41').css('display', 'block')
        $('.z-40').fadeIn()
    })
    $('.z-42').off().on('click', function () {
        $('.z-40').fadeOut()
    })

    $('.z-47').off().on('click', function () {
        $('.z-55').html('亲爱的，您点我千百遍，我也不会变，您充值下，我就会增长哟(^_^)')
        $('.z-41').css('display', 'none')
        $('.z-55').css('display', 'block')
        $('.z-40').fadeIn()
        setTimeout(function () {
            $('.z-40').fadeOut()
        }, 3000)
    })
})
$('.z-110').click(function(){
    $('.z-109').fadeOut()
})
$('.z-53').click(function(){
    $('.z-109').fadeIn()
})