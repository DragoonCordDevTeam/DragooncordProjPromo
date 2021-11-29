(function ($) {
	"use strict";

	$('.music-item').on('click', function () {
		$('#YTPlayer').attr('src', $(this).attr("data-src"));
		$('.music-title-interactive').text($(this).text());
		$('#composer-social').attr('href', $(this).attr('data-link'));
		$('#composer-pfp').attr('src', $(this).attr('data-image-src'));
	});

	$('.play-video').on('click', function () {
		$('#YTPlayer').attr('src', $(this).attr("data-src"));
		$('#warning').text($(this).attr("data-warning"));
	});

	let sound = new Audio();

	$('.play-quote').on('click', function () {
		sound.pause();
		sound = new Audio($(this).attr("data-src"));
		sound.play();
		sound.volume = 0.5
	});

	$.getJSON("js/messages.json", function (data) {
		let items = data;
		for (let i = items.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[items[i], items[j]] = [items[j], items[i]]
		}
		items = items.map((item, i) => `<div class="postcard" 
style="transform: rotate(${Math.floor(Math.random() * 10 - 5)}deg); 
z-index: ${items.length - i}">
<div class="message-text">${item["Birthday message"]}</div>
<div class="message-name">-${item["Nickname"]}</div>
<img class="stamp" src="images/stamps/${Math.ceil(Math.random() * 9)}.png">
</div>`);

		$("<div/>", {
			"class": "message-list",
			html: items.join("")
		}).appendTo($("#message-board"));
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
