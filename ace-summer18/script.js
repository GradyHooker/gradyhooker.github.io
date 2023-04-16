function getWeekString() {
	var d = dateObj;
	var c;
	
	for(var i = 0; i < 7; i++) {
		d.setDate(d.getDate() - 1);
		if(d.getDay() == 4) {
			break;
		}
	}
	
	var weekCount = 1;
	
	var c = new Date(d);
	while(true) {
		c.setDate(c.getDate() - 7);
		if(c.getYear() == d.getYear()) {
			weekCount++;
		} else {
			break
		}
	}
	
	return "&yr=" + (d.getYear() + 1900) + "&wk=" + weekCount;
}

function getWeekNumGames() {
	var d = dateObj;
	d.setHours(0,0,0,0);
	var c;
	
	for(var i = 0; i < 8; i++) {
		if(d.getDay() == 0) {
			break;
		}
		d.setDate(d.getDate() + 1);
	}
			
	return 32621 + Math.ceil(Math.abs((new Date('23 April 1989')).getTime() - d.getTime()) / (1000 * 3600 * 24));
}

var date;
var dateObj;
var musicXhr;
var movieXhr;
var bookXhr;
var gamesXhr;
var tvshowXhr;
var wweXhrs;

$(function(){
    $("#date").dateDropdowns({
		"daySuffixes": false,
		"minYear": 1895
	});   
	
	$("#date").change(checkDate);
	
	$(".thing-img").each(function( index ) {
		if($(this).height() > $(this).width()) {
			$(this).height('100%');
			$(this).width('auto');
		}
	});
});

