function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom : 6,
		center : {
			lat : -41.15,
			lng : 172.65
		}
	});

	for (var i = 0; i < locations.length; i++) {
		var point = locations[i];
		var scale = 1.2;
		var icon;
		if (point[6] != null && point[6]) {
			icon = "icons/marker-building.png";
		} else {
			icon = "icons/marker.png";
		}
		var marker = new google.maps.Marker({
			position : {
				lat : point[2],
				lng : point[3]
			},
			label : point[4].toString(),
			map : map,
			title : point[1],
			icon : {
				url : icon,
				size : new google.maps.Size(22 * scale, 32 * scale),
				origin : new google.maps.Point(0, 0),
				labelOrigin : new google.maps.Point(11 * scale, 11 * scale),
				anchor : new google.maps.Point(11 * scale, 32 * scale),
				scaledSize : new google.maps.Size(22 * scale, 32 * scale)
			}
		});
		markers[i] = marker;
		marker.addListener('click', function() {
			map.setCenter({
				lat : this.position.lat(),
				lng : this.position.lng()
			});
		});
	}

	autocomplete = new google.maps.places.Autocomplete(
	/** @type {!HTMLInputElement} */(
		document.getElementById('autocomplete')), {
		componentRestrictions : countryRestrict
	});

	autocomplete.addListener('place_changed', onPlaceChanged);

	//Get the hash if there is any and zoom to it
	var hash = location.hash.substring(1);
	if (hash != "") {
		changeLocation(hash);
	}

	//Set up directions
	directionsService = new google.maps.DirectionsService();
}

function changeLocation(loc) {
	for (var i = 0; i < cities.length; i++) {
		var city = cities[i];
		if (city[0] == loc) {
			map.setCenter({
				lat : city[2],
				lng : city[3]
			});
			map.setZoom(15);
			window.location.hash = '#' + loc;
		}
	}
}

function onPlaceChanged() {
	var place = autocomplete.getPlace();
	if (place.geometry) {
		map.panTo(place.geometry.location);
		map.setZoom(17);
		if (dest_marker != null) {
			dest_marker.setMap(null);
		}
		var scale = 1.5;
		dest_marker = new google.maps.Marker({
			position : place.geometry.location,
			map : map,
			icon : {
				url : 'icons/marker-x.png',
				size : new google.maps.Size(22 * scale, 22 * scale),
				origin : new google.maps.Point(0, 0),
				labelOrigin : new google.maps.Point(11 * scale, 11 * scale),
				anchor : new google.maps.Point(11 * scale, 11 * scale),
				scaledSize : new google.maps.Size(22 * scale, 22 * scale)
			},
			title : "Destination"
		});
		var destLat = place.geometry.location.lat();
		var destLng = place.geometry.location.lng();

		if (dest_circle != null) {
			dest_circle.setMap(null);
		}
		dest_circle = new google.maps.Circle({
			strokeColor : '#000000',
			strokeOpacity : 0.6,
			strokeWeight : 1,
			fillColor : '#FFFFFF',
			fillOpacity : 0.3,
			map : map,
			center : place.geometry.location,
			radius : 400
		});

		var pane = document.getElementById("results");
		while (pane.hasChildNodes()) {
			pane.removeChild(pane.lastChild);
		}
		var loadingImg = document.createElement("IMG");
		loadingImg.src = "icons/loading.gif";
		loadingImg.className = "loader-gif";
		pane.appendChild(loadingImg);

		spotsToAdd = [];
		spotsTrying = 0;
		spotsAdded = 0;
		spotsLookedAt = 0;
		for (var i = 0; i < markers.length; i++) {
			var mark = markers[i];
			var distance = distBetween(destLat, destLng, mark.position.lat(), mark.position.lng());
			if (distance >= 0.4) {
				mark.setOpacity(0.4);
			} else {
				spotsTrying++;
				console.log("Trying at to add Park #" + i);
				addDelayedParkingSpot(i, mark, place.geometry.location);
			}
			spotsLookedAt++;
		}

		if (spotsTrying == 0) {
			while (pane.hasChildNodes()) {
				pane.removeChild(pane.lastChild);
			}
			var noParksFound = document.createElement("SPAN");
			noParksFound.innerHTML = "No Parks Found";
			noParksFound.className = "no-parks";
			pane.appendChild(noParksFound);
		}
	}
}

function resetPage() {
	window.location.hash = "";
	clearSearchFilter();
	map.setCenter({
		lat : -41.15,
		lng : 172.65
	});
	map.setZoom(6);

	document.getElementById("autocomplete").value = "";
	var pane = document.getElementById("results");
	while (pane.hasChildNodes()) {
		pane.removeChild(pane.lastChild);
	}
}

function clearSearchFilter() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setOpacity(1.0);
	}
	if (dest_marker != null) {
		dest_marker.setMap(null);
	}
	if (dest_circle != null) {
		dest_circle.setMap(null);
	}
}

