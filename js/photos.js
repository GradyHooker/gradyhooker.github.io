function makePhotosFull(albumName) {
	$('.photo-image').on('load', reorganisePhotos);
	$(window).resize(reorganisePhotos);
	reorganisePhotos();
}

var lastRunWidth = 0;

function reorganisePhotos() {	
	var prefHeight = 250;
	if($(window).width() < 1000) {
		prefHeight = 200;
	}
	
	var minPerRow = 2;
	if($(window).width() < 420) {
		minPerRow = 1;
	}
	
	var totalWidth = $('.photos').width();
	var rowWidth = 0;
	var rowheight = 0;
	var row = [];
	
	$('.photo-image').each(function () {
		$(this).height(prefHeight);
		var imgWidth = $(this).width() + 4;
		rowWidth += imgWidth;
		
		if(rowWidth > totalWidth && row.length >= minPerRow) {
			rowWidth -= imgWidth;
			rowHeight = Math.max((totalWidth/rowWidth)*prefHeight,(rowWidth/totalWidth)*prefHeight);
			$(row).each(function() {
				$(this).height(rowHeight);
			});
			
			row = [];
			rowWidth = imgWidth;
		}
		row.push(this);
	});
}

/////////////////////////////////////////////////

var initCarousel = false;

function showPhotos(photoName) {
	console.log("Showing #" + photoName);
	
	if(!initCarousel) {
		//With Captions
		$(".slides").slick({
		  asNavFor: '.captions',
		  infinite: false,
		  speed: 1000,
		  arrows: false,
		  autoplay: true,
		  swipeToSlide: true,
		  infinite: true
		})

		$(".captions").slick({
		  asNavFor: '.slides',
		  infinite: false,
		  speed: 1000,
		  fade: true,
		  infinite: true,
		  appendArrows: $('.pagination'),
		  prevArrow: '<div class="pagination__button"><</div>',
		  nextArrow: '<div class="pagination__button">></div>'
		})
		
		$(".slides").slick("slickSetOption", "lazyLoad", "anticipated");
		
		initCarousel = true;
	}
	
	$('.photocarousel-cont').fadeIn(400).css("display", "flex");
	$('.slick-current').focus();
	$('.slides').slick("slickGoTo", photoName);
}

$('.photocarousel-cont').click(function(e) {
	if(e.target.classList.contains("photocarousel-cont")) {
		$('.photocarousel-cont').fadeOut(400);
	}
});

$('.closebtn').click(function(e) {
	$('.photocarousel-cont').fadeOut(400);
});