(function ($) {
	"use strict";

	$('.music-item').on('click', function () {
		$('#YTPlayer').attr('src', $(this).attr("data-src"));
		$('.music-title-interactive').text($(this).text());
		$('#composer-social').attr('href', $(this).attr('data-link'));
		$('#composer-pfp').attr('src', $(this).attr('data-image-src'));
	});

	let sound = new Audio();

	$('.play-quote').on('click', function () {
		sound.pause();
		sound = new Audio($(this).attr("data-src"));
		sound.play();
		sound.volume = 0.5
	});

	animatedProgressBar();
	windowHieght();
	previewPannel();

	function animatedProgressBar() {
		$(".progress").each(function () {
			var skillValue = $(this).find(".skill-lavel").attr("data-skill-value");
			$(this).find(".bar").animate({
				width: skillValue
			}, 1500);

			$(this).find(".skill-lavel").text(skillValue);
		});
	}

	function windowHieght() {
		if ($(window).height() <= 768) {
			$(".pt-table").addClass("desktop-768");
		} else {
			$(".pt-table").removeClass("desktop-768");
		}
	}

	/*----------------------------------------
		Isotope Masonry
	------------------------------------------*/
	function isotopeMasonry() {
		$(".isotope-gutter").isotope({
			itemSelector: '[class^="col-"]',
			percentPosition: true
		});
		$(".isotope-no-gutter").isotope({
			itemSelector: '[class^="col-"]',
			percentPosition: true,
			masonry: {
				columnWidth: 1
			}
		});

		$(".filter a").on("click", function () {
			$(".filter a").removeClass("active");
			$(this).addClass("active");
			var selector = $(this).attr("data-filter");
			$(".isotope-gutter").isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: "linear",
					queue: false
				}
			});
			return false;
		});
	}

	/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		Preview Pannel
	-=-=-=-=-=-=-=-=-=--=-=-=-=-=-*/
	function previewPannel() {
		$(".switcher-trigger").on("click", function () {
			$(".preview-wrapper").toggleClass("extend");
			return false;
		});
		if ($(window).width() < 768) {
			//$(".preview-wrapper").removeClass("extend");
		}
		$(".color-options li").on("click", function () {
			$("#color-changer").attr({
				"href": "css/colors/" + $(this).attr("data-color") + ".css"
			});
			return false;
		});
	}

	$(window).on("load", function () {
		isotopeMasonry();

		$(".preloader").addClass("active");
		setTimeout(function () {
			$(".preloader").addClass("done");
		}, 1000);
	});

})(jQuery);
