var cheerio = Meteor.npmRequire("cheerio");
var user_agent = {"User-Agent": "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14"};
var animeArray = [];

function Anime (animeName, airTime, detailsLink) {
	this.animeName = animeName;
	this.airTime = airTime;
	this.detailsLink = detailsLink;
	// this.animePicture = imageFetch(detailsLink);
}

Meteor.startup(function() {
	//Send request for data from anime schedule source
	var url = "https://www.livechart.me/schedule/tv";
	var request = HTTP.call("GET", url, user_agent);
	//Load received data
	$ = cheerio.load(request.content);
	//Traverse and scrape the necessary data
	var animeCards = $('div.anime-card').find("h3").map(function(i, el) {
		var animeName = $(this).text();
		var airTime = $(this).siblings().find("div.poster-wrap div.episode-countdown").text();
		var detailsLink = $(this).siblings().find("ul.related-links li a.mal-icon").attr("href");
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

// var imageFetch = function(imageSource) {
// 	try {
// 		var request = HTTP.call("GET", imageSource, user_agent);
// 		$ = cheerio.load(request.content);
// 		var animePicture = $("img.screenshots").attr("src");
// 		if (request.statusCode === 200 && animePicture !== undefined) {
// 			return "http://www.anime-planet.com/" + animePicture;
// 		} else {
// 			console.log(request.statusCode);
// 			return "http://placehold.it/162x230";
// 		}
// 	} catch(error) {
// 		console.log(error);
// 		return "http://placehold.it/230x162";
// 	}
// }
