var cheerio = Meteor.npmRequire("cheerio");

var animeArray = [];
var animeHtml = "";

function Anime (animeName, airTime) {
	this.animeName = animeName;
	this.airTime = airTime;
}

Meteor.startup(function() {
	var url = "https://www.livechart.me/schedule/tv";
	var user_agent = {"User-Agent": "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14"};
	var request = HTTP.call("GET", url, user_agent);
	$ = cheerio.load(request.content);
	var animeCards = $('div.anime-card').find("h3").map(function(i, el) {
		var animeName = $(this).text();
		var airTime = $(this).siblings().find("div.poster-wrap div.episode-countdown").text();
		var animeEntry = new Anime(animeName, airTime);
		animeArray.push(animeEntry);
	});
});

Meteor.methods({
	getChartData: function () {
		for (var i = 0; i < animeArray.length; i++) {
			console.log("\nThe anime name is " + animeArray[i].animeName);
			console.log("The airing time is " + animeArray[i].airTime);
		}
		return animeHtml;
	}
});
