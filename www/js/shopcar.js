
console.log($.cookie())
var username = $.cookie().username
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
    }, 2000)
}

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
$('.z-82').click(function () {

    $(this).find('.z-126').addClass('chooseactive')
    $('.z-83').find('.z-127').removeClass('chooseactive')

    $('.z-86').children('.z-123').addClass('actives')

    var priceall = $('.z-76')
    var pricearr = 0

    for (var i = 0; i < priceall.length; i++) {
        var priceevery = parseFloat(priceall.eq(i).find('.z-122').html())
        pricearr += priceevery
    }
    $('.z-121').html(pricearr)

})

$('.z-83').click(function () {

    $(this).find('.z-127').addClass('chooseactive')
    $('.z-82').find('.z-126').removeClass('chooseactive')
    $('.z-86').children('.z-123').removeClass('actives')
    $('.z-121').html('0')
})


// $('#optionsRadios3').click(function(){
//     $('.z-123').addClass('actives')
//     var priceall = $('.z-76')
//     var pricearr = 0

//     for( var i = 0; i < priceall.length;i++ ){
//         var priceevery = parseFloat(priceall.eq(i).find('.z-122').html())
//         pricearr += priceevery
//     }
//     $('.z-121').html(pricearr)

// })
// $('#optionsRadios4').click(function(){
//     $('.z-123').removeClass('actives')
//     $('.z-121').html('0')
// })

$('.z-86').click(function () {
    var ast = $(this).children('.z-123')
    if (ast.hasClass("actives")) {
        ast.removeClass('actives')
        $('.z-82').find('.z-126').removeClass('chooseactive')
    } else {
        ast.addClass('actives')

    }
})
setInterval(function () {
    var priceall = $('.z-76')
    var pricearr = 0

    for (var i = 0; i < priceall.length; i++) {


        var ses = priceall.eq(i).find('.z-123')
        if (ses.hasClass('actives')) {
            var numberprice = parseFloat(ses.parents().eq(2).find('.z-122').html())
            pricearr += numberprice
        }


    }
    $('.z-121').html(pricearr)

}, 100)
$('.z-110').click(function () {
    $('.z-40').fadeOut()



})
var idarr = []
$('.z-87').click(function () {


    if ($('.z-123').hasClass('actives')) {
        console.log('-----------')
        var priceall = $('.z-76')

        for (var i = 0; i < priceall.length; i++) {


            var ses = priceall.eq(i).find('.z-123')
            if (ses.hasClass('actives')) {
                var lessonId = ses.parents().eq(2).attr('data-id')
                idarr.push(lessonId)
            }


        }



        $('.z-133').html($('.z-121').html())
        $.get('/shopcar/showmoney/' + username, null, function (res) {
            if (res.code == 'success') {
                $('.z-132').html(res.msg)
                $('.z-40').fadeIn()
            }
        })
    } else {
        $('.login-tishi').css('background', 'red')
        $('.login-tishi').html('您还没勾选视频，请勾选后点击')
        tishi()
    }


})

$('.z-134').click(function () {
    console.log($('.z-132').html())
    console.log($('.z-133').html())
    $('.z-128').css('display', 'none')
    $('.z-136').css('display', 'block')
    if (parseInt($('.z-132').html()) < parseInt($('.z-133').html())) {
        $('.login-tishi').css('background', 'red')
        $('.login-tishi').html('您的账户金额不足，请充值')
        tishi()
        $('.z-128').css('display', 'block')
        $('.z-136').css('display', 'none')
    } else {
        if ($('#passwordcheck').val() == '') {
            $('.login-tishi').css('background', 'red')
            $('.login-tishi').html('请输入登录密码以确保是用户本人')
            tishi()
        } else {
            $('.z-128').css('display', 'none')
            $('.z-136').css('display', 'block')
            var datda = { username: username, password: $('#passwordcheck').val() }
            datda = JSON.stringify(datda)
            console.log(datda)
            $.ajax({
                url: '/shopcar/passwordcheck',
                data: datda,
                type: 'post',
                dataType: 'json',
                success: function (res) {
                    console.log(res)
                    if (res.code == 'success') {
                        var pricenow = parseInt($('.z-132').html()) - parseInt($('.z-133').html())
                        console.log(pricenow)
                        var moneydata = { username: username, usermoney: pricenow }
                        moneydata = JSON.stringify(moneydata)
                        $.ajax({
                            url: '/shopcar/moneynow',
                            data: moneydata,
                            type: 'post',
                            dataType: 'json',
                            success: function (res) {
                                console.log(res)
                                if (res.code == 'success') {

                                    // 更新购物车状态
                                    console.log(idarr)
                                    var lessonupdates = { username: username, ids: idarr }
                                    lessonupdates = JSON.stringify(lessonupdates)
                                    $.ajax({
                                        url: '/shopcar/lessonupdates',
                                        data: lessonupdates,
                                        type: 'post',
                                        dataType: 'json',
                                        success: function (res) {
                                            console.log(res)
                                            if (res.code == 'success') {
                                                console.log('456')
                                                $('.z-136').html("<img src='img/success.png' class='animated z-135'>")
                                                $('.z-136').css('padding-top','20px')
                                                $('.z-135').addClass('rotateIn')
                                                setTimeout(function () {
                                                    window.location.reload()
                                                }, 1000);
                                            }
                                        }
                                    })

                                } else {
                                    $('.z-128').css('display', 'block')
                                    $('.z-136').css('display', 'none')
                                    $('.login-tishi').css('background', 'red')
                                    $('.login-tishi').html(res.msg)
                                    tishi()
                                }
                            }
                        })


                    } else {
                        $('.z-128').css('display', 'block')
                        $('.z-136').css('display', 'none')
                        $('.login-tishi').css('background', 'red')
                        $('.login-tishi').html(res.msg)
                        tishi()
                    }
                }
            })
        }
    }

})





