$(function () {
    console.log($.cookie())

    var username = $.cookie().username
    var user = $.cookie().user
    var userphoto = $.cookie().userphoto

    $('#oldusername').val(username)
    $.ajax({
        url: '/person/photo/' + username,
        type: 'get',
        success: function (res) {
            if (res.code == 'success') {
                $('.z-29').html("<img src='./userphoto/" + res.msg + ".jpg' >")

            }else{
                $('.z-29').css({
                    'text-align':'center',
                    'line-height':'100px'
                })
                $('.z-29').html(res.msg)
            }
        }
    })



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

    $('.z-29').off().on('click', function () {
        if ($('.z-35').hasClass('slideInRight')) {
            $('.z-35').removeClass('slideInRight')
            $('.z-35').addClass('bounceOut')
            $('.z-35').animate({
                opacity: 0
            }, 1000)


            $('.z-36').removeClass('slideInUp')
            $('.z-36').addClass('bounceOut')
            $('.z-36').animate({
                opacity: 0
            }, 1000)

            $('.z-37').removeClass('slideInLeft')
            $('.z-37').addClass('bounceOut')
            $('.z-37').animate({
                opacity: 0
            }, 1000)
            $('.z-38').removeClass('slideInDown')
            $('.z-38').addClass('bounceOut')
            $('.z-38').animate({
                opacity: 0
            }, 1000)

        } else {
            $('.z-35').removeClass('bounceOut')
            $('.z-35').addClass('slideInRight')
            $('.z-35').animate({
                opacity: 1
            }, 1000)


            $('.z-36').removeClass('bounceOut')
            $('.z-36').addClass('slideInUp')
            $('.z-36').animate({
                opacity: 1
            }, 1000)
            $('.z-37').removeClass('bounceOut')
            $('.z-37').addClass('slideInLeft')
            $('.z-37').animate({
                opacity: 1
            }, 1000)
            $('.z-38').removeClass('bounceOut')
            $('.z-38').addClass('slideInDown')
            $('.z-38').animate({
                opacity: 1
            }, 1000)

        }

    })

    $('.z-35').off().on('click', function () {
        $('.z-40').fadeIn()
    })
    $('.z-42').off().on('click', function () {
        $('.z-40').fadeOut()
    })


    $('#upphoto').submit(function (ev) {
        ev.preventDefault()
        var data = new FormData(this)
        $.post({
            url: '/users/protect',
            data: data,
            contentType: false,  //默认的格式是 application/x-www-form-urlencoded
            processData: false, // 默认发送到服务器的数据，会发生数据转换，防止自动转换数据格式
            success: function (res) {

                console.log('1111')
                console.log(res)
                if (res.code == 'success') {
                    $('.login-tishi').html(res.msg)
                    $('.login-tishi').css('background', '#2bc402')
                    tishi()
                    setTimeout(function () {
                        location.reload()
                    }, 3000)

                } else {
                    $('.login-tishi').html('系统异常请重试')
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


    $('.z-36').off().on('click', function () {
        $('.z-56').fadeIn()
    })
    $('.z-59').off().on('click', function () {
        $('.z-56').fadeOut()
    })

    $('#upusername').submit(function (ev) {
        ev.preventDefault()
        var data = $(this).serialize()
        $.post('/upusername/update', data, function (res) {
            $('.login-tishi').html(res.msg)
            if (res.code == 'success') {

                $('.login-tishi').css('background', '#2bc402')
                tishi()
                setTimeout(function () {
                    location.reload()
                }, 3000)
            } else {

                tishi()
            }

        })
    })



    $('.z-37').off().on('click', function () {
        $('.z-61').fadeIn()
    })
    $('.z-64').off().on('click', function () {
        $('.z-61').fadeOut()
    })


    $('#uppassword').submit(function (ev) {
        ev.preventDefault()
        var data = $(this).serialize()
        var pass = $(':password').map(function () {
            return $(this).val()
        })
        if (pass[0] == pass[1]) {
            $('.login-tishi').html('您的新密码不能与原密码一致，请重新输入')
            tishi()
        } else {
            $.post('/uppassword/update', data, function (res) {
                $('.login-tishi').html(res.msg)
                if (res.code == 'success') {

                    $('.login-tishi').css('background', '#2bc402')
                    tishi()
                    setTimeout(function () {
                        location.reload()
                    }, 3000)
                } else {

                    tishi()
                }

            })
        }

    })


    $('.z-38').off().on('click', function () {
        
        $.get('/show/'+ $.cookie().username,function(res){
            if(res.code == 'success'){
                console.log(res.msg)
                $('.z-73').val(res.msg._id)
                $('.z-67').val(res.msg.username)
                $('.z-68').val(res.msg.email)
                $('.z-72').fadeIn()
            }
        })
        
        
        
        
    })
    $('.z-70').off().on('click', function () {
        $('.z-72').fadeOut()
    })

    
})