var cheerio = Meteor.npmRequire("cheerio");
var request= Meteor.npmRequire('superagent');
var Browser = Meteor.npmRequire("zombie");

var cardsObj = {};
var animeHtml = "";
var imagesHtml = "";

Meteor.startup(function(){
	var url = "https://www.livechart.me/schedule/tv";
	var user_agent = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14';

	//Issue request to anime data site
	request
		.get(url)
		.set('User-Agent', user_agent)
		.end(function(err, res){
			$ = cheerio.load(res.text);
			//Find all anime titles on page
			var animeTitles = $('div.anime-card').find("h3").map(function(i, el) {
				//Find the associated air time and set it
				var airTime = $(this).siblings().find("div.poster-wrap div.episode-countdown").text();
				cardsObj[$(this).text()] = airTime;
				//Search for anime image, if it exists, return it and set as img src
				request
					.get("http://www.anime-planet.com/anime/all")
					.set("User-Agent", user_agent)
					.query({name: $(this).text()})
					.end(function(err, res) {
						$ = cheerio.load(res.text);
						animeImage = $("div.crop.portrait img").attr("data-src");
						console.log(animeImage);
						imagesHtml += "<img src='http://www.anime-planet.com" + animeImage + "'><br>";
					});
				//Return the anime title string
				return $(this).text();
			}).get().join(", ");
		});
});

Meteor.methods({
	getChartData: function () {
		for (var key in cardsObj) {
			animeHtml += "<li>" + key + "<br>" + cardsObj[key] + "</li><hr>";
		}
		return animeHtml + imagesHtml;
	}
});

// function searchAnime(animeName) {
// 	var url = "http://www.anime-planet.com/anime/all";
// 	var user_agent = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14';
// 	var animeImage = "";

// 	request
// 		.get(url)
// 		.set("User-Agent", user_agent)
// 		.query({name: animeName})
// 		.end(function(err, res) {
// 			$ = cheerio.load(res.text);
// 			animeImage = $("div.crop.portrait img").attr("data-src");
// 			console.log(animeImage);
// 		});
// }
