$(document).ready(function () {
	$("ul.gnb li").mouseenter(function () {
		$("div.sub_wrap").stop().slideDown();
	});

	$("nav").mouseleave(function () {
		$("div.sub_wrap").stop().slideUp();
	});
});

/*MAIN*/

var seq;

$(document).ready(function () {
	//1) 오른쪽으로 이동하는 함수 만들기

	function leftmove() {
		$("#gallery").animate(
			{
				left: "-100%",
			},
			2500,
			function () {
				$("#gallery").append($("#gallery li").first()).css({
					left: 0,
				});
			}
		);

		//블릿변경
		seq = $("#gallery li").eq(1).attr("data-seq");
		console.log("현재 슬라이드 data-seq: " + seq);

		$(".btngrp li").eq(seq).addClass("selB").siblings().removeClass("selB");
	}
	//한 번만 실행!/*
	//leftmove();

	//인터벌 실행!/*
	var slideStop = setInterval(function () {
		leftmove();
	}, 2000);

	//2) 갤러리 마우스 오버, 마우스 아웃 처리
	$("#gallery, .btngrp li")
		.mouseover(function () {
			//자동실행 멈춤, 인터벌 스탑
			clearInterval(slideStop);
		})
		.mouseout(function () {
			//인터벌 재가동
			slideStop = setInterval(function () {
				leftmove();
			}, 2000);
		});

	//3) 페이저(블릿버튼) 클릭 시, 노란색으로 변경되고 해당 이미지 표시
	/*$('.btngrp li').click(function () {

        var idx = $(this).index();
        seq = idx;

        //버튼 색상 초기화
        $('.btngrp li').css({
            color: 'black'
        });

        $(this).css({
            color: 'green'
        });


        $('#gallery').animate({
            left: -(idx * 100) + '%'
        }, 800)


    });*/
}); //jQuery

/*MENU*/
$(document).ready(function () {
	//css 초기설정 - slider : width/height, item :  img : width

	var width = $("#slider").attr("data-width"), //1280
		height = $("#slider").attr("data-height"), //400
		count = $("#slider .item").length; //6

	console.log(width, height, count);

	//css값 적용하기
	$("#slider")
		.css({
			width: width,
			height: height,
		})
		.find(".container")
		.css({
			width: count * width, //6 * 1280 = 7,680
			height: height, //height: 100%
		});

	console.log($(".item").width()); //320
	console.log($(".item").innerWidth()); //320

	/*
    width 너비 320
    innerwidth 너비+패딩(0) 320
    */

	//슬라이드 구현하기
	var currentPage = 0;
	var changepage = function () {
		$("#slider > .container").animate(
			{
				left: -(currentPage * width) / 3,
			},
			600
		);
	};

	//다음버튼 클릭
	$("button.right").click(function () {
		if (currentPage < count - 3) {
			currentPage = currentPage + 1;
			changepage();
		}
	});

	//이전버튼 클릭
	$("button.left").click(function () {
		if (currentPage > 0) {
			currentPage = currentPage - 1;
			changepage();
		}
	});
});

/*NEWS*/
var seq2;

$(document).ready(function () {
	//1) 오른쪽으로 이동하는 함수 만들기

	function leftmove() {
		$(".news-cont").animate(
			{
				marginTop: "-100px",
				transition: "all .4s ease-out",
			},
			2000,
			function () {
				$(this).append($(".news-cont li").first()).css({
					marginTop: 0,
				});
			}
		);
	}
	//한 번만 실행!/*
	//leftmove();

	//인터벌 실행!/*
	var slideStop = setInterval(function () {
		leftmove();
	}, 3000);

	//2) 갤러리 마우스 오버, 마우스 아웃 처리
	$(".news-cont li")
		.mouseover(function () {
			//자동실행 멈춤, 인터벌 스탑
			clearInterval(slideStop);
		})
		.mouseout(function () {
			//인터벌 재가동
			slideStop = setInterval(function () {
				leftmove();
			}, 3000);
		});
}); //jQuery

//CHARACTER

var acall; //setInterval 변수
$(function () {
	//자동슬라이드 함수 호출!
	acall = setInterval(flowImg, 20);

	//마우스 오버 멈춤, 아웃시 다시 실행
	//mouseover, mouseout
	//hover() = mouseenter(), mouseleave()

	$(".flowImg li").hover(
		function () {
			//mouseenter()

			//인터벌 지우기
			clearInterval(acall);

			//상품정보 넣기
			//1)각 li의 class값 읽어오기
			var cls = $(this).attr("class");
			console.log(cls);

			//2)상품정보 가져오기
			var info = sinsang[cls]; //sinsang[m2]
			console.log(info);

			//3)상품정보 들어갈 요소 만들기
			$(this).append('<div class="ibox"></div>');

			//4)상품정보 넣기
			/* $('.ibox').text(info).animate({
             top:'110%',
             opacity: 1
         },300,'easeOutCirc');*/

			$(".ibox").html(info.replace(/\^/g, "<br>")).animate(
				{
					top: "110%",
					opacity: 1,
				},
				300,
				"easeOutCirc"
			);

			//정규표현식 : /바꿀문자/
			//만약에 바꿀문자가 특수문자면 역슬래쉬 사용! ex) \^
			//g >> global의미, 내용안에 대체할 문자를 모두 찾는다는 의미!
		},
		function () {
			//mouseleave()

			//인터벌 재실행!
			acall = setInterval(flowImg, 20);
		}
	);
});

/*///////////////////////////////////////////////////
    함수명 : flowImg
    기능 : 이미지를 왼쪽으로 계속 이동하여 흐르게 함
///////////////////////////////////////////////////*/

var fnum = 0; //이동 픽셀 수
function flowImg() {
	//onsole.log('흘러가는 중!');

	fnum++; //1씩 증가!(left 이동하는 픽셀 수 증가)
	//console.log(fnum);

	var fw = $(".flowImg li").first().width(); //첫번째 li크기
	//console.log('첫번째 li의 크기' + fw);

	//if else문
	//이동한 픽셀 수가 li 하나의 너비보다 커졌을 때
	//.flowImg의 첫번째 li를 맨 뒤로 이동, left값 초기화

	if (fnum > fw) {
		$(".flowImg").append($(".flowImg li").first()).css({
			left: 0,
		});

		fnum = 0;
	} else {
		$(".flowImg").css({
			left: -fnum + "px",
		});
	}

	/*$('.flowImg').css({
        left: -fnum + 'px'
    });*/
}

// mobile header
$(document).ready(function () {
	$(".btn").click(function () {
		$("#menu,.page_cover,html").addClass("open");
		window.location.hash = "#open";
	});
});

window.onhashchange = function () {
	if (location.hash != "#open") {
		$("#menu,.page_cover,html").removeClass("open");
	}
};

$(document).ready(function () {
	$("#menu ul.sub_mobile").hide();
	$("#menu ul.nav li").click(function () {
		$("ul", this).slideToggle("fast");
	});
});