function checkDate() {
	date = $("#date").val();
	if(date == "") return;
	dateObj = new Date(date);
		
	$("#music .display-conts").empty();
	if (musicXhr) {
        musicXhr.abort();
    }
	if((dateObj.getYear() + 1900) >= 1959) {
		$("#music h2").text("Weekly Data from Billboard (Hot 100 - United States)");
		//$("#music h2").text("Weekly Data from Billboard (Hot 100 - United States) via HitsOfAllDecades");
		musicScrape();
	} else {
		$("#music .display-conts").append("<div class='error'>No Data available before 1959</div>");
	}
	
	$("#wwe-champs .display-conts").empty();
	if (wweXhrs) {
        wweXhrs.forEach(function(item) {
			item.abort();
		});
    }
	if((dateObj.getYear() + 1900) >= 1964) {
		$("#wwe-champs h2").text("Daily Data from WWE.com (Championship History)");
		wrestlingScrape(['wwe-championship', 'universal-championship', 'worldheavyweight', 'wcwchampionship', 'ecwchampionship', 'unitedstates', 'intercontinental', 'raw-womens-championship', 'smackdown-womens-championship', 'divas', 'women', 'raw-tag-team-championships', 'smackdown-tag-team-championships', 'worldtagteam', 'wwe-cruiserweight-championship', 'cruiser'], ['championship/Belt/WWE_World_Heavyweight_Championship.png', 'all/2016/08/WWE_Universal_Championship--1a4dc369c94f8c5e349be3674485a164.png', 'championship/Belt_Retired/WWE_Heavyweight.png', 'championship/Belt_Retired/WCW_Heavyweight.png', 'championship/Belt_Retired/ECW_World_Heavyweight_Championship.png', 'championship/Belt/WWE_US_Championship.png', 'championship/Belt/WWE_Intercontinental_Championship.png', '2016/04/WWE_Womens_Championship--9cea0ceb105b1a2fe5231026e7301f34.png', 'all/2016/09/Smackdown_Womens_Championship--37e06fe28c6a5890e263656e79109fb7.png', 'championship/Belt/Divas_Championship.png', 'championship/Belt_Retired/Womens_Champion.png', 'all/2016/12/Raw_Tag_Team--2d3db11e622f1dd21f2fd74c48563d87.png', 'all/2016/09/Smackdown_Tag_Team_Championship--56b4c22440c69722801b765c851ef01f.png', 'championship/Belt_Retired/WWE_World_Tag_Team_Championship.png', 'all/2017/06/CWC_Championship--d4d8dc2bc7a2b8dbf7a236d84c030abc.png', 'championship/Belt_Retired/WWE_Cruiserweight_Championship.png']);
	} else {
		$("#wwe-champs .display-conts").append("<div class='error'>No Data available before 1964</div>");
	}
	
	$("#movie .display-conts").empty();
	if (movieXhr) {
        movieXhr.abort();
    }
	if((dateObj.getYear() + 1900) >= 1983) {
		$("#movie h2").text("Weekly Data from Box Office Mojo (Highest Grossing - Worldwide)");
		movieScrape();
	} else if((dateObj.getYear() + 1900) >= 1914) {
		$("#movie h2").text("Yearly Data from Wikipedia (Highest Grossing - United States)");
		movieScrape2();
	} else {
		$("#movie .display-conts").append("<div class='error'>No Data available before 1914</div>");
	}
	
	$("#book .display-conts").empty();
	if (bookXhr) {
        bookXhr.abort();
    }
	if((dateObj.getYear() + 1900) >= 1895 && (dateObj.getYear() + 1900) <= 2016) {
		$("#book h2").text("Yearly Data from Publishers Weekly (Best Selling Novels - United States) via Wikipedia");
		bookScrape();
	} else {
		$("#book .display-conts").append("<div class='error'>No Data available before 1895 or after 2016</div>");
	}
	
	$("#games .display-conts").empty();
	if (gamesXhr) {
        gamesXhr.abort();
    }
	if((dateObj.getYear() + 1900) >= 2005 && (dateObj.getYear() + 1900) <= 2017) {
		$("#games h2").text("Weekly Data from VGChartz (Top Selling Retail - Global)");
		gamesScrape('Global');
	} else if((dateObj.getYear() + 1900) >= 1990 && (dateObj.getYear() + 1900) <= 2017) {
		$("#games h2").text("Weekly Data from VGChartz (Top Selling Retail - Japan)");
		gamesScrape('Japan');
	} else {
		$("#games .display-conts").append("<div class='error'>No Data available before 1990 or after 2017</div>");
	}
	
	$("#tvshows .display-conts").empty();
	if (tvshowXhr) {
        tvshowXhr.abort();
    }
	if((dateObj.getYear() + 1900) >= 1951 && (dateObj.getYear() + 1900) <= 2016) {
		$("#tvshows h2").text("Yearly Data from Nielsen Media Research (Top-rated television programs - United States) via Wikipedia");
		tvshowScrape();
	} else {
		$("#tvshows .display-conts").append("<div class='error'>No Data available before 1651 or after 2016</div>");
	}
}

function musicScrape() {
	musicXhr = $.getJSON("https://www.billboard.com/charts/hot-100/" + date, function(data){
		var rows = $(data.contents).find('article.chart-row');
		var firstObj = {};
		firstObj.song = $(rows[0]).find('.chart-row__song').text();
		firstObj.artist = $(rows[0]).find('.chart-row__artist').text();
		firstObj.image = $(rows[0]).find('.chart-row__image').css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
			
		$("#music .display-conts").empty();
		$("#music .display-conts").append('<div class="big-display"><div class="img-cont"><img class="thing-img" src="' + firstObj.image + '"/></div><div class="extra-details">' + firstObj.song + '<br/><i>' + firstObj.artist + '</i></div>');
		$("#music .display-conts").append('<div class="little-display"><table><tr class="first-row"><td>#1</td><td>' + firstObj.song + '<br/><i>' + firstObj.artist + '</i></td></tr></table></div>');
		for(var i = 1; i < 6; i++) {
			var obj = {};
			obj.song = $(rows[i]).find('.chart-row__song').text();
			obj.artist = $(rows[i]).find('.chart-row__artist').text();
			$("#music .display-conts .little-display table").append('<tr><td>#' + (i+1) + '</td><td>' + obj.song + '<br/><i>' + obj.artist + '</i></td></tr>');
		}
	});
}