function addDelayedParkingSpot(i, mark, dest) {
	setTimeout(function() {
		addParkingSpot(i, mark, dest);
	}, 500 * (spotsTrying - spotsAdded));
}

function addParkingSpot(i, mark, dest) {
	mark.setOpacity(1.0);
	var request = {
		origin : mark.position,
		destination : dest,
		provideRouteAlternatives : false,
		travelMode : 'WALKING',
		unitSystem : google.maps.UnitSystem.METRIC
	};
	directionsService.route(request, function(result, status) {
		if (status == 'OK') {
			console.log("ADDED PARK #" + i);
			spotsAdded++;
			var spot = {};
			spot.index = i;
			spot.result = result;
			spotsToAdd.push(spot);
			checkIfAddedAll();
		}
	});
}

function checkIfAddedAll() {
	console.log("Trying: " + spotsTrying + " and Added: " + spotsAdded + " and Looked At: " + spotsLookedAt);
	if (spotsTrying == spotsAdded && spotsLookedAt == markers.length) {
		console.log("YE");
		console.log(spotsToAdd);
		spotsToAdd.sort(function(a, b) {
			console.log("Comparing: " + a.index + " and " + b.index);
			var keyA = a.result.routes[0].legs[0].duration.value;
			keyB = b.result.routes[0].legs[0].duration.value;
			if (keyA < keyB)
				return -1;
			if (keyA > keyB)
				return 1;
			return 0;
		});
		console.log(spotsToAdd);

		var pane = document.getElementById("results");
		while (pane.hasChildNodes()) {
			pane.removeChild(pane.lastChild);
		}
		for (var i = 0; i < spotsToAdd.length; i++) {
			pane.appendChild(constructResult(spotsToAdd[i].result, spotsToAdd[i].index));
		}
	}
}

function distBetween(lat1, lng1, lat2, lng2) {
	lat1 = lat1 * (Math.PI / 180);
	lng1 = lng1 * (Math.PI / 180);
	lat2 = lat2 * (Math.PI / 180);
	lng2 = lng2 * (Math.PI / 180);
	return Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2)) * 6371;
}

function constructResult(results, i) {
	var outer = document.createElement("DIV");
	outer.className = "results-card";
	outer.id = "result-" + i;
	outer.onmouseover = function() {
		markers[i].setIcon({
			url : 'icons/marker-selected.png',
			size : new google.maps.Size(22 * 1.5, 32 * 1.5),
			origin : new google.maps.Point(0, 0),
			labelOrigin : new google.maps.Point(11 * 1.5, 11 * 1.5),
			anchor : new google.maps.Point(11 * 1.5, 32 * 1.5),
			scaledSize : new google.maps.Size(22 * 1.5, 32 * 1.5)
		});
		this.style.background = "#b4e3d0";
	};
	outer.onmouseout = function() {
		markers[i].setIcon({
			url : 'icons/marker.png',
			size : new google.maps.Size(22 * 1.2, 32 * 1.2),
			origin : new google.maps.Point(0, 0),
			labelOrigin : new google.maps.Point(11 * 1.2, 11 * 1.2),
			anchor : new google.maps.Point(11 * 1.2, 32 * 1.2),
			scaledSize : new google.maps.Size(22 * 1.2, 32 * 1.2)
		});
		this.style.background = "#f0f0f0";
	};
	var img = document.createElement("IMG");
	img.src = "parks/thumbs/" + locations[i][0] + ".jpg";
	img.className = "results-img";
	var details = document.createElement("DIV");
	details.className = "results-details";
	var address = document.createElement("DIV");
	address.className = "results-address";
	address.innerHTML = locations[i][1];
	var numbers = document.createElement("DIV");
	numbers.className = "results-numbers";
	var parks = document.createElement("SPAN");
	parks.innerHTML = locations[i][4] + "P";

	var seconds = results.routes[0].legs[0].duration.value;
	var time = document.createElement("SPAN");
	//time.innerHTML = Math.floor(seconds/60) + ":" + padValue(seconds%60);
	var mins = Math.round(seconds / 60);
	if (mins > 1) {
		time.innerHTML = mins + " mins";
	} else if (mins == 1) {
		time.innerHTML = mins + " min";
	} else if (mins == 0) {
		time.innerHTML = "<1 min";
	}

	var meters = results.routes[0].legs[0].distance.value;
	var distance = document.createElement("SPAN");
	distance.innerHTML = meters + " m";

	numbers.appendChild(parks);
	numbers.appendChild(time);
	numbers.appendChild(distance);

	details.appendChild(address);
	details.appendChild(numbers);

	outer.appendChild(img);
	outer.appendChild(details);

	return outer;
}

function padValue(i) {
	if (i < 10) {
		return "0" + i;
	} else {
		return i;
	}
}