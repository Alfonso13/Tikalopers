

function init() {
	var heightMenu = $("#header").outerHeight();

	$(".menu-navigation a, #mobile-nav a").on('click', function click(e) {
		e.preventDefault();
		var transition = $(this).attr('data-transition');
		var offset = $("#"+transition).offset().top;
		$('html, body').stop().animate({scrollTop: offset}, "2000", "swing");
	});
	$(document).scroll(function scroll(e) {
		var documentY = $(document).scrollTop();
		var heightMenu = $("#header").outerHeight();
		var transitionY = {
			header: $("#header-main").offset().top,
			tikalopers: $("#tikalopers").offset().top,
			work: $("#work").offset().top,
			services: $("#services").offset().top,
			we: $("#we").offset().top,
			contact: $("#contact").offset().top,
			suscribe: $("#suscribe").offset().top
		};
		var list;
		if($("nav#nav-desktop").css("display") == "none") {
			list = $("#mobile-nav a")
		}
		else {
			list = $(".menu-navigation a");
		}

		var getItemMenu = function getItemMenu(list, attr, val) {
			for(var i = 0 ; i < list.length ; i++) {
				if( $(list[i]).attr(attr) == val ) {
					return list[i];
					break;
				}
			}
		};
		var addBorderBottom = function addBorderBottom(list, btn, transition) {
			if(!$(btn).hasClass('border-bottom-item-nav')) {
				for(var i = 0 ; i < list.length ; i++) {
					if( $(list[i]).attr('data-transition') != transition && $(list[i]).hasClass('border-bottom-item-nav') ) {
						$(list[i]).removeClass('border-bottom-item-nav');
					}
				}
				$(btn).addClass('border-bottom-item-nav');
			}
		};
		var btn;
		if(documentY > (transitionY.tikalopers-heightMenu) && documentY < (transitionY.work - heightMenu)) {
			btn = getItemMenu(list, "data-transition", "tikalopers");
			addBorderBottom(list, btn, "tikalopers");
		}
		else if(documentY >= (transitionY.work - heightMenu) && documentY < (transitionY.we - heightMenu)) {
			btn = getItemMenu(list, "data-transition", "services");
			addBorderBottom(list, btn, "services");
		}
		else if(documentY >= (transitionY.we - heightMenu) && documentY < (transitionY.contact - heightMenu )) {
			btn = getItemMenu(list, "data-transition", "we");
			addBorderBottom(list, btn, "we");
		}
		else if(documentY > (transitionY.contact - heightMenu)) {
			btn = getItemMenu(list, "data-transition", "contact");
			addBorderBottom(list, btn, "contact");
		}
		else if(documentY >= 0 && documentY < (transitionY.tikalopers - heightMenu)) {
			btn = getItemMenu(list, "data-transition", "header-main");
			addBorderBottom(list, btn, "header-main");
		}
	});
	$("#btn-up").on('click', function click(a) {
		a.preventDefault();
		$('html, body').stop().animate({scrollTop: 0}, "3000", "swing");
	});
	$(".btn-mobile-nav").on('click', function click(e) {
		e.preventDefault();
		if($("#mobile-nav").hasClass('collapse-menu')) {
			$("#mobile-nav").removeClass('collapse-menu').addClass('no-collapse-menu');
		}
		else {
			$("#mobile-nav").removeClass('no-collapse-menu').addClass('collapse-menu');
		}
	});
};

$(document).on('ready', init);