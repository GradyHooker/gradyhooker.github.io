var playlistReturn;

function getPlaylistData(playlist) {
	var playlistID = playlist;
	var apiKey = 'AIzaSyALXD-EdemM7ParCmr0T7NFyTDT386LIDE';
	var theUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet' +
		'&maxResults='+ 2 +
		'&playlistId=' + playlistID +
		'&key=' + apiKey;
		
	var playlistReturn = [];
	$.ajax({
		url: theUrl,
		success: function(response){
			playlistReturn.push(...response['items']);
			constructPodcastBoxCallback(playlist, playlistReturn, response.pageInfo.totalResults);
		},
		error: function(response){
			console.log(response.responseText);
		}
	});
	
	return;
}

function constructPodcastBoxCallback(playlist, playlistItems, numOfItems) {
	var d = $('#' + playlist);
	
	$(d).find('.eps').text(numOfItems);
	
	carousel = $(d).find('.carousel');
	//$(carousel).append("<div>Newest Episodes:</div>");
	
	playlistItems.forEach(function(obj) {
		item = obj.snippet;
		
		url = document.createElement('a');
		$(url).addClass('playlist-item');
		url.target = "_blank";
		url.href = "https://www.youtube.com/watch?v=" + item.resourceId.videoId + "&list=" + item.playlistId;
		$(url).html('<img src="' + item.thumbnails.medium.url + '" alt="Thumbnail" />');
		$(carousel).append(url);
	});
	
	if(playlistItems.length >= 2) {
		$(carousel).append("<a href='https://www.youtube.com/playlist?list=" + playlist + "' target='_blank'>View all Episodes</a>");
	}
}