function movieScrape() {
	movieXhr = $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent("http://www.boxofficemojo.com/weekly/chart/?view=weekly" + getWeekString() + "&p=.htm") + '&callback=?', function(data){
		var rows = $(data.contents).find('#body center center table tr table tr');

		var cell = $(rows[1]).find('td')[2];
		var cellGross = $(rows[1]).find('td')[4];
		var title = $(cell).find('font a b')[0];
		var gross = $(cellGross).find('font')[0];
			
		$("#movie .display-conts").empty();
		$("#movie .display-conts").append('<div class="big-display"><div class="img-cont"><img class="thing-img" src=""/></div><div class="extra-details">' + $(title).text() + '<br/><i>' + $(gross).text() + '</i></div>');
		$("#movie .display-conts").append('<div class="little-display"><table><tr class="first-row"><td>#1</td><td>' + $(title).text() + '<br/><i>' + $(gross).text() + '</i></td></tr></table></div>');
		
		var link = $(cell).find('font a')[0];
		link = link.href.split("&id=")[1];
		$.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent("http://www.boxofficemojo.com/movies/?page=weekly&id=" + link) + '&callback=?', function(data){
			var img = $(data.contents).find('#body table tr td table tr td a img')[0];
			$("#movie .display-conts .big-display img")[0].src = img.src;
		});
		
		for(var i = 2; i < 7; i++) {
			cell = $(rows[i]).find('td')[2];
			cellGross = $(rows[i]).find('td')[4];
			title = $(cell).find('font a b')[0];
			gross = $(cellGross).find('font')[0];
			$("#movie .display-conts .little-display table").append('<tr><td>#' + i + '</td><td>' + $(title).text() + '<br/><i>' + $(gross).text() + '</i></td></tr>');
		}
	});
}

function movieScrape2() {
	$.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=" + (dateObj.getYear() + 1900) + "_in_film&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
			var headers = $(data.parse.text["*"]).find('h2');
			var goodHeader;
			$(headers).each(function( index ) {
				var headerText = $(headers[index]).text().toLowerCase();
				if(headerText.includes("-grossing films")) {
					goodHeader = headers[index];
					return false;
				}
			});
			var table = $(goodHeader).next("table")[0];
			var tempTable = $(goodHeader).next();
			while(table == undefined) {
				table = $(tempTable).next("table")[0];
				tempTable = $(tempTable).next();
			}
			var rows = $(table).find("tr");
			
			var cell = $(rows[1]).find('td,th')[1];
			var cellGross = $(rows[1]).find('td,th')[3];
			if(cellGross == undefined) cellGross = $(rows[1]).find('td,th')[2];
			var title = $(cell).find('i a')[0];
			var gross = $(cellGross).text().replace(/ *\[[^\]]*]/g, '');
			
			for(var i = 1; i < 7; i++) {
				if(i == 1) {
					$("#movie .display-conts").empty();
					$("#movie .display-conts").append('<div class="big-display"><div class="img-cont"><img class="thing-img" src=""/></div><div class="extra-details">' + $(title).text() + '<br/><i>' + gross + '</i></div>');
					$("#movie .display-conts").append('<div class="little-display"><table><tr class="first-row"><td>#1</td><td>' + $(title).text() + '<br/><i>' + gross + '</i></td></tr></table></div>');
					
					var link = $(cell).find('a')[0];
					link = link.href.split("/wiki/")[1];
					$.ajax({
						type: "GET",
						url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=" + link + "&callback=?",
						contentType: "application/json; charset=utf-8",
						async: false,
						dataType: "json",
						success: function (data, textStatus, jqXHR) {
							var image = $(data.parse.text["*"]).find('table.infobox td a.image img')[0];
							$("#movie .display-conts .big-display img")[0].src = "https://" + image.src.split("//")[1];
						}
					});
				} else {
					cell = $(rows[i]).find('td,th')[1];
					cellGross = $(rows[i]).find('td,th')[3];
					if(cellGross == undefined) cellGross = $(rows[i]).find('td,th')[2];
					title = $(cell).find('i a')[0];
					gross = $(cellGross).text().replace(/ *\[[^\]]*]/g, '');
					$("#movie .display-conts .little-display table").append('<tr><td>#' + i + '</td><td>' + $(title).text() + '<br/><i>' + gross + '</i></td></tr>');
				}
			}
        }
    });
}

