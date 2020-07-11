$(function() {
	$("html").click(hideSidePanel);
	
	$("#sidePanel").click(function() {
		event.stopPropagation();
	});
	
	var hash;
	if(location.hash == null || location.hash == "") {
		hash = "projects";
	} else {
		hash = location.hash.substr(1);
	}
	
	if(jsonLabels[hash] != null && jsonLabels[hash] != "") {
		//Do the thing
		$('#content-name').text(jsonLabels[hash]);
		jsonBoxes.forEach(function(box) {
			if(box.categories.includes(hash)) {
				//Make outer element
				if(box.categories.includes('media')) {
					//Structure like Media		
					d = document.createElement('div');
					$(d).addClass('media-cont');
					box.categories.forEach(function(className) {
						$(d).addClass(className);
					});		
					$(d).click(function(){ showMediaInfo(box.name); });
					
					f = document.createElement('div');
					$(f).addClass('media-logo-cont');
					$(d).append(f);
					sc = document.createElement('div');
					$(sc).addClass('media-logo');
					$(sc).html('<img class="media-logo-img" src="images/logos_white/' + box.logo + '" alt="' + box.title + ' Image"/>');
					$(f).append(sc);
					
					e = document.createElement('div');
					$(e).addClass('media-text-cont');
					$(d).append(e);
					
					title = document.createElement('div');
					$(title).addClass('media-title');
					$(title).attr('data-date', box.date);
					$(title).text(box.title);
					$(e).append(title);
					
					country = document.createElement('div');
					$(country).addClass('media-text');
					$(country).html(box.date + ', ' + box.country.city + ' <img src="images/blank.gif" class="flag flag-' + box.country.code + '" alt="' + box.country.text + '" />');
					$(e).append(country);
					
				} else if(box.categories.includes('work') || box.categories.includes('projects') || box.categories.includes('accomplishments')) {
					//Structure like Work Experience or Project or Accomplishment
					d = document.createElement('div');
					$(d).addClass('project-cont');
					box.categories.forEach(function(className) {
						$(d).addClass(className);
					});
				
					//Make Screenshot
					sc = document.createElement('div');
					$(sc).addClass('project-screenshot-cont');
					$(sc).html('<img class="project-screenshot" src="images/' + box.screenshot + '" alt="' + box.title + ' Image"/>');
					$(d).append(sc);
					
					//Make Project Logo
					logo = document.createElement('div');
					$(logo).addClass('project-logo-cont');
					if(box.logoLink != null && box.logoLink != "") {
						$(logo).html('<a href="' + box.logoLink + '" target="_blank"><img class="project-logo" src="images/' + box.logo + '" alt="' + box.title + ' Logo"/></a>');
					} else {
						$(logo).html('<img class="project-logo" src="images/' + box.logo + '" alt="' + box.title + ' Logo"/>');
					}
					$(d).append(logo);
					
					//Make Project Links
					projectLinks = document.createElement('div');
					$(projectLinks).addClass('project-links');
					box.links.forEach(function(link) {
						url = document.createElement('a');
						url.target = "_blank";
						url.href = link.link;
						$(url).html('<img class="project-icon" src="icons/' + link.image + '" alt="' + link.text + '" title="' + link.text + '"/>');
						$(projectLinks).append(url);
					});
					$(d).append(projectLinks);
					
					if(box.categories.includes('work')) {
						//Make Project Title 
						title = document.createElement('div');
						$(title).addClass('project-title');
						$(title).html(box.role + "<br/>(" + box.title + ")");
						$(d).append(title);
						
						//Make Project Years
						years = document.createElement('div');
						$(years).addClass('project-years');
						$(years).text(box.years);
						$(d).append(years);
					} else {
						//Make Project Title 
						title = document.createElement('div');
						$(title).addClass('project-title');
						$(title).text(box.title);
						$(d).append(title);
					}
					
					//Make Project Description
					description = document.createElement('div');
					$(description).addClass('project-description');
					$(description).text(box.description);
					$(d).append(description);
				}
				
				$('#content').append(d);
			}
		});
	} else {
		$('#content-name').text("Unrecognized URL");
	}
	
	$('header a').click(function() {
		window.location.href = this.href;
		location.reload();
	});
	
	//Set the Sticky Image
	var gradyImages = [
		{
			"src": "images/grady/1-700tall.png",
			"title": "Grady at 1 years old"
		},
		{
			"src": "images/grady/2-700tall.png",
			"title": "Grady at 6 years old"
		},
		{
			"src": "images/grady/3-700tall.png",
			"title": "Grady at 11 years old"
		},
		{
			"src": "images/grady/4-700tall.png",
			"title": "Grady at 16 years old"
		},
		{
			"src": "images/grady/5-700tall.png",
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

function showMediaInfo(id) {
	event.stopPropagation();
	
	$("#sidePanel").html('<div class="close" onclick="hideSidePanel()">🗙</div>');
	
	var info;
	jsonBoxes.forEach(function(box) {
		if(box.name == id) {
			info = box;
			return false;
		}
	});
	
	img = document.createElement('div');
	$(img).addClass('sidepanel-image-cont');
	$(img).html('<img class="sidepanel-image" src="images/media/' + info.name + '.png" alt="' + info.title + ' Image"/>');
	$('#sidePanel').append(img);
	
	links = document.createElement('div');
	$(links).addClass('sidepanel-links-cont');
	info.links.forEach(function(link) {
		l = document.createElement('a');
		$(l).attr("href", link.link);
		$(l).attr("target", "_blank");
		$(l).addClass('sidepanel-link');
		$(l).html('<img class="sidepanel-link-image" src="images/media/' + link.image + '" /> <span>' + link.text + '</span>');
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