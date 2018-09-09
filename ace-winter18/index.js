var autocomplete;
var map;
var mapPoints = [];
var mapMarkers = [];
var numCentroids = 3;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 51.507629,
            lng: -0.126154
        },
        zoom: 12,
        maxZoom: 14
    });
	
    var input = document.getElementById('location');
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setFields(['address_components', 'geometry', 'name', 'photos']);
}

function saveLocations() {
	document.getElementById('jsonDisplay').style.display = "flex";
	document.getElementById('json').value = encodeJsonLocations();
}

function loadLocations() {
	document.getElementById('jsonDisplay').style.display = "flex";
}

function generateLocations() {
	document.getElementById('jsonDisplay').style.display = "none";
	decodeJsonLocations();
}

function encodeJsonLocations() {
	var returnObj = [];
	for (var i = 0; i < mapMarkers.length; i++) {
		returnObj.push({
			lat: mapMarkers[i].position.lat(),
			lng: mapMarkers[i].position.lng(),
			name: mapMarkers[i].title,
			img: mapMarkers[i].cursor
		});
	}
	return JSON.stringify(returnObj, null, 2);
}

function decodeJsonLocations() {
	//Clear everything
	mapPoints = [];
	for(i = 0; i < mapMarkers.length; i++){
		mapMarkers[i].setMap(null);
    }
	mapMarkers = [];
	var table = document.getElementById("table");
	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}
	
	//Add all the stuff
	var jsonString = document.getElementById('json').value;
	var jsonObj = JSON.parse(jsonString);
	for(i = 0; i < jsonObj.length; i++){
		addLocationValues(jsonObj[i].lat, jsonObj[i].lng, jsonObj[i].name, jsonObj[i].img);
    }
}

function addLocation() {
    //Get Place
	var place = autocomplete.getPlace();
	var img = "";
	if(place.photos != null && place.photos.length > 0) img = place.photos[0].getUrl();
	var name = place.name;
	var lat = place.geometry.location.lat();
	var lng = place.geometry.location.lng();
	
	addLocationValues(lat, lng, name, img);
}

function addLocationValues(lat, lng, name, img) {
	//Add to Map
	var p = [lat, lng];
	if(mapPoints.containsArray(p)) return;
	mapPoints.push(p);
	var marker = new google.maps.Marker({
		position: {lat: lat, lng: lng},
		map: map,
		name: lat + "," + lng,
		icon: '0.png',
		title: name,
		cursor: img
	});
	mapMarkers.push(marker);
	
	//Add to Table
	var table = document.getElementById('table');
	var newRow = document.createElement("tr");
	newRow.setAttribute('data-latlng', lat + "," + lng);
	if(img != "") newRow.innerHTML += "<td><img src='" + img + "'/></td>";
	else newRow.innerHTML += "<td>&nbsp;</td>";
	newRow.innerHTML += "<td><b>" + name + "</b><br/><span class='latlng'>" + lat + ", " + lng + "</span></td>";
	newRow.innerHTML += "<td><i class='fas fa-times' onclick='removeLocation(this)'></i></td>";					
	table.appendChild(newRow);
	
	//Update Map Zoom/Pan
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < mapMarkers.length; i++) {
		bounds.extend(mapMarkers[i].getPosition());
	}
	map.fitBounds(bounds);
	
	//Remove value from textbox
	document.getElementById('location').value = "";
	
	//Rerun the Algorithm
	//goKMeans();
}

function removeLocation(t) {
	var row = t.parentNode.parentNode;
	var latLng = row.getAttribute('data-latlng');

	//Remove from Map
	for(i=0; i < mapMarkers.length; i++){
		if(mapMarkers[i].name == latLng) {
			mapMarkers[i].setMap(null);
			mapMarkers.splice(i, 1);
			mapPoints.splice(i, 1);
		}
    }
	
	//Remove from Table
	row.parentNode.removeChild(row);
	
	//Update Map Zoom/Pan
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < mapMarkers.length; i++) {
		bounds.extend(mapMarkers[i].getPosition());
	}
	map.fitBounds(bounds);
	
	//Rerun the Algorithm
	//goKMeans();
}

