$(function() {
	//Close side panel
	$("html").click(hideSidePanel);

	//Set the Sticky Image
	var gradyImages = [
		{
			"src": "/assets/characters/1-700tall.png",
			"title": "Grady at 1 years old"
		},
		{
			"src": "/assets/characters/2-700tall.png",
			"title": "Grady at 6 years old"
		},
		{
			"src": "/assets/characters/3-700tall.png",
			"title": "Grady at 11 years old"
		},
		{
			"src": "/assets/characters/4-700tall.png",
			"title": "Grady at 16 years old"
		},
		{
			"src": "/assets/characters/5-700tall.png",
			"title": "Grady at 21 years old"
		},
		{
			"src": "/assets/characters/6-700tall.png",
			"title": "Grady at 26 years old"
		}
	];
	
	//If it exists, change the logo
	if($('.logo').length > 0) {
		var date = new Date();
		var dateString = (date.getMonth()+1) + "/" + date.getDate();
		
		if(dateCheck("5 Feb", "11 Feb", dateString)) {
			$('.logo-img').attr("src", "/assets/logos/birthday.png");
			$('.logo-img').attr("title", "Happy Birthday to Me!");
		} else if(dateCheck("12 Feb", "17 Feb", dateString)) {
			$('.logo-img').attr("src", "/assets/logos/valentines.png");
			$('.logo-img').attr("title", "Happy Valentines Day!");
		} else if(dateCheck("14 Mar", "20 Mar", dateString)) {
			$('.logo-img').attr("src", "/assets/logos/stpaddys.png");
			$('.logo-img').attr("title", "Happy St Patricks Day!");
		} else if(dateCheck("22 Apr", "28 Apr", dateString)) {
			$('.logo-img').attr("src", "/assets/logos/anzac.png");
			$('.logo-img').attr("title", "Least We Forget");
		} else if(dateCheck("1 May", "31 May", dateString)) {
			$('.logo-img').attr("src", "/assets/logos/pride.png");
			$('.logo-img').attr("title", "Happy Pride!");
		} else if(dateCheck("16 Sep", "22 Sep", dateString)) {
			$('.logo-img').attr("src", "/assets/logos/pirate.png");
			$('.logo-img').attr("title", "Yarrrrrrrrr!");
		} else if(dateCheck("5 Oct", "11 Oct", dateString)) {
			$('.logo-img').attr("src", "/assets/logos/breastcancer.png");
			$('.logo-img').attr("title", "Breast Cancer Awareness");
		} else if(dateCheck("28 Oct", "3 Nov", dateString)) {
			$('.logo-img').attr("src", "/assets/logos/halloween.png");
			$('.logo-img').attr("title", "Happy Halloween!");
		} else {
			$('.logo-img').attr("src", "/assets/logos/white.png");
			$('.logo-img').attr("title", "Grady Hooker Logo");
		}
	}
	
	var counter = Math.floor(Math.random() * Math.floor(5));
	setInterval(cycleImages, 7500);
	changeImage();
	
	function changeImage() {
		$('#sticky').html('<img src="' + gradyImages[counter].src + '" title="' + gradyImages[counter].title + '" />').fadeIn(500);
		counter++;
		if(counter >= 6) counter = 0;
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
	$(img).html('<img class="sidepanel-image" src="assets/media/banners/' + info.name + '.png" title="' + info.title + ' Image"/>');
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

function dateCheck(from,to,check) {

    var fDate,lDate,cDate;
    fDate = Date.parse(from+" 2020");
    lDate = Date.parse(to+" 2020");
    cDate = Date.parse(check+" 2020");

    if((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
}