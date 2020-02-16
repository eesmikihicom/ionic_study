/*----------------------------------------------------*/
/* frame.js Index

- slick settings for index.html
- common settings for header and global navigation
- $ = jquery version 2.2.3
------------------------------------------------------*/

$(document).ready(function () {

	/*----------------------------------------------------*/
	/* slick settings for index.html
	スマートフォン
	------------------------------------------------------*/
	//var $vi = $('#vi-sp');
	/*if ($vi.size()) {
		$vi.find('ul').slick({
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			autoplay: true,
			autoplaySpeed: 5000
		});
	}*/
	$('.parent').find('.havChild').each(function () {
		$(this).bind({
			'touchstart': function () {
				$(this).toggleClass('on');
				var acc_height = $(this).find('li').length * $(this).find('li').height();
				if ($(this).find('ul').height() == 0) {
					$(this).find('ul').css('height', acc_height);
				} else {
					$(this).find('ul').css('height', 0);
				}
			}
		});
	});

	$('.hbg_btn button').on(
		'click',
		function () {
			$('#gnav-sp').toggleClass("active");
			$('body').toggleClass("nonactive");
			$('.gnav_back').toggleClass("active");
		});
	$('.menu_close button').on(
		'click',
		function () {
			$('#gnav-sp').removeClass("active");
			$('body').removeClass("nonactive");
			$('.gnav_back').removeClass("active");
		});
	var gp = function () {
		if ($('#gnav-sp').length) {
			var gnav_pos = $('#gnav-sp').offset().left;
			if (gnav_pos > -30) {
				$('header a').addClass('non_active');
			} else {
				$('header a').removeClass('non_active');
			}
			if (gnav_pos > -200) {
				$('#gnav-sp a').removeClass('non_active');
				$('.gnav_back').on({
					'click': function () {
						$('#gnav-sp').removeClass("active");
						$('body').removeClass("nonactive");
						$('.gnav_back').removeClass("active");
					}
				});
			} else {
				$('#gnav-sp a').addClass('non_active');
			}
		}
	}
	setInterval(gp, 300);




	////////////////////////////////////////////
	//
	// ヘッダー検索画面表示
	//
	////////////////////////////////////////////


	$('.openSearch a').on('click', function () {
		$('.header_search').toggleClass("active");
		$('header').toggleClass("search_active");
		$('.rec_product').toggleClass("search_active");
		$('.search_arrow').toggleClass("active");
	});


	////////////////////////////////////////////
	//
	// メイン商材表示
	//
	////////////////////////////////////////////


	$('.rec_prod_tab').each(function () {
		$(this).children($('a')).on('click', function () {
			$(this).parent().toggleClass("active").siblings().removeClass('active');
		});
	});
	$(".decor a").on("click", function () {
		if ($(".requid_prod").css("display") != "none") {
			$(".requid_prod").slideToggle('slow', function () {
				$(".decor_prod").slideToggle('fast');
			});
		} else {
			$(".decor_prod").slideToggle();
		}
	});

	$(".requid a").on("click", function () {
		if ($(".decor_prod").css("display") != "none") {
			$(".decor_prod").slideToggle('slow', function () {
				$(".requid_prod").slideToggle('fast');
			});
		} else {
			$(".requid_prod").slideToggle();
		}
	});

















	////////////////////////////////////////////
	//
	// ？？？？？
	//
	////////////////////////////////////////////

	if ($(".bannare_area *").length || $(".bannare_area").text().replace(/\s+/g, "").length) {
		$('header').addClass('with_banner');
		$('.rec_product').addClass('with_banner');
	} else {

		$(".bannare_area").remove();
	}
	////////////////////////////////////////////
	//
	// ？？？？？
	//
	////////////////////////////////////////////

	$('#display_nostock').on('click', function () {
		var url = $('#item_sort_select').val();
		url = url.replace(/\/nostock:1/g, '');
		location.href = url;
	});
	$('#hide_nostock').on('click', function () {
		var url = $('#item_sort_select').val();
		url = url.replace(/\/nostock:1/g, '');
		url = url + "/nostock:1";
		location.href = url;
	});
	$('#item_sort_select').on('change', function () {
		var url = $('#item_sort_select').val();

		location.href = url + $('#item_display_nostock option:selected').val();
	});
	$('#item_display_nostock_select').on('change', function () {
		var url = $('#item_sort_select').val();

		location.href = url + $('#item_display_nostock option:selected').val();
	});
	$('#searchTop').bind('click', function () {
		$(this).closest("form").submit();
	});

	$('#searchKey').bind('click', function () {
		$(this).closest("form").submit();
	});


	var newslistContents = $("#newsList dl").length; //dlの個数を取得
	var Num = 3; //3行目までなのでNumに3を入れておく
	var listHeight = 0;
	var lineGroupeNum = newslistContents / Num;
	var hArray = [];
	var hArrayNum = 0;
	$("#newsList").each(function () {
		for (var m = 0; m < lineGroupeNum; m++) {
			var ltNum = Num * (m + 1);
			var lineHeight = 0;
			$(this).find("dl:lt(" + ltNum + ")").each(function () {
				lineHeight += $(this).outerHeight(true);
			});
			hArray.push(lineHeight);
		}

		$(this).css({
			"height": hArray[hArrayNum],
			"overflow": "hidden"
		});
		$("#andmore_news a").click(function () { //moreがクリックされた時
			hArrayNum++;
			Num += 3;
			$(this).parent().parent().find($("#newsList")).animate({
				"height": hArray[hArrayNum]
			});
			if (newslistContents <= Num) { //liの個数よりNumが多い時、
				$("#andmore_news").animate({
					"opacity": 0,
					"height": 0,
					"overflow": "hidden"
				}, 'slow', 'swing', function () {
					$(this).hide()
				}); //moreボタンを隠す
			}
		});
	});

	$("#footNav").each(function () {
		$(this).find("dt a").click(function () {
			$(this).parent().next("dd").slideToggle('slow');
			$(this).parent().toggleClass('open');
		});
	});






});
/* ------------------------------------------------------------
↑↑↑↑jquery ready↑↑↑↑ここまで
------------------------------------------------------------ */