function bookScrape() {
	$.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Publishers_Weekly_list_of_bestselling_novels_in_the_United_States_in_the_" + (Math.floor((dateObj.getYear() + 1900) / 10) * 10) + "s&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
			var headers = $(data.parse.text["*"]).find('h2');
			var goodHeader;
			$(headers).each(function( index ) {
				var headerText = $(headers[index]).text().toLowerCase();
				if(headerText.includes((dateObj.getYear() + 1900))) {
					goodHeader = headers[index];
					return false;
				}
			});
			var list = $(goodHeader).next("ol")[0];
			var items = $(list).find("li");
			var title = $(items[1]).find('i')[0];
			var author = $(items[1]).text().split(" by ")[1];
			
			for(var i = 1; i < 7; i++) {
				if(i == 1) {
					$("#book .display-conts").empty();
					$("#book .display-conts").append('<div class="big-display"><div class="img-cont"><img class="thing-img" src=""/></div><div class="extra-details">' + $(title).text() + '<br/><i>' + author + '</i></div>');
					$("#book .display-conts").append('<div class="little-display"><table><tr class="first-row"><td>#1</td><td>' + $(title).text() + '<br/><i>' + author + '</i></td></tr></table></div>');
					
					var link = $(items[1]).find('a')[0];
					link = link.href.split("/wiki/")[1];
					$.ajax({
						type: "GET",
						url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=" + link + "&callback=?",
						contentType: "application/json; charset=utf-8",
						async: false,
						dataType: "json",
						success: function (data, textStatus, jqXHR) {
							var image = $(data.parse.text["*"]).find('table.infobox td a.image img')[0];
							$("#book .display-conts .big-display img")[0].src = "https://" + image.src.split("//")[1];
						}
					});
				} else {
					title = $(items[i]).find('i')[0];
					author = $(items[i]).text().split(" by ")[1];
					$("#book .display-conts .little-display table").append('<tr><td>#' + i + '</td><td>' + $(title).text() + '<br/><i>' + author + '</i></td></tr>');
				}
			}
        }
    });
}

function gamesScrape(country) {
	gamesXhr = $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent("http://www.vgchartz.com/weekly/" + getWeekNumGames() + "/" + country + "/") + '&callback=?', function(data){
		var rows = $(data.contents).find('table.chart > tbody > tr');
		var cell, imageCell, textCell, title, desc;

		for(var i = 1; i < 7; i++) {
			cell = $(rows[i]).find('td')[1];
			imageCell = $(cell).find("table tr td")[0];
			textCell = $(cell).find("table tr td")[1];
			title = $(textCell).html().split("<br>")[0].replace(/(<([^>]+)>)/ig, "");
			desc = $(textCell).html().split("<br>")[1].replace(/(<([^>]+)>)/ig, "");
			
			if(i == 1) {
				$("#games .display-conts").empty();
				$("#games .display-conts").append('<div class="big-display"><div class="img-cont"><img class="thing-img" src=""/></div><div class="extra-details">' + title + '<br/><i>' + desc + '</i></div>');
				$("#games .display-conts").append('<div class="little-display"><table><tr class="first-row"><td>#1</td><td>' + title + '<br/><i>' + desc + '</i></td></tr></table></div>');
				
				var img = $(imageCell).find("img")[0];
				$("#games .display-conts .big-display img")[0].src = img.src;
			} else {			
				$("#games .display-conts .little-display table").append('<tr><td>#' + i + '</td><td>' + title + '<br/><i>' + desc + '</i></td></tr>');
			}
		}
	});
}

