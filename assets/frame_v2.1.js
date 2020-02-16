/*----------------------------------------------------*/
/* frame.js Index

- for Future Shop contents
- common settings for header and global navigation
------------------------------------------------------*/
//強制リロード

window.onpageshow = function (event) {
	if (event.persisted) {
		window.location.reload()
	}
};


$(document).ready(function () {

	/*----------------------------------------------------*/
	/* [ PC ] settings for header and global navigation
	------------------------------------------------------*/

	var $header = $('#header-online');
	var $headH = $header.height();
	var $gnav = $('#gnav');
	var $gnavH = $gnav.height();
	var $gnavT = $gnav.offset().top;

	$('body').css('padding-top', $headH);
	if (document.getElementById("vi") != null) {
		$(window).bind('scroll load', function () {
			if ($(this).scrollTop() > 0) {
				$($header).addClass('fixed');
				if (($gnavT - $(this).scrollTop()) < $headH) {
					$('body').css('padding-top', $headH);
					$($gnav).addClass('fixed').css('top', $headH);
					$('#vi').css('padding-bottom', $gnavH);
				} else {
					$($gnav).removeClass('fixed').css('top', 'auto');
					$('#vi').css('padding-bottom', 0);
				}
			} else {
				$('body').css('padding-top', $headH);
				$($header).removeClass('fixed');
				$($gnav).removeClass('fixed').css('top', 'auto');
			}
		});
	} else {
		$($header).addClass('fixed');
		$('body').css('padding-top', $headH + $gnavH);
		$($gnav).addClass('fixed').css('top', $headH);
	}
	$gnav.find('.parent > li').each(function () {
		var $child = $(this).find('.child');
		if ($child) {
			$(this).bind({
				mouseenter: function (e) {
					$(this).addClass('on');
				},
				mouseleave: function (e) {
					$(this).removeClass('on');
				}
			});
		}
	});
});


/*----------------------------------------------------*/
/* スマートフォン
------------------------------------------------------*/