/* ------------------------------------------------------------
↓↓↓↓jquery load↓↓↓↓ここから
------------------------------------------------------------ */
$(window).load(function () {
	////////////////////////////////////////////
	//
	// もっと見るボタン制御
	//
	////////////////////////////////////////////
	var recommendlistContents = $("#topRecommendList li").length; //liの個数を取得しておく
	//console.log(recommendlistContents);
	$("#topRecommendList").each(function () {
		var listh = 0;
		var Num = 4;
		var n = recommendlistContents / Num;
		var listNum = 1;
		var hArray = [];
		var hArrayNum = 0;
		for (var m = 0; m < n; m++) {
			var lineh = 0;
			for (var i = 0; i < Num / 2; i++) {
				var rh = $(this).find("li:nth-child(" + listNum + ")").outerHeight(true);
				listNum++;
				var lh = $(this).find("li:nth-child(" + listNum + ")").outerHeight(true);
				listNum++;
				if (rh > lh) {
					lineh += rh;
				} else {
					lineh += lh;
				}
			}
			listh += lineh;
			hArray.push(listh);
		}
		$(this).css({
			"height": hArray[hArrayNum],
			"overflow": "hidden"
		});
		$("#andmore a").click(function () { //moreがクリックされた時
			hArrayNum++;
			Num += 4;
			$(this).parent().parent().find($("#topRecommendList")).animate({
				"height": hArray[hArrayNum]
			});
			if (recommendlistContents <= Num) { //liの個数よりNumが多い時、
				$("#andmore").animate({
					"opacity": 0,
					"height": 0,
					"overflow": "hidden"
				}, 'slow', 'swing', function () {
					$(this).hide()
				}); //moreボタンを隠す
			}
		});
	});


	var bannerlistContents = $("#topBannerList li").length; //liの個数を取得しておく
	$("#topBannerList").each(function () {
		var listh = 0;
		var Num = 4;
		var n = bannerlistContents / Num;
		var listNum = 1;
		var hArray = [];
		var hArrayNum = 0;
		for (var m = 0; m < n; m++) {
			var lineh = 0;
			for (var i = 0; i < Num / 2; i++) {
				var rh = $(this).find("li:nth-child(" + listNum + ")").height();
				listNum++;
				var lh = $(this).find("li:nth-child(" + listNum + ")").height();
				listNum++;
				if (rh > lh) {
					lineh += rh;
				} else {
					lineh += lh;
				}
			}
			listh += lineh;
			hArray.push(listh);
		}
		$(this).css({
			"height": hArray[hArrayNum],
			"overflow": "hidden"
		});
		$("#andmore_bannar a").click(function () { //moreがクリックされた時
			hArrayNum++;
			Num += 4;
			$(this).parent().parent().find($("#topBannerList")).animate({
				"height": hArray[hArrayNum]
			});
			if (bannerlistContents <= Num) { //liの個数よりNumが多い時、
				$("#andmore_bannar").animate({
					"opacity": 0,
					"height": 0,
					"overflow": "hidden"
				}, 'slow', 'swing', function () {
					$(this).hide()
				}); //moreボタンを隠す
			}
		});
	});
});
/* ------------------------------------------------------------
↑↑↑↑jquery load↑↑↑↑ここまで
------------------------------------------------------------ */