function tvshowScrape() {
	$.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Top-rated_United_States_television_programs_by_season&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
			var headers = $(data.parse.text["*"]).find('div > table > tbody > tr > td > p > b > a');
			var goodHeader;
			$(headers).each(function( index ) {
				var headerText = $(headers[index]).text().toLowerCase();
				if(dateWithinRange(headerText)) {
					goodHeader = headers[index];
					return false;
				}
			});
			
			var table = $(goodHeader).parent().parent().next("table")[0];
			var rows = $(table).find("tbody tr");
			
			var title, tempRow, network, networkCell, lastnetwork;
			var tierank = 0;
			var tienetwork = 0;
			
			for(var i = 1; i < 7; i++) {
				if(tienetwork == 0) {
					if(tierank == 0) {
						networkCell = $(rows[i]).find("td")[2];
					} else {
						networkCell = $(rows[i]).find("td")[1];
					}
					network = $(networkCell).text();
				} else {
					network = lastnetwork;
					tienetwork--;
				}
				
				if(tierank == 0) {
					title = $(rows[i]).find("td")[1];
					if($(rows[i]).find("td")[0].rowSpan >= 2) tierank = $(rows[i]).find("td")[0].rowSpan - 1;
					if($(rows[i]).find("td")[2].rowSpan >= 2) {
						networkCell = $(rows[i]).find("td")[2]
						tienetwork = networkCell.rowSpan - 1;
						lastnetwork = $(networkCell).text();
					}
				} else {
					title = $(rows[i]).find("td")[0];
					tierank--;
					if($(rows[i]).find("td")[1].rowSpan >= 2) {
						networkCell = $(rows[i]).find("td")[1]
						tienetwork = networkCell.rowSpan - 1;
						lastnetwork = $(networkCell).text();
					}
				}

				if(i == 1) {
					$("#tvshows .display-conts").empty();
					$("#tvshows .display-conts").append('<div class="big-display"><div class="img-cont"><img class="thing-img" src=""/></div><div class="extra-details">' + $(title).text() + '<br/><i>' + network + '</i></div>');
					$("#tvshows .display-conts").append('<div class="little-display"><table><tr class="first-row"><td>#1</td><td>' + $(title).text() + '<br/><i>' + network + '</i></td></tr></table></div>');
					
					var link = $(title).find("a")[0];
					var link = link.href.split("/wiki/")[1];
					$.ajax({
						type: "GET",
						url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=" + link + "&callback=?",
						contentType: "application/json; charset=utf-8",
						async: false,
						dataType: "json",
						success: function (data, textStatus, jqXHR) {
							var image = $(data.parse.text["*"]).find('table.infobox td a.image img')[0];
							$("#tvshows .display-conts .big-display img")[0].src = "https://" + image.src.split("//")[1];
						}
					});
				} else {
					$("#tvshows .display-conts .little-display table").append('<tr><td>#' + i + '</td><td>' + $(title).text() + '<br/><i>' + network + '</i></td></tr>');
				}
			}
        }
    });
}

var months = [];
months['january'] = 0;
months['february'] = 1;
months['march'] = 2;
months['april'] = 3;
months['may'] = 4;
months['june'] = 5;
months['july'] = 6;
months['august'] = 7;
months['september'] = 8;
months['october'] = 9;
months['november'] = 10;
months['december'] = 11;

function dateWithinRange(date) {
	var left = date.split("–")[0];
	var leftMonth = left.split(" ")[0].toLowerCase();
	var leftYear = left.split(" ")[1];

	if((dateObj.getYear() + 1900) < parseInt(leftYear)) {
		return false;
	} else if((dateObj.getYear() + 1900) > (parseInt(leftYear) + 1)) {
		return false;
	}
	
	if((dateObj.getYear() + 1900) == parseInt(leftYear)) {
		if(dateObj.getMonth() < months[leftMonth]) {
			return false;
		}
	} else {
		if(dateObj.getMonth() >= months[leftMonth]) {
			return false;
		}
	}
	
	return true;
}

