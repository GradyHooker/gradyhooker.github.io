var playlistReturn;

function getPlaylistData(box) {
	var playlistID = box.playlist;
	var apiKey = 'AIzaSyALXD-EdemM7ParCmr0T7NFyTDT386LIDE';
	var theUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet' +
		'&maxResults='+ 2 +
		'&playlistId=' + playlistID +
		'&key=' + apiKey;
		
	var playlistReturn = [];
	$.ajax({
		url: theUrl,
		success: function(response){
			console.log(response);
			playlistReturn.push(...response['items']);
			constructPodcastBoxCallback(box, playlistReturn, response.pageInfo.totalResults);
		}
	});
	
	return;
}
