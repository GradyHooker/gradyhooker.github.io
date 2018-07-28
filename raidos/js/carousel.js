$(function() {
	$('.carousel').slick({
		infinite: false,
		slidesToShow: 3,
		swipeToSlide: true
	});
	resizeSlick();
});

function resizeSlick() {
	var fitWidth = Math.max(Math.floor($('.carousel').width()/300), 1);
	var currentShowing = $('.carousel').slick("slickGetOption", "slidesToShow");
	if(currentShowing != fitWidth) {
		$('.carousel').slick("slickSetOption", "slidesToShow", fitWidth, true);
	}
}