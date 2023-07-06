//membership.js

var seq;

$(document).ready(function () {

    //1) 오른쪽으로 이동하는 함수 만들기

    function leftmove() {

        $('#gallery').animate({
            marginLeft: '-100%',
            transition: 'all .5s ease-out'
        }, 3000, function () {
            $(this).append($('#gallery li').first()).css({
                marginLeft: 0
            });
        });

        //블릿변경
        seq = $('#gallery li').eq(1).attr('data-seq');
        console.log('현재 슬라이드 data-seq: ' + seq);

        $('.btngrp li').eq(seq).addClass('selB').siblings().removeClass('selB');

    }




    //한 번만 실행!/*
    //leftmove();


    //인터벌 실행!/*
    var slideStop = setInterval(function () {

        leftmove();

    }, 2000);

    //2) 갤러리 마우스 오버, 마우스 아웃 처리
    $('#gallery li, .btngrp li').mouseover(function () {
        //자동실행 멈춤, 인터벌 스탑
        clearInterval(slideStop);

    }).mouseout(function () {
        //인터벌 재가동
        slideStop = setInterval(function () {
            leftmove();
        }, 2000);
    });



}); //jQuery
