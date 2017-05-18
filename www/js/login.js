$(function () {
    $('.z-11').slideToggle()
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
    $('form').off().submit(function (ev) {
        ev.preventDefault()
        var datas = $(this).serialize()
        var username = $('.z-12-usrname').val()
        var passwords = $('.z-12-password').val()
        if (username == '' || passwords == '') {
            tishi()
        } else {
            console.log(datas)
            // var datas = {user : 'zhouxs'}

            $.post('/usr/login', datas, function (res) {
                console.log('123')
                console.log(res)
                if (res.code == 'false') {
                    $('.login-tishi').html(res.msg)
                    tishi()
                } else {
                    $('.login-tishi').css('background', '#2bc402')
                    $('.login-tishi').html(res.msg)
                    tishi()
                    if(res.user == 'administrators'){
                        setTimeout(function () {
                        window.location.href = 'setting.html'
                    }, 2500)
                    }else{
                        setTimeout(function () {
                        window.location.href = 'index.html'
                    }, 2500)
                    }
                    
                }

            })

        }
    })
})