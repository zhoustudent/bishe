console.log($.cookie())

var username = $.cookie().username
var user = $.cookie().user
var userphoto = $.cookie().userphoto


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
var a = 0
$('.z-94 ').click(function(){
    a++
    if(a % 2 != 0){
        $('.z-96').fadeIn()
    }else{
        $('.z-96').fadeOut()
    }
    
})
$('.z-88').click(function(){
    window.location.href = "lesson-css.html"
})
$('.z-90').click(function(){
    window.location.href = "lesson-html.html"
})
$('.z-91').click(function(){
    window.location.href = "lesson-js.html"
})
$('.z-92').click(function(){
    window.location.href = "lesson-vue.html"
})