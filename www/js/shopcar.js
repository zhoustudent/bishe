$(function(){
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
})