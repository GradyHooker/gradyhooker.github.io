$( document ).ready(function() {
	//DESKTOP ITEMS
	$('.desktop-item-csgo').click(function() {
		openspeech("I shouldn't do that right now - but he does love playing video games");
		$('.traits-gaming').addClass('discovered');
		$('.traits-gaming').text("Video Games");
		$('.traits-gaming').addClass('discovered');
		$('.action-videogame').addClass('ready');
	});
	$('.desktop-item-passwords').click(function() {
		open('passwords');
		openspeech('Who the hell leaves their passwords like this');
	});
	$('.passwords .close').click(function() { close('passwords'); });
	$('.desktop-item-youtube').click(function() {
		open('youtube');
		openspeech('This guy really loves to vlog');
		$('.traits-tuber').addClass('discovered');
		$('.traits-tuber').text("Vlogs on YouTube");
		$('.action-tuber').addClass('ready');
	});
	$('.youtube .close').click(function() { close('youtube'); });
	$('.desktop-item-email').click(function() {
		open('email');
		openspeech('Hates ants and love movies...got it!');
		$('.traits-shrunk').addClass('discovered');
		$('.traits-shrunk').text("Hates Ants");
		$('.action-backyard').addClass('ready');
		$('.traits-movies').addClass('discovered');
		$('.traits-movies').text("Watches Movies");
		$('.action-mall').addClass('ready');
	});
	$('.email .close').click(function() { close('email'); });
	$('.desktop-item-medical').click(function() { open('medical'); });
	$('.medical .close').click(function() { close('medical'); });
	$('.desktop-item-documents').click(function() {
		open('documents');
		openspeech('There is a lot of Pokemon GO stuff in here');
		$('.traits-forest').addClass('discovered');
		$('.traits-forest').text("Pokemon GO");
		$('.action-forest').addClass('ready');
	});
	$('.documents .close').click(function() { close('documents'); });
	$('.desktop-item-pictures').click(function() {
		open('pictures');
		openspeech('He sure seems to like pictures of himself at the beach');
		$('.traits-beach').addClass('discovered');
		$('.traits-beach').text("Going To Beach");
		$('.action-beach').addClass('ready');
	});
	$('.pictures .close').click(function() { close('pictures'); });
	$('.desktop-item-videos').click(function() {
		open('videos');
		openspeech('Both the FRIENDS and HOUSE folders are empty...');
		$('.traits-homeless').addClass('discovered');
		$('.traits-homeless').text("No Home / Friends");
		$('.action-shed').addClass('ready');
	});
	$('.videos .close').click(function() { close('videos'); });
	
	//ACTIONS
	$('.action-pc').click(function() { panelGoTo('computer'); });
	$('.action-start').click(function() { panelGoTo('computer'); $('.action-start').removeClass('ready'); $('.action-pc').addClass('ready'); });
	$('.action-mall').click(function() { panelGoTo('mall'); });
	$('.action-videogame').click(function() { panelGoTo('videogame'); });
	$('.action-beach').click(function() {
		if($('.dead').length >= 6) {
			panelGoTo('beach');
		} else {
			openspeech("I should go here last since it is far away");
		}
	});
	$('.action-shed').click(function() { panelGoTo('shed'); });
	$('.action-forest').click(function() { panelGoTo('forest'); });
	$('.action-tuber').click(function() { panelGoTo('tuber'); });
	$('.action-backyard').click(function() { panelGoTo('backyard'); });
	$('.action-bedroom').click(function() { 
		if($('.dead').length >= 7) {
			panelGoTo('bedroom');
		} else {
			openspeech("I shouldn't annoy him right now, I've got to kill these clones");
		}
	});
	$('.action-conclusion').click(function() { panelGoTo('conclusion'); });
	
	//VIDEO ENDS
	$('.start-video').on('ended', function(){ $('.action-start').addClass('ready'); });
	$('.videogame-video').on('ended', function(){ $('.traits-gaming').addClass('dead'); $('.action-videogame').removeClass('ready'); });
	$('.mall-video').on('ended', function(){ $('.traits-movies').addClass('dead'); $('.action-mall').removeClass('ready'); });
	$('.beach-video').on('ended', function(){ $('.traits-beach').addClass('dead'); $('.action-beach').removeClass('ready'); });
	$('.shed-video').on('ended', function(){ $('.traits-homeless').addClass('dead'); $('.action-shed').removeClass('ready'); });
	$('.forest-video').on('ended', function(){ $('.traits-forest').addClass('dead'); $('.action-forest').removeClass('ready'); });
	$('.tuber-video').on('ended', function(){ $('.traits-tuber').addClass('dead'); $('.action-tuber').removeClass('ready'); });
	$('.backyard-video').on('ended', function(){ $('.traits-shrunk').addClass('dead'); $('.action-backyard').removeClass('ready'); });
	$('.bedroom-video').on('ended', function(){ $('.traits-liar').addClass('dead'); $('.action-bedroom').removeClass('ready'); $('.action-pc').removeClass('ready'); $('.action-conclusion').addClass('ready'); });
	$('.conclusion-video').on('ended', function(){ $('.action-conclusion').removeClass('ready'); $('.traits-main').addClass('discovered'); $('.traits-main').text("Crazy Murderer"); });
});

var to;

function nono() {
	clearTimeout(to);
	clearTimeout(textto);
	$('.nono').removeClass('show');
	$('.speech-text').removeClass('show');
	$('.nono').addClass('show');
	to = setTimeout(yesyes, 2000);
}

function yesyes() {
	$('.nono').removeClass('show');
}

var textto;
function openspeech(text) {
	clearTimeout(textto);
	clearTimeout(to);
	$('.nono').removeClass('show');
	$('.speech-text').removeClass('show');
	$('.speech-text').text(text);
	$('.speech-text').addClass('show');
	textto = setTimeout(closespeech, 3000);
}

function closespeech() {
	$('.speech-text').removeClass('show');
}

function panelGoTo(panel) {
	$('.big-panel').hide();
	$('video').each(function() {
		$(this).get(0).load();
	});
	if(panel == "computer") {
		$('.main-desktop').show();
	} else {
		$('.panel-' + panel).show();
		$('.panel-' + panel + ' video').get(0).play();
	}
}

function open(classname) {
	$('.' + classname).show();
	$('.' + classname + "-icon").show().css('display', 'flex');
	$('.' + classname + "-icon").addClass('active');
}

function close(classname) {
	$('.' + classname).hide();
	$('.' + classname + "-icon").hide();
	$('.' + classname + "-icon").removeClass('active');
}

function checkpass() {
	var val = $("#pass-box").val();
	if(val == "hunter2") {
		$('.medical-password').hide();
		$('.medical-details').show();
		openspeech('So the only thing he has is this Mythomania thing...');
		$('.traits-liar').addClass('discovered');
		$('.traits-liar').text("Mytho... mania?");
		$('.action-bedroom').addClass('ready');
	} else {
		alert("NO - WRONG! - HACKER!");
	}
}