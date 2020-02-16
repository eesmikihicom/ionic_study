/*----------------------------------------------------*/
/* frame.js Index

- slick settings for index.html
- common settings for header and global navigation
------------------------------------------------------*/

//var $ = jQuery.noConflict();

$(document).ready(function () {

	/*----------------------------------------------------*/
	/* slick settings for index.html
	------------------------------------------------------*/
	/*
	var $vi = $('#vi');
	if ($vi.size()) {
		$vi.find('.fs-pt-carousel__track').slick({
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			autoplay: true,
			autoplaySpeed: 5000
		});
	}

	var $topBanner = $('#topBanner');
	if ($topBanner.size()) {
		$topBanner.find('ul').slick({
			dots: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: false
		});
	}

	var $topRanking = $('#topRanking');
	if ($topRanking.size()) {
		$topRanking.find('ul').slick({
			slidesToShow: 5,
			slidesToScroll: 5,
			infinite: false,
			useCSS: false,
			speed: 300
		});
	}*/
	// var $kanzashiRanking = $('#kanzashiRanking');
	// if($kanzashiRanking.size()){
	// 	$kanzashiRanking.find('ul').slick({
	// 		slidesToShow: 5,
	// 		slidesToScroll: 5,
	// 		infinite: false,
	// 		useCSS: false,
	// 		speed: 300
	// 	});
	// }

	/*----------------------------------------------------*/
	/* common settings for header and global navigation
	------------------------------------------------------*/

	var $header = $('#header-online');
	var $headH = $header.height();
	var $gnav = $('#gnav');
	var $gnavH = $gnav.height();
	var $gnavT = $gnav.get(0).offsetTop;
	//var $gnavT = $gnav.offset().top;

	//console.log($headH);
	$('body').css('padding-top', $headH);

	$(window).bind('scroll load', function () {
		//console.log('gnavT:' + $gnavT + '/ scroll:' + $(this).scrollTop());
		if ($(this).scrollTop() > 0) {
			$($header).addClass('fixed');
			if ($(this).scrollTop() >= $gnavT) {
				$('body').css('padding-top', $headH + $gnavH);
				$($gnav).addClass('fixed').css('top', $headH);
				$('#vi').css('margin-bottom', $headH);
			} else {
				$($gnav).removeClass('fixed').css('top', 'auto');
				$('#vi').css('margin-bottom', 0);
			}
		} else {
			$('body').css('padding-top', $headH);
			$($header).removeClass('fixed');
			$($gnav).removeClass('fixed').css('top', 'auto');
		}
	});

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

		location.href = url + $('#item_display_nostock .selected').val();
	});

	$('#searchTop').bind('click', function () {
		$(this).closest("form").submit();
	});

	$('#searchKey').bind('click', function () {
		$(this).closest("form").submit();
	});
});
/*----------------------------------------------------*/
/* DOM操作 800px区切り
------------------------------------------------------*/
$(document).ready(function () {
	if (window.matchMedia('(min-width:800px)').matches) {
		$('#postContents').prependTo('#contentsMain');
	} else {
		$('#postContents').insertBefore('#contentsLeft');
	}
});
$(window).resize(function () {
	if (window.matchMedia('(min-width:800px)').matches) {
		$('#postContents').prependTo('#contentsMain');
		console.log('OK');
	} else {
		$('#postContents').insertBefore('#contentsLeft');
	}
});