$(document).ready(function () {

	/*----------------------------------------------------*/
	/* [ SP ] header menu
	------------------------------------------------------*/
	$('.parent').find('.havChild').each(function () {
		$(this).bind({
			'touchstart': function () {
				$(this).toggleClass('on');
				var acc_height = $(this).find('li').length * $(this).find('li').height() + 10;
				if ($(this).find('ul').height() == 0) {
					$(this).find('ul').css('height', acc_height);
				} else {
					$(this).find('ul').css('height', 0);
				}
			}
		});
	});

	/*----------------------------------------------------*/
	/* [ SP ] Hunbrger menu
	------------------------------------------------------*/
	$('.hbg_btn button').on('click', function () {
		$('#gnav-sp').toggleClass("active");
		$('body').toggleClass("nonactive");
		$('.gnav_back').toggleClass("active");
	});

	$('.menu_close button').on('click', function () {
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


	/*----------------------------------------------------*/
	/* ヘッダー検索画面表示
	------------------------------------------------------*/

	$('.openSearch a').on('click', function () {
		$('.header_search').toggleClass("active");
		$('header').toggleClass("search_active");
		$('.rec_product').toggleClass("search_active");
		$('.search_arrow').toggleClass("active");
	});

	/*----------------------------------------------------*/
	/* メイン商材表示 SP
	------------------------------------------------------*/


	$('.rec_prod_tab').each(function () {
		$(this).children($('a')).on('click', function () {
			$(this).parent().toggleClass("active").siblings().removeClass('active');
		});
	});

	// height Culc
	function prodboxHeight(obj) {
		var objNum = $(obj).find("ul li").length;
		var objHeight = $(obj).find("ul li:first-child").outerHeight(true);
		for (var i = 1; i < objNum / 2; i++) {
			objHeight += $(obj).find("ul li:nth-child(" + i + ")").outerHeight(true);
		}
		var prodHeight = objHeight;
		return prodHeight;
	}



	$('#searchTop').on('click', function () {
		$(this).closest("form").submit();
	});

	$('#searchKey').on('click', function () {
		$(this).closest("form").submit();
	});

	$("#footNav").each(function () {
		$(this).find("dt a").click(function () {
			//$(this).parent().next("dd").slideToggle('slow');
			var $nextDD = $(this).parent().next("dd");
			$(this).parent().toggleClass('open');
			var $footNavContent = $nextDD.find(".footNavContent").height() + 45;
			$nextDD.toggleClass('active').css('height', $footNavContent);
			if ($nextDD.hasClass('active')) {
				$nextDD.css('height', $footNavContent);
			} else {
				$nextDD.css('height', '');
			}
		});
	});

});

/*----------------------------------------------------*/
/* DOM操作 800px区切り
------------------------------------------------------*/
$(window).on("load resize", function () { //attention "resize" event
	if (window.matchMedia('(min-width:800px)').matches) {
		$('#contentsLeft').insertBefore('.fs-l-pageMain');
	} else {
		$('#contentsLeft').insertBefore('#contentsMain');
	}
});


/*----------------------------------------------------*/
/* もっと見るボタン制御 800px区切り
------------------------------------------------------*/
/*
$(window).on("resize load", function () {
	var rList = ["#topRecommendList", "#topNewestList", ".topBannerList"];
	rList.forEach(function (value) {
		readmoreList(value);
	});
});
*/

function readmoreList(listObj, views = 4, column = 2) {
	if (window.matchMedia('(max-width: 799px)').matches) {
		if ($(listObj).hasClass("topBannerList")) {
			if ($(listObj).find(".slick-cloned").length != 0) {
				$(".slick-cloned").remove();
			};
		}
	}
	if (window.matchMedia('(max-width: 579px)').matches) {
		var readContentListNum = $(listObj).find(".slick-slide").length;
		var listh = 0;
		var Num = views;
		var n = readContentListNum / Num;
		var listNum = 1;
		var columnNum = column;
		var hArray = [];
		var hArrayNum = 0;

		$(listObj).each(function () {
			if (n > 1) {
				for (var m = 0; m < n; m++) {
					var lineh = 0;
					for (var i = 0; i < Num / columnNum; i++) {
						var rh = $(this).find(".slick-slide:nth-child(" + listNum + ")").outerHeight(true);
						listNum++;
						var lh = $(this).find(".slick-slide:nth-child(" + listNum + ")").outerHeight(true);
						listNum++;
						if (rh > lh) {
							lineh += rh;
						} else {
							lineh += lh;
						}
					}
					listh += lineh;
					hArray.push(listh);
				};
				$(this).css({
					"height": hArray[hArrayNum],
					"overflow": "hidden"
				});
				var setReadMoreBtn = "<div class='and_more'><a href='javascript: void(0)'> もっと見る </a></div>" + "<!--" + $(listObj).attr("id") + "-->";
				if ($(this).next(".and_more").length == 0) {
					$(this).after(setReadMoreBtn);
				}
				$(this).parent().find(".and_more a").on("click", function () {
					hArrayNum++;
					Num += 4;
					$(listObj).animate({
						"height": hArray[hArrayNum]
					});
					if (readContentListNum <= Num) { //liの個数よりNumが多い時、
						$(this).animate({
							"opacity": 0,
							"height": 0,
							"overflow": "hidden"
						}, 'slow', 'swing', function () {
							$(this).hide();
							$(this).parent().remove();
						}); //moreボタンを隠す
					}
				});
			}
		});
	} else {
		$(listObj).css({
			"height": "auto",
			"overflow": "hidden"
		});
		if ($(listObj).next(".and_more").length != 0) {
			$(listObj).next(".and_more").remove();
		}
	}
}

var $url = 'https://www.kazurasei.co.jp/information/wp-json/kazurasei_information/v1/KI_route/';
$(function () {
	$.getJSON($url) // json読み込み開始
		.done(function (json) {
			$.each(json, function (i, item) {
				var html = '<dt>';
				var title = item.title;
				var link = item.permalink;
				var pubDD = item.postTime;
				var cat_html = item.categories;
				var cat_num = item.categories.length;
				html += '<span class="newsDate">' + pubDD + '</span>';
				$.each(cat_html, function (i, category) {
					var $cat_name = category.cat_name;
					var $cat_link = category.cat_link;
					var $cat_slug = category.cat_slug;
					html += '<a harf="' + $cat_link + '" class="cat_tips ' + $cat_slug + '">' + $cat_name + '</a>'
				});
				html += '</dt>';

				html += '<dd><a href="' + link + '">' + title + '</a></dd>';

				$('dl.info_area').append(html);
			});

		})
		.fail(function () { // jsonの読み込みに失敗した時
			$('dl.info_area').append("<dt>読み込みませんでした。</dt>");
		});
});

/*----------------------------------------------------*/
/* マウスオーバーで動画再生
------------------------------------------------------*/

$(function () {
	if ($('#video').length) {
		var v = document.querySelector('#video');
		v.addEventListener('mouseover', function () {
			this.play();
		}, false);
		v.addEventListener('mouseout', function () {
			this.pause();
			this.currentTime = 0;
			this.load();
		}, false);
		$(".js-modal-btn").modalVideo();
	}
});


$(window).on("load", function () {
	//requid_prod height
	var $requid_height = $(".requid_prod").outerHeight(true);
	var $decor_height = $(".decor_prod").outerHeight(true);

	var $requid_prod_h = $requid_height + 35;
	var $decor_prod_h = $decor_height + 35;
	$(".requid_prod").css({
		//display: "none",
		height: 0
	});
	$(".decor_prod").css({
		//display: "none",
		height: 0
	});
	$(".prod_box").css({
		opacity: 1
	});
	$(".decor a").on("click", function () {
		if ($(".decor_prod").height() == 0) {
			$(".decor_prod").css({
				display: "block",
				height: $decor_prod_h
			});
		} else {
			$(".decor_prod").css({
				height: 0
			});
		}
		if ($(".requid_prod").height() != 0) {
			$(".requid_prod").css({
				height: 0
			});
		}
		$(".decor_prod").toggleClass('active');
		$(".requid_prod").removeClass('active');
	});

	$(".requid a").on("click", function () {
		if ($(".requid_prod").height() == 0) {
			$(".requid_prod").css({
				display: "block",
				height: $requid_prod_h
			});
		} else {
			$(".requid_prod").css({
				height: 0
			});
		}
		if ($(".decor_prod").height() != 0) {
			$(".decor_prod").css({
				height: 0
			});
		}
		$(".requid_prod").toggleClass('active');
		$(".decor_prod").removeClass('active');
	});

	$("#topRanking .draggable").unbind();
});
