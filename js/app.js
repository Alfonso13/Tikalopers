function init() {
	$(".menu-navigation a").on('click', function click(e) {
		e.preventDefault();
		var transition = $(this).attr('data-transition');
		var offset = $("#"+transition).offset().top;
		$('html, body').stop().animate({scrollTop: offset}, "2000", "swing");
	});
};

$(document).on('ready', init);