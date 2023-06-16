$().ready(function() {
    showIndexImage();
})

$(window).scroll(function(){
    showIndexImage();
    showIntroItem();

});

const showIndexImage = function () {
    const banner = $('#banner').outerHeight();
    if($(this).scrollTop() >= banner){
        $('#Row1Pic1').addClass('fadeInLeft');
        $('#Row1Pic2').addClass('fadeInDown');
        $('#Row1Pic3').addClass('fadeInRight');
        $('#Row1Pic1').removeClass('display-none');
        $('#Row1Pic2').removeClass('display-none');
        $('#Row1Pic3').removeClass('display-none');
        $('#Row2Pic1').addClass('fadeInLeft');
        $('#Row2Pic2').addClass('fadeInUp');
        $('#Row2Pic3').addClass('fadeInRight');
        $('#Row2Pic1').removeClass('display-none');
        $('#Row2Pic2').removeClass('display-none');
        $('#Row2Pic3').removeClass('display-none');
    }
}

const showIntroItem = function () {
    const section = $('#IntroSection').offset().top ;
    if($(this).scrollTop() >= section){
        $('#IntroSection .pulse.display-none').addClass('bounceIn');
        $('#IntroSection .pulse.display-none').removeClass('display-none');
        setTimeout(function(){
            $('#IntroSection .pulse').removeClass('bounceIn');
            },
            1500
        );
    }
}

const openPopup= function (){
    console.log('openpopup');
    $('#popup').removeClass('display-none');
    $('body').addClass('overflow-hidden');
}

const closePopup= function (){
    console.log('closepopup');
    $('#popup').addClass('display-none');
    $('body').removeClass('overflow-hidden');
}
