$(function() {
	//Close side panel
	$("html").click(hideSidePanel);

	//Set the Sticky Image
	var gradyImages = [
		{
			"src": "assets/characters/1-700tall.png",
			"title": "Grady at 1 years old"
		},
		{
			"src": "assets/characters/2-700tall.png",
			"title": "Grady at 6 years old"
		},
		{
			"src": "assets/characters/3-700tall.png",
			"title": "Grady at 11 years old"
		},
		{
			"src": "assets/characters/4-700tall.png",
			"title": "Grady at 16 years old"
		},
		{
			"src": "assets/characters/5-700tall.png",
			"title": "Grady at 21 years old"
		}
	];
	
	var counter = Math.floor(Math.random() * Math.floor(5));
	setInterval(cycleImages, 7500);
	changeImage();
	
	function changeImage() {
		$('#sticky').html('<img src="' + gradyImages[counter].src + '" title="' + gradyImages[counter].title + '" />').fadeIn(500);
		counter++;
		if(counter >= 5) counter = 0;
		$('#preload').html('<img src="' + gradyImages[counter].src + '" title="' + gradyImages[counter].title + '" />');
	}
	
	function cycleImages() {
		$('#sticky').addClass('hide');
		setTimeout(function (){
			changeImage();
			$('#sticky').removeClass('hide');
		}, 500);
	};
});

function showMediaInfo(info) {
	event.stopPropagation();
	
	$("#sidePanel").html('<div class="close" onclick="hideSidePanel()"><i class="fas fa-times"></i></div>');
	
	img = document.createElement('div');
	$(img).addClass('sidepanel-image-cont');
	$(img).html('<img class="sidepanel-image" src="assets/media/banners/' + info.name + '.png" alt="' + info.title + ' Image"/>');
	$('#sidePanel').append(img);
	
	links = document.createElement('div');
	$(links).addClass('sidepanel-links-cont');
	info.links.forEach(function(link) {
		l = document.createElement('a');
		$(l).attr("href", link.link);
		$(l).attr("target", "_blank");
		$(l).addClass('sidepanel-link');
		$(l).html('<img class="sidepanel-link-image" src="assets/media/icons/' + link.image + '.png" /> <span>' + link.text + '</span>');
		$(links).append(l);
	});
	if(info.links.length == 0) {
		$(links).html('<div class="sidepanel-links-none">No Content Found</div>');
	}
	$('#sidePanel').append(links);
	
	$("#main").addClass("sidePanel");
}

function hideSidePanel() {
	$("#main").removeClass("sidePanel");
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}