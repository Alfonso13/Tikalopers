function ready() {
	var services = {
		"0": {
			service: "SITIO WEB PROFESIONAL",
			message: "¡JUNTOS CREAREMOS ESA APLICACIÓN CAPAZ DE UNIRTE MÁS A TUS CLIENTES!"
		},
		"1": {
			service: "APLICACIÓN MÓVIL",
			message: "¡OBTÉN TU SITIO WEB PERFECTO QUE TE CONECTARA CON TUS CLIENTES!"
		},
		"2": {
			service: "SOCIAL MEDIA MARKETING",
			message: "¡TEN LA MEJOR COMUNIDAD DE SEGUIDORES DE TU PRODUCTO!"
		}
	};


	/*Mobile Nav*/
	$("#collapse-mobile-menu").on('click', function click(event) {
		event.preventDefault();
		if($("#container-mobile-nav").hasClass('no-visibility')) {
			$("#container-mobile-nav").removeClass('no-visibility').addClass('visibility');
			$("body").css({overflow: 'hidden'});
		}
	});
	$("#mobile-nav a").on('click', function clickItemNavMobile(event) {
		event.preventDefault();
		var role = this.getAttribute('data-role');
		var offset = $("#"+role).offset();
		if(offset) {
			$("#container-mobile-nav").removeClass('visibility').addClass('no-visibility');
			$("body").css({overflow: "auto"});
			if(role == "team" ) {
				offset.top += 120;
			}
			else if(role == "contact") {
				offset.top += 75;
			}
			$("html, body").stop().animate({scrollTop: offset.top}, "3000", "swing");
		}
	});
	$("#container-mobile-nav > a").on('click', function click(event) {
		event.preventDefault();
		$("#container-mobile-nav").removeClass('visibility').addClass('no-visibility');
		$("body").css({overflow: "auto"});
	});
	/*/Mobile Nav*/


	$("#btn-down").on('click', function scrollDown(event) {
		var offsetDown = $(".history-tikalopers").offset();
		$('html, body').stop().animate({scrollTop: offsetDown.top+35}, "1500", "swing");
	});
	$("#btn-top").on('click', function scrollTop() {
		$('html, body').stop().animate({scrollTop: 0}, "10000", "swing");
	});


	$(".btn-buy-service").on('click', function buyService(event) {
		event.preventDefault();
		var id_service = event.target.getAttribute('data-service-id');
		var service = services[id_service];
		$("#selected-service").text("").text(service.service).attr("data-service-id", id_service);
		$('body')
				.css({
					overflow: 'hidden'
				});

		$("#ModalCotizacion")
			.removeClass('no-visibility')
			.addClass('visibility');
	});

	$("#btn-buy-package-service").on('click', function buyPackageServices(event) {
		event.preventDefault();
		$('body').css({overflow: 'hidden'});
		$("#ModalPaquete").removeClass('no-visibility').addClass('visibility');
	});

	$("section.modal .close").on({
		click: function click() {
			$(this).parent().parent().removeClass('visibility').addClass('no-visibility');
			$('body').css({overflow: 'auto'});
		}
	});

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


	document.formulario_cotizacion.addEventListener('invalid', invalidInputForm, true);
	document.formulario_cotizacion.addEventListener('input', inputEvt, false);

	document.formulario_cotizacion_paquete.addEventListener('invalid', invalidInputForm, true);
	document.formulario_cotizacion_paquete.addEventListener('input', inputEvt, false);

	document.form_contact.addEventListener('invalid', invalidInputForm, true);
	document.form_contact.addEventListener('input', inputEvt, false);

	document.form_subscribe.addEventListener('invalid', invalidInputForm, true);
	document.form_subscribe.addEventListener('input', inputEvt, false);	

	$(".item-service-selected").on('click', function clickItemService(event) {
		event.preventDefault();
		if($(this).hasClass('selectedService')) {
			$(this).removeClass('selectedService')
		}
		else {
			$(this).addClass('selectedService')	
		}

		var children = $(this).siblings(".selectedService");
		if(children.length == 0 || ( !($(this).hasClass('selectedService')) && children.length == 1 ) ) {
			$("#formulario_cotizacion_paquete input, #formulario_cotizacion_paquete textarea").attr('disabled', 'disabled').attr('placeholder', 'Deshabilitado');
			$("#formulario_cotizacion_paquete input").eq(0).attr('autofocus','autofocus');
			$("#formulario_cotizacion_paquete button").attr('disabled', 'disabled');
		}
		else {
			$("#formulario_cotizacion_paquete input, #formulario_cotizacion_paquete textarea").removeAttr('disabled').removeAttr('placeholder');
			$("#formulario_cotizacion_paquete input").eq(0).attr('autofocus', 'autofocus');
			$("#formulario_cotizacion_paquete button").removeAttr('disabled');
		}
	});
	$("#navigation a").on('click', function click(e) {
		e.preventDefault();
		var role = this.getAttribute('data-role');
		var offset = $("#"+role).offset();
		if(offset) {
			$("#container-mobile-nav").removeClass('visibility').addClass('no-visibility');
			$("body").css({overflow: "auto"});

			$("html, body").stop().animate({scrollTop: offset.top-65}, "3000", "swing");
		}
	});
	var html_benefits = {
		"web": "<div id='container-title-benefits'><h2 class='no-margin'>DESARROLLO WEB</h2> </div> <div class='description-services'> <ul class='list-none'> <li> Diseño orientado al usuario (UX) </li> <li> Diseño adaptable a diferentes resoluciones </li> <li> Optimizado para SEO </li> <li> Google Analytics </li> </ul> <h3> TECNOLOGÍAS </h3> <ul class='list-none'> <li> HTML5 </li> <li> CSS3 </li> <li> JavaScript </li> </ul> <p> <strong> No creamos sitios web para tu empresa, creamos verdaderas experiencias online a tus clientes </strong> </p> </div>",
		"app": "<div id='container-title-benefits'><h2 class='no-margin'>APLICACIONES MOVILES</h2> </div><div class='description-services'> <ul class='list-none'> <li> UX/UI </li> <li> Multiplataforma (Híbrida) </li> <li> Google Analytics </li> </ul> <h3>TECNOLOGÍAS</h3> <ul class='list-none'> <li> HTML5 </li> <li> CSS3 </li> <li> JavaScript </li> <li> Ionic Framework </li> <li> Angular Material Design </li> </ul> <p> <strong> No hacemos apps.  Hacemos que tus clientes siempre lleven tu empresa en alguna parte de ellos </strong> </p> </div>",
		"marketing": "<div id='container-title-benefits'><h2 class='no-margin'>SOCIAL MEDIA MARKETING</h2> </div><div class='description-services'> <ul class='list-none'> <li> UX/UI </li> <li> Multiplataforma (Híbrida) </li> <li> Google Analytics </li> </ul> <h3>TECNOLOGÍAS</h3> <ul class='list-none'> <li> HTML5 </li> <li> CSS3 </li> <li> JavaScript </li> <li> Ionic Framework </li> <li> Angular Material Design </li> </ul> <p> <strong> No hacemos apps.  Hacemos que tus clientes siempre lleven tu empresa en alguna parte de ellos </strong> </p> </div>"
	};
	$(".btn-benefits-service").on('click', function click(e) {
		e.preventDefault();
		var role = $(this).attr('data-role');
		var html = html_benefits[role];
		$("#ModalBeneficios #container-beneficios").html(html);
		$("#ModalBeneficios").removeClass('no-visibility').addClass('visibility');
		$("body").css({overflow: 'hidden'});
	});
};

$(document).on('ready', ready);
