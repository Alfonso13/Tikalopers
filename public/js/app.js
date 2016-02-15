

function init() {

	function invalidInputForm(element) {
		var elemento = element.target;
		if(elemento.tagName.toLowerCase() != 'fieldset') {
			$(elemento).css({
				borderBottom: '3px solid #EF5350'
			});
			$(elemento).siblings("span").addClass("field-error");
		}
	};
	function inputEvt(element) {
		var target = $(element.target);
		var siblings = target.siblings("span");
		
		if(siblings.hasClass("field-error")) {
			target.css({borderBottom: '1px solid #E2E2E2'});
			siblings.removeClass('field-error');
		}
	};

	document.form_quotation.addEventListener("invalid", invalidInputForm, true);
	document.form_quotation.addEventListener("input", inputEvt, false);
	
	document["form-send-message"].addEventListener("invalid", invalidInputForm, true);
	document["form-send-message"].addEventListener("input", inputEvt, false);

	document["form-quotation-package"].addEventListener("invalid", invalidInputForm, true);
	document["form-quotation-package"].addEventListener("input", inputEvt, false);

	var defaults = {
		0: {
			text: "Diseño Web Básico",
			html: "<div><span class='icon-display'></span></div><h3>Diseño Web</h3><div><small>BÁSICO</small></div>"
		},
		1: {
			text: "Diseño Web Estándar",
			html: "<div><span class='icon-display'></span></div><h3>Diseño Web</h3><div><small>ESTÁNDAR</small></div>"
		},
		2: {
			text: "Diseño Web Profesional",
			html: "<div><span class='icon-display'></span></div><h3>Diseño Web</h3><div><small>PRO</small></div>"
		},
		3: {
			text: "APP HÍBRIDA",
			html: "<div><span class='icon-mobile'></span></div><h3>APP</h3><div><small>HÍBRIDA</small></div>"
		},
		4: {
			text: "Marketing Social Media",
			html: "<div><span class='icon-bullhorn'></span></div><h3>Marketing</h3><div><small>Social Media</small></div>"
		}
	};
	$("#btn-quote-send").on('click', function click(e) {
		e.preventDefault();
		var valid = document.form_quotation.checkValidity();
		if(valid) {
			var serialize = $(document.form_quotation).serializeObject();
			var type = $("#quotation #service-selected").attr("data-type");
			var text = defaults[type].text;
			serialize.route = "/cotizacion";
			serialize.service = text;

			var xhr = $.post("services/router.php", serialize);

			xhr.done(function (response, message, http_response) {
				if(http_response.status == 200) {
					document.form_quotation.reset();
					$("#form_quotation .container-buttons").animate({opacity: 0}, "1500", "linear", function (){
						$(this).addClass('hidden');
						$("#form_quotation .container-success-message").removeClass('hidden').animate({opacity: 1}, "1000", "linear");
						setTimeout(function () {
							$("#quotation").removeClass('visibility').addClass('no-visibility');
							$("#form_quotation .container-success-message").animate({opacity:0}, "1000", "linear", function () {
								$(this).addClass('hidden');
								$("#form_quotation .container-buttons").css({opacity: 0}).removeClass('hidden').animate({opacity: 1}, "1000", "linear");
								$('body, html')
									.css({
										overflow: 'auto'
									});
							});
						}, 1000);
					});
				}
				else {
					$("#form_quotation .container-buttons").animate({opacity: 0}, "1000", "swing", function () {
						$(this).addClass('hidden');
						$("#form_quotation .container-error-message").removeClass('hidden').animate({opacity: 1}, "1000", "linear");
						setTimeout(function (){
							$("#form_quotation .container-error-message").animate({opacity: 0}, "1000", "swing", function () {{
								$(this).addClass('hidden');
								$("#form_quotation .container-buttons").css({opacity: 0}).removeClass('hidden').animate({opacity: 1}, "1500", "swing");
							}})
						}, 2000);
					});
				}
			})
			.error(function a(http_error, error, message) {
				$("#form_quotation .container-buttons").animate({opacity: 0}, "1000", "swing", function () {
					$(this).addClass('hidden');
					$("#form_quotation .container-error-message").removeClass('hidden').animate({opacity: 1}, "1000", "linear");
					setTimeout(function (){
						$("#form_quotation .container-error-message").animate({opacity: 0}, "1000", "swing", function () {{
							$(this).addClass('hidden');
							$("#form_quotation .container-buttons").css({opacity: 0}).removeClass('hidden').animate({opacity: 1}, "1500", "swing");
						}})
					}, 2000);
				});
			});
		}
	});
	
	$("#btn-cotizar-paquete").on('click', function click(e) {
		e.preventDefault();
		var valid = document["form-quotation-package"].checkValidity();
		if(valid) {
			var serialize = $("#form-quotation-package").serializeObject();
			var services = [];
			$("#selection-services ul li span").each(function each(index, el) {
				if($(el).hasClass('selectedService')) {
					services.push(defaults[this.getAttribute("data-service-id")].text);
				}
			});
			serialize.service = services.join(", ");
			serialize.route = "/cotizacion"; 

			var xhr = $.post("services/router.php", serialize);

			xhr
			.done(function done(response, message, http_response) {
				if(http_response.status == 200) {
					document["form-quotation-package"].reset();
					$("#quotation-package form input, #quotation-package form textarea").attr('disabled', 'disabled');
					$("#form-quotation-package .container-buttons").animate({opacity: 0}, "1500", "linear", function (){
						$(this).addClass('hidden');
						$("#form-quotation-package .container-success-message").removeClass('hidden').animate({opacity: 1}, "1000", "linear");
						setTimeout(function () {
							$("#quotation-package").removeClass('visibility').addClass('no-visibility');
							$("#form-quotation-package .container-success-message").animate({opacity:0}, "1000", "linear", function () {
								$(this).addClass('hidden');
								$("#form-quotation-package .container-buttons").css({opacity: 0}).removeClass('hidden').animate({opacity: 1}, "1000", "linear");
								$('html, body')
									.css({
										overflow: 'auto'
									});

								$("#quotation-package #selection-services ul li").each(function each(index, el) {
									if( $(el).hasClass('selectedService') ) {
										$(el).removeClass('selectedService');
									}
								});
							});
						}, 1000);
					});					
				}
				else {
					$("#form-quotation-package .container-buttons").animate({opacity: 0}, "1000", "swing", function () {
						$(this).addClass('hidden');
						$("#form-quotation-package .container-error-message").removeClass('hidden').animate({opacity: 1}, "1000", "linear");
						setTimeout(function (){
							$("#form-quotation-package .container-error-message").animate({opacity: 0}, "1000", "swing", function () {{
								$(this).addClass('hidden');
								$("#form-quotation-package .container-buttons").css({opacity: 0}).removeClass('hidden').animate({opacity: 1}, "1500", "swing");
							}})
						}, 2000);
					});
				}
			})
			.error(function error(http_error, error, message) {
				$("#form-quotation-package .container-buttons").animate({opacity: 0}, "1000", "swing", function () {
					$(this).addClass('hidden');
					$("#form-quotation-package .container-error-message").removeClass('hidden').animate({opacity: 1}, "1000", "linear");
					setTimeout(function (){
						$("#form-quotation-package .container-error-message").animate({opacity: 0}, "1000", "swing", function () {{
							$(this).addClass('hidden');
							$("#form-quotation-package .container-buttons").css({opacity: 0}).removeClass('hidden').animate({opacity: 1}, "1500", "swing");
						}})
					}, 1000);
				});
			});
		}
	});


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
	$(".btn-quote").on('click', function click(e) {
		e.preventDefault();
		var type = $(this).parents(".block-service").attr("data-type");
		var html = defaults[type].html;
		if($("#quotation").hasClass('no-visibility')) {
			$("html, body").css({overflow: "hidden"});
			$("#quotation #service-selected").attr("data-type", type);
			$("#quotation #service-selected").html(html);
			document["form_quotation"].reset();

			$("#quotation form fieldset span").each(function each(index, el) {
				if($(el).hasClass('field-error')) {
					$(el).siblings("input, textarea").css({borderBottom: "1px solid #E2E2E2"});
					$(el).removeClass("field-error");
				}
			});

			$("#quotation").removeClass('no-visibility').addClass('visibility');
		}
		else {
			$("#quotation").removeClass('visibility').addClass('no-visibility');
		}
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

	$("section.modal .close").on({
		click: function click() {
			$(this).parent().parent().removeClass('visibility').addClass('no-visibility');
			$('body, html').css({overflow: 'auto'});
		}
	});
	$("#btn-quote-package").on('click', function a(e) {
		e.preventDefault();
		$("html, body").css({overflow: "hidden"});
		$("#form-quotation-package fieldset span").each(function each(index, el) {
			if($(el).hasClass('field-error')) {
				$(el).siblings("input, textarea").css({borderBottom: "1px solid #E2E2E2"});
				$(el).removeClass("field-error");
			}
		});
		$("#form-quotation-package input, #form-quotation-package textarea").attr('disabled', 'disabled');
		$("#form-quotation-package input").eq(0).attr('autofocus','autofocus');
		$("#form-quotation-package button").attr('disabled', 'disabled');
		$("#selection-services ul li span").removeClass("selectedService");

		$("#quotation-package").removeClass('no-visibility').addClass('visibility');
	});
	$(".item-service-selected span").on('click', function clickItemService(event) {
		event.preventDefault();
		if($(this).hasClass('selectedService')) {
			$(this).removeClass('selectedService')
		}
		else {
			$(this).addClass('selectedService')	
		}

		var children = $(this).parent().siblings(".item-service-selected").children(".selectedService");
		if(children.length == 0 || ( !( $(this).hasClass('selectedService') ) && children.length == 1 ) ) {
			$("#form-quotation-package input, #form-quotation-package textarea").attr('disabled', 'disabled');
			$("#form-quotation-package input").eq(0).attr('autofocus','autofocus');
			$("#form-quotation-package button").attr('disabled', 'disabled');
		}
		else {
			$("#form-quotation-package input, #form-quotation-package textarea").removeAttr('disabled');
			$("#form-quotation-package input").eq(0).attr('autofocus', 'autofocus');
			$("#form-quotation-package button").removeAttr('disabled');
		}
		
	});

	$("#btn-send-message").on('click', function click(e) {
		e.preventDefault();
		var valid = document["form-send-message"].checkValidity();
		if(valid) {
			var serialize = $("#form-send-message").serializeObject();
			serialize.route = "/message-contact";

			var xhr = $.post("services/router.php", serialize);
			xhr
			.done(function done(response, message, http) {
				if(http.status == 200) {
					document["form-send-message"].reset();
					$("#form-send-message .container-buttons").addClass('hidden');
					$("#form-send-message .container-success-message").removeClass('hidden').animate({opacity: 1}, "1000", "linear");
					setTimeout(function () {
						$("#form-send-message .container-success-message").animate({opacity: 0}, "1500", "swing", function () {
							$(this).removeClass('block').addClass('hidden');
							$("#form-send-message .container-buttons").css({opacity: 0}).removeClass('hidden').animate({opacity: 1}, "1500", "swing");
						});
					}, 2000);
				}
				else {
					$("#form-send-message .container-buttons").addClass('hidden');
					$("#form-send-message .container-error-message").removeClass('hidden').animate({opacity: 1}, "1000", "linear");
					setTimeout(function (){
						$("#form-send-message .container-error-message").animate({opacity: 0}, "1000", "swing", function () {{
							$(this).addClass('hidden');
							$("#form-send-message .container-buttons").css({opacity: 0}).removeClass('hidden').animate({opacity: 1}, "1500", "swing");
						}})
					}, "2000");
				}
			})
			.error(function error() {
				$("#form-send-message .container-buttons").addClass('hidden');
				$("#form-send-message .container-error-message").removeClass('hidden').animate({opacity: 1}, "1000", "linear");
				setTimeout(function (){
					$("#form-send-message .container-error-message").animate({opacity: 0}, "1000", "swing", function () {{
						$(this).addClass('hidden');
						$("#form-send-message .container-buttons").css({opacity: 0}).removeClass('hidden').animate({opacity: 1}, "1500", "swing");
					}})
				}, "2000");
			});

		}
	});
};

$(document).on('ready', init);