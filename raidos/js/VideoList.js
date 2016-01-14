var tag = document.createElement('script'); //Add a script tag
tag.src = "https://www.youtube.com/iframe_api"; //Set the SRC to get the API
var firstScriptTag = document.getElementsByTagName('script')[0]; //Find the first script tag in the html
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); //Put this script tag before the first one

var lists = [];
var indices = [];

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
x = w.innerWidth || e.clientWidth || g.clientWidth,
y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var ppv_index = 0;
var raw_index = 0;
	
var toLoad = Math.max((Math.floor((x - 20) / 225) - 1), 4)

var holders = document.getElementsByClassName("episode-holder");
for (i = 0; i < holders.length; i++) { 
    getPlaylistData(holders[i].id);
}

function getPlaylistData(playlistID, page_token) { //Makes a single request to Youtube Data API
  var apiKey = 'AIzaSyArQNfmJDkjxP_ZyZIocbyuDeyTanf4Rl8';
  var theUrl =
  'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet' +
  '&maxResults='+ 50 + //Can be anything from 1-50
  '&playlistId=' + playlistID +
  '&key=' + apiKey
  ;
  if(page_token){ theUrl +=('&pageToken=' + page_token );} //If there is page token, start there
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, true);
  xmlHttp.send( null );
  xmlHttp.onload = function (e) { //when the request comes back
    buildJSON(xmlHttp.responseText, playlistID); //send the data to buildJSON
  };
}

function buildJSON(response, playlistID){ //Takes the text response and adds it to any existing JSON data
  var results = JSON.parse(response); //Parse it
  var list = []; //If there is no list to add to, make one
  list.push.apply(list,results.items); //Add JSON data to the list
  if(results.nextPageToken){ //If the results included a page token
    getPlaylistData(playlistID, results.nextPageToken); //Create another data API request including the current list and page token
  } else { //If there is not a next-page token
    buildHTML(list, playlistID); //Send the JSON data to buildHTML
  }
}

function buildHTML(list, playlistID) {
	lists[playlistID] = list;
	
	generate_DOM(playlistID, playlistID+"-more", toLoad)
}
	
function onclick_DOM(me) {
	var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight|| e.clientHeight|| g.clientHeight;

	var ppv_index = 0;
	var raw_index = 0;
		
	var toLoad = Math.max((Math.floor((x - 20) / 225) - 1), 4)
	
	var playlist_id = me.id.split("-more")[0];
	
	generate_DOM(playlist_id, me.id, toLoad - (indices[playlist_id]%toLoad));
}

function generate_DOM(holder_id, more_id, howmany) {
	if(indices[holder_id]) {
		var index = indices[holder_id];
	} else {
		var index = 0;
	}
	var count = 0;
	var hadToBreak = false;
	var json = lists[holder_id];
	cont = document.getElementById(holder_id);
	more_obj = document.getElementById(more_id);
	var new_more_obj = more_obj.cloneNode(true);
	more_obj.parentNode.removeChild(more_obj);
	
	for(i = 0; i < howmany; i++) {
		if (i+index < json.length) {
			obj = json[i+index].snippet;
		} else {
			hadToBreak = true;
			break;
		}
		
		count++;
		
		var gamebits = obj.title.split(" (");
		
		var namebits = gamebits[0].split(" - ");
		var name = namebits[1];
		
		for(j = 2; j < namebits.length; j++) {
			name = name + " - " + namebits[j];
		}
		
		if(gamebits.length > 1) {
			name = name + "<br/>(" + gamebits[1].split(")")[0] + ")";
		}
		
		episode = document.createElement("DIV");
		episode.className = "episode";
		episode.onmouseover = function() {
			this.childNodes[2].style.visibility = "visible";
			this.childNodes[2].style.opacity = 1;
		}
		episode.onmouseout = function() {
			this.childNodes[2].style.visibility = "hidden";
			this.childNodes[2].style.opacity = 0;
		}
		episode_link = document.createElement("A");
		episode_link.href = "player.html#"+obj.playlistId+"&"+(i+index);
		episode_figure = document.createElement("DIV");
		episode_figure.style.position = "relative";
		episode_img = document.createElement("IMG");
		episode_img.src = obj.thumbnails.medium.url;
		episode_img.className = "thumbnail";
		//episode_figcap = document.createElement("span");
		//episode_figcap.className = "timecode";
		//episode_figcap.innerHTML = obj.length;
		episode_text = document.createElement("P");
		episode_text.className = "episode-title";
		episode_text.innerHTML = name;
		
		details = document.createElement("DIV");
		details.className = "episode_details";
		details.style.zIndex = 1;
		details_left = document.createElement("DIV");
		details_link = document.createElement("A");
		details_link.href = "player.html#"+obj.playlistId+"&"+(i+index);
		details_figure = document.createElement("DIV");
		details_figure.style.position = "relative";
		details_img = document.createElement("IMG");
		details_img.src = obj.thumbnails.medium.url;
		details_img.className = "thumbnail";
		//details_figcap = document.createElement("span");
		//details_figcap.className = "timecode";
		//details_figcap.innerHTML = obj.length;
		details_img_overlay = document.createElement("IMG");
		details_img_overlay.src = "images/play_overlay.png";
		details_img_overlay.className = "play-overlay";
		
		episode.appendChild(episode_link);
		episode_link.appendChild(episode_figure);
		episode_figure.appendChild(episode_img);
		//episode_figure.appendChild(episode_figcap);
		episode.appendChild(episode_text);
		cont.appendChild(episode);
		
		details.appendChild(details_left);
		details_left.appendChild(details_link);
		details_link.appendChild(details_figure);
		details_figure.appendChild(details_img);
		//details_figure.appendChild(details_figcap);
		details_figure.appendChild(details_img_overlay);
		episode.appendChild(details)
	}
	if (!hadToBreak && i+index != json.length) {
		cont.appendChild(new_more_obj);
	}
	indices[holder_id] = index + count;
}