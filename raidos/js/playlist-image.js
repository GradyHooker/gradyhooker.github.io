$(function() {
	var playlist;
	var playlist_url;
	$('.playlist-item').each(function(i) {
		playlist = $('.playlist-item')[i];
		playlist_url = $(playlist).data('url');
		getPlaylistData(playlist_url, playlist, 1);
	});
});

//Makes a single request to Youtube Data API
function getPlaylistData(playlistID, playlist_element, max) {
	var apiKey = 'AIzaSyArQNfmJDkjxP_ZyZIocbyuDeyTanf4Rl8';
	var theUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet' +
		'&maxResults='+ max + //Can be anything from 1-50
		'&playlistId=' + playlistID +
		'&key=' + apiKey;
		
	//If there is page token, start there
	$.ajax({
		url: theUrl,
		success: function(response){
			video_list = [];
			video_list.push.apply(video_list,response.items);
			$(playlist_element).find("img")[0].src = video_list[0].snippet.thumbnails.medium.url;
		}
	});
}