var cheerio = Meteor.npmRequire("cheerio");
var animeArray = [];

function Anime (animeName, airTime, detailsLink) {
	this.animeName = animeName;
	this.airTime = airTime;
	this.detailsLink = detailsLink;
	this.animePicture = "http://www.anime-planet.com/" + imageFetch(detailsLink);
}

var imageFetch = function(imageSource) {
	try {
		var request = HTTP.call("GET", imageSource,
			{
				headers: {"User-Agent": "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14"}
			});
		$ = cheerio.load(request.content);
		var animePicture = $("img.screenshots").attr("src");
		return animePicture;
	} catch(error) {
		console.log(error);
		return "inc/img/blank_main.jpg";
	}
}

Meteor.startup(function() {
	//Send request for data from anime schedule source
	var url = "https://www.livechart.me/schedule/tv";
	var user_agent = {"User-Agent": "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14"};
	var request = HTTP.call("GET", url, user_agent);

	//Load received data
	$ = cheerio.load(request.content);
	//Traverse and scrape the necessary data
	var animeCards = $('div.anime-card').find("h3").map(function(i, el) {
		var animeName = $(this).text();
		var airTime = $(this).siblings().find("div.poster-wrap div.episode-countdown").text();
		var detailsLink = $(this).siblings().find("ul.related-links li a.anime-planet-icon").attr("href");
		//Store in an object and push to array
		var animeEntry = new Anime(animeName, airTime, detailsLink);
		animeArray.push(animeEntry);
	});
});

Meteor.methods({
	getChartData: function () {
		return animeArray;
	}
});
