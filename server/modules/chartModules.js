var cheerio = Meteor.npmRequire("cheerio");

var animeArray = [];
var animeHtml = "";

function Anime (animeName, airTime) {
	this.animeName = animeName;
	this.airTime = airTime;
	// this.animeImage = animeImage;
	this.callAnime = function() {
		var request = HTTP.call("GET", "https://www.googleapis.com/customsearch/v1", {params: {
			"key": "AIzaSyCkvHVZvJYfkjQZ9N449OZmIOeG4OePqIU",
			"cx": "001143011821726750291:my2ypeogiem",
			"q": animeName
		}, headers: {"User-Agent": "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14"}});
		$ = cheerio.load(request.data);
		console.log(request.data);
		this.animePicture = null;
	}
}

var formatHtml = function (animeName, airTime, animePicture) {
	return "<li>" + animeName + "<br />" + airTime + "</li><br />" + animePicture + "<hr />";
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
		//Store in an object and push to array
		var animeEntry = new Anime(animeName, airTime);
		animeEntry.callAnime();
		animeArray.push(animeEntry);
	});

});

Meteor.methods({
	getChartData: function () {
		//Loop through all anime entries
		for (var i = 0; i < animeArray.length; i++) {
			var aTitle = animeArray[i].animeName;
			var aTime = animeArray[i].airTime;
			var aPicture = animeArray[i].animePicture;
			//Format entry as html and add to string
			animeHtml += formatHtml(aTitle, aTime, aPicture);
		}
		//Return full anime list html
		return animeHtml;
	}
});
