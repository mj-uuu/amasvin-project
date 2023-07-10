/*sub_story.js*/

var pno = 0; //현재 페이지 번호 (첫 페이지 0)
const totcnt = 4; //전체 페이지 수
var prot = 0; //광스크롤막기 (0-허용, 1-막기)

$(function () {
    //마우스휠 이벤트는 문서 전체에 적용
    $(document).on('mousewheel DOMMouseScroll', function (e) {
        if (prot == 1) return false;
        prot = 1;

        var evt = window.event || e;

        var delta = evt.detail ? evt.detail : evt.wheelDelta;
        console.log('마우스휠 델타값: ' + delta);


        if (/firefox/i.test(navigator.userAgent)) {
            delta = -evt.orginalEvent.detail;
        }

        if (delta > 0) {
            pno--;
            if (pno === -1) pno = 0;
        } else {
            pno++;
            if (pno === totcnt) pno = totcnt - 1;
        }
        console.log('페이지번호: ' + pno);

        var pagepos = $('.page').eq(pno).offset().top;
        console.log('페이지 이동거리: ' + pagepos);

        $('html,body').animate({
            scrollTop: pagepos + 'px'
        }, 800, 'easeInOutQuint', function () {
            prot = 0;
        });

    }); //mousewheel
});



/*
function initSet() {
    //1. page1
    $('#page1 .minfo').hide();

    //2. page2
    $('#page2 .minfo').hide();

    //3. page3
    $('#page3 .minfo').hide();
}
*/

/*////////////////////////////////////////////////
    함수명 : pageAction (else if문 사용)
    기능 : 각 페이지별 등장 액션
////////////////////////////////////////////////*/

/*function pageAction() {

    if (pno === 0) {
        //1. page1 - 서서히 나타나기
        $('#page1 .minfo').stop().fadeIn(2000);
    } else if (pno === 1) {
        //2. page2 - 서서히 나타나기
        $('#page2 .minfo').stop().fadeIn(2000);
    } else if (pno === 2) {
        //3. page3 - 서서히 나타나기
        $('#page3 .minfo').stop().fadeIn(2000);
    }
}*/
//else if
//pageAction

$(function () {
    //각 페이지 초기세팅 함수 호출
    initSet();

    //페이지 액션 호출
    pageAction();

    $(document).on('mousewheel DOMMouseScroll', function (e) {

        if (prot === 1) return false;
        prot = 1;

        var evt = window.event || e;

        var delta = evt.deltail ? evt.detail : evt.wheelDelta;
        console.log('마우스휠 델타값: ' + delta);

        if (/Firefox/i.test(navigator.userAgent)) {
            delta = -evt.orginalEvent.detail;
        }

        if (delta > 0) {
            //양수 - 윗방향(이전페이지)
            pno--;
            if (pno === -1) pno = 0;
        } else {
            //음수 - 아랫방향(다음페이지)
            pno++;
            if (pno === totcnt) pno = totcnt - 1;
        }

        var pagepos = $('.page').eq(pno).offset().top;
        console.log('페이지 이동거리 : ' + pagepos);

        //페이지 이동 애니메이션
        $('html,body').animate({
            scrollTop: pagepos + 'px'
        }, 800, 'easeInOutQuint', function () {

            pageAction();

            prot = 0; //스크롤 막기 해제
        });
    });

});