function wrestlingScrape(championships, beltimgs) {
	var dateStr = new Date(date).getTime()/1000;
	var promises = [];
	
	for (var i = 0; i < championships.length; i++) {
		promises.push($.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent("http://www.wwe.com/classics/titlehistory/" + championships[i]) + '&callback=?'));
	}
	wweXhrs = promises;
	$.when.apply($, promises).then(function(){
		var online = [];

		for(var i = 0; i < arguments.length; i++){
			var obj = {};
			var beltimg = beltimgs[i];
			$($(arguments[i][0].contents).find('.reign-row')).each(function( index ) {
				var row = $(this)[0];
				var reignDate = $(row).find('.reign-dates')[0];
				var reignDateMilli = $(reignDate).data('reign-start-date');
				var reignDateEndMilli = $(reignDate).data('reign-end-date');
				if(reignDateMilli < dateStr && (reignDateEndMilli > dateStr || reignDateEndMilli == null || reignDateEndMilli == "" || reignDateEndMilli == undefined)) {
					var reignChamp = $(row).find('.champ')[0];
					obj.champ = $(reignChamp).text();
					var reignDays = $(row).find('.time-held')[0];
					if($(reignDays).text() == "") obj.days = "Current"
					else obj.days = $(reignDays).text().split("†")[0];
					return false;
				}
			});
			
			obj.belt = $(arguments[i][0].contents).find('.championship-hero--title').text();
			
			if(i == 0) {
				if(obj.champ === undefined) {
					obj.champ = "Nobody";
					obj.days = "No Data Found";
				}
				$("#wwe-champs .display-conts").empty();
				$("#wwe-champs .display-conts").append('<div class="big-display"><div class="img-cont"><img class="thing-img" src=""/></div><div class="extra-details">' + obj.champ + '<br/>(' + obj.days + ')</div>');
				$("#wwe-champs .display-conts").append('<div class="little-display"><table><tr class="first-row"><td><img class="belt" src="http://www.wwe.com/f/styles/wwe_16_9_l/public/' + beltimg + '" alt="' + obj.belt + '" title="' + obj.belt + '"/></td><td>' + obj.champ + ' (' + obj.days + ')</td></tr></table></div>');
				wrestlingScrapeImage(obj.champ);
			} else {
				if(obj.champ === undefined) {
					continue;
				}
				$("#wwe-champs .display-conts .little-display table").append('<tr><td><img class="belt" src="http://www.wwe.com/f/styles/wwe_16_9_l/public/' + beltimg + '" alt="' + obj.belt + '" title="' + obj.belt + '"/></td><td>' + obj.champ + ' (' + obj.days + ')</td></tr>');
			}	
			
		}
		
	});
}

function wrestlingScrapeImage(name) {
	$.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent("http://prowrestling.wikia.com/wiki/Special:Search?search=" + name) + '&callback=?', function(data){
		var firstResult = $(data.contents).find('li.result article h1 a.result-link')[0];
		$.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(firstResult.href) + '&callback=?', function(data){
			var header = $(data.contents).find('.page-header__categories-links a')[0];
			if($(header).text() == "Disambiguation") {
				var firstDisambig = $(data.contents).find('#mw-content-text ul li a')[0];
				$.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent("http://prowrestling.wikia.com/wiki/" + firstDisambig.href.split("/")[firstDisambig.href.split("/").length-1]) + '&callback=?', function(data){
					var bigImage = $(data.contents).find('#mw-content-text figure  a.image-thumbnail img.pi-image-thumbnail')[0];
					$("#wwe-champs .display-conts .big-display img")[0].src = bigImage.src;
				});
			}
			else {
				var bigImage = $(data.contents).find('#mw-content-text figure  a.image-thumbnail img.pi-image-thumbnail')[0];
				$("#wwe-champs .display-conts .big-display img")[0].src = bigImage.src;
			}
		});
	});
}