var centroids = [];
var centroidBins = [];

function goKMeans() {
	if(mapPoints.length < 1) return;
	var meanSquare = 0;
	var meanSquareLast = -1;
	var currentBest;
	var currentBestCentroids;
	var currentBestMeanSquare = Number.MAX_SAFE_INTEGER;
	
	numCentroids = document.getElementById('days').value;
	
	for(var i = 0; i < 100000; i++) {
		generateCentroids();
		meanSquare = 0;
		while(meanSquare != meanSquareLast) {
			meanSquareLast = meanSquare;
			meanSquare = findClosestCentroid();
			
			findClosestCentroid();
			updateCentroid();
		}
		if(meanSquare < currentBestMeanSquare) {
			currentBestMeanSquare = meanSquare;
			currentBest = centroidBins;
			currentBestCentroids = centroids;
		}
	}
	
	//Update map
	for(i=0; i < mapPoints.length; i++){
		for(j=0; j < currentBest.length; j++){
			if(currentBest[j].containsArray(mapPoints[i])) {
				break;
			}
		}
		mapMarkers[i].setIcon((j+1) + '.png');
    }
}

function generateCentroids() {
	centroids = [];
	var top = mapMarkers[0].position.lat();
	var bottom = mapMarkers[0].position.lat();
	var left = mapMarkers[0].position.lng();
	var right = mapMarkers[0].position.lng();
	
	//Find bounds
	for(i = 1; i < mapMarkers.length; i++){
		if(mapMarkers[i].position.lat() > top) top = mapMarkers[i].position.lat();
		if(mapMarkers[i].position.lat() < bottom) bottom = mapMarkers[i].position.lat();
		if(mapMarkers[i].position.lng() > right) right = mapMarkers[i].position.lng();
		if(mapMarkers[i].position.lng() < left) left = mapMarkers[i].position.lng();
    }
	
	for(var i = 0; i < numCentroids; i++) {
		var randomLat = Math.random() * (top - bottom) + bottom;
		var randomLng = Math.random() * (right - left) + left;
		centroids.push([randomLat, randomLng]);
	}
}

function findClosestCentroid() {
	centroidBins = [];
	for (var i = 0; i < numCentroids; i++) {
		centroidBins.push([]);
	}

	for (var i = 0; i < mapPoints.length; i++) {
		var point = mapPoints[i];
		var minDist = Infinity;
		var minIndex = 0;
		for (var j = 0; j < centroids.length; j++) {
			centroid = centroids[j];
			var d = distance(point, centroid);
			if (d < minDist) {
				minDist = d;
				minIndex = j;
			}
		}
		centroidBins[minIndex].push(point);
	}

	var meanSquaredDistance = 0;
	for (var i = 0; i < centroidBins.length; i++) {
		bin = centroidBins[i];

		for (var j = 0; j < bin.length; j++) {
			var dist = distance(centroids[i], bin[j]);
			meanSquaredDistance += dist * dist;
		}
	}

	meanSquaredDistance /= mapPoints.length;
	return meanSquaredDistance;
}

function updateCentroid() {
    var meanSquaredDistance = 0;

    for (var i = 0; i < centroidBins.length; i++) {
        bin = centroidBins[i];
        newCentroid = avgXY(bin);

        for (var j = 0; j < bin.length; j++) {
            var dist = distance(newCentroid, bin[j]);
            meanSquaredDistance += dist * dist;
        }
		
        if (!isNaN(newCentroid[0]) && !isNaN(newCentroid[1])) {
            centroids[i] = newCentroid;
        }
    }

    meanSquaredDistance /= mapPoints.length;
}

function distance(a, b) {
	var x = (a[0]+90)*2 - (b[0]+90)*2;
	var y = (a[1]+180) - (b[1]+180);
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function avgXY(arr) {
	return result = arr.reduce(function (r, a) {
        a.forEach(function (b, i) {
            r[i] = (r[i] || 0) + b;
        });
        return r / arr.length;
    }, []);
}

Array.prototype.containsArray = function(val) {
    var hash = {};
    for(var i=0; i<this.length; i++) {
        hash[this[i]] = i;
    }
    return hash.hasOwnProperty(val);
}