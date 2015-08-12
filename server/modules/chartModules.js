var cheerio = Meteor.npmRequire("cheerio");
var animeArray = [];

function Anime (animeName, airTime) {
	this.animeName = animeName;
	this.airTime = airTime;
	this.animePicture = imageFetch(animeName);
}

var imageFetch = function(animeName) {
	var request = HTTP.call("GET", "http://www.bing.com/images/search", {params: {
		"q": animeName + " myanimelist",
		"qs": "n",
		"form": "QBIR",
		"pq": animeName + " myanimelist",
		"sc": "0-19",
		"sp": "-1",
		"sk": ""
	}, headers: {"User-Agent": "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14"}});
	$ = cheerio.load(request.content);
	var url = $("#canvas").find("a").attr("href");
	var imageUrl = $(".item a").attr("href");
	var imageString = String(imageUrl);
	var placeHolder = "http://placehold.it/225x321";
	try {
		var imageStatus = HTTP.call("GET", imageUrl);
		if (imageStatus.statusCode === 200) {
			if (imageUrl !== undefined) {
				if (imageString.indexOf("cdn.myanimelist.net/images/anime") !== -1) {
					var animePicture = imageString;
					return animePicture;
				} else {
					var animePicture = placeHolder;
					return animePicture;
				}
			} else {
				var animePicture = placeHolder;
				return animePicture;
			}
		}
	} catch(error) {
		console.log(error);
		var animePicture = placeHolder;
		return animePicture;
	}

	// if (url !== undefined && url.indexOf("myanimelist" !== -1)) {
	// 	var animePicture = $("#canvas").find("img").attr("src");
	// 	return animePicture;
	// } else {
	// 	var animePicture = null;
	// 	return animePicture;
	// }
}

var formatHtml = function (animeName, airTime, animePicture) {
	return "<li>" + animeName + "<br />" + airTime + "</li><br />" + "<img src='" + animePicture + "'>" + "<hr />";
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
		animeArray.push(animeEntry);
	});
});

Meteor.methods({
	getChartData: function () {
		return animeArray;
	}
});
