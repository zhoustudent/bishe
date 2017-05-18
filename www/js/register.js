
$(function () {
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
    $('form').submit(function (ev) {
        ev.preventDefault()

        var pass = $(':password').map(function () {
            return $(this).val()
        })

        if (pass[0] == pass[1]) {
            var data = $(this).serialize()
            $.post('/user/register', data, function (res) {
                console.log('1111')
                //alert{res.message}
                console.log(res.code)

                if (res.code == 'success') {

                    $('.login-tishi').html(res.msg)
                    $('.login-tishi').css('background', '#2bc402')
                    $('.login-tishi').animate({
                        opacity: 1,
                        top: 100
                    }, 1000)
                    var a = 3
                    setTimeout(function () {
                        setInterval(function(){
                            a--
                            console.log(a)
                             $('.login-tishi').html('注册成功,' + a + '秒后跳转到登录界面')
                            
                        },1000)
                        setTimeout(function() {
                            location.href = 'login.html'
                        }, 3000);
                        
                    }, 1000)

                } else {
                    $('.login-tishi').html(res.msg)
                    tishi()
                }
            })
        } else {
            $('.login-tishi').html('您输入的两次密码不一致请重新输入')
            tishi()

        }
    })

})