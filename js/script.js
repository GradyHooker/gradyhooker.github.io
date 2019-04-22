$(function() {
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
				d = document.createElement('div');
				$(d).addClass('project-cont');
				box.categories.forEach(function(className) {
					$(d).addClass(className);
				});

				if(box.categories.includes('media')) {
					//Structure like Media
					//Make Screenshot
					sc = document.createElement('div');
					$(sc).addClass('project-screenshot-cont');
					$(sc).html('<img class="project-screenshot" src="images/media/' + box.screenshot + '" alt="' + box.title + ' Image"/>');
					$(d).append(sc);
				
					//Make Project Title
					title = document.createElement('div');
					$(title).addClass('project-title');
					$(title).attr('data-date', box.date);
					$(title).text(box.title);
					$(d).append(title);
					
					//Make Project Country
					country = document.createElement('div');
					$(country).addClass('project-country');
					$(country).html('<img src="images/blank.gif" class="flag flag-' + box.country.code + '" alt="' + box.country.text + '" /> ' + box.country.city);
					$(d).append(country);
					
					//Make Media Logo
					mediaLogo = document.createElement('div');
					$(mediaLogo).addClass('media-logo-cont');
					if(box.links.length > 8) $(mediaLogo).addClass('media-logo-cont-small');
					box.links.forEach(function(link) {
						url = document.createElement('a');
						url.target = "_blank";
						url.href = link.link;
						$(url).html('<img src="images/media/' + link.image + '" class="media-logo" alt="' + link.text + '" title="' + link.text + '"/>');
						$(mediaLogo).append(url);
					});
					$(d).append(mediaLogo);
					
				} else if(box.categories.includes('work') || box.categories.includes('projects') || box.categories.includes('accomplishments')) {
					//Structure like Work Experience or Project or Accomplishment
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
});