var cheerio = Meteor.npmRequire("cheerio");
var request= Meteor.npmRequire('superagent');

var animeTitle = null;

Meteor.startup(function(){
	var url = "http://www.anime-planet.com/anime/seasons/summer-2015";
	var user_agent = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14';

	request
		.get(url)
		.set('User-Agent', user_agent)
		.end(function(err, res){
			$ = cheerio.load(res.text);
			animeTitle = $('.card').find("h4").map(function(i, el) {
				var animeImage = $(this).siblings().find("div.crop.portrait img").attr("data-src");
				var animeImageHtml = "<img src='http://www.anime-planet.com" + animeImage + "'>";
				attachTime($(this).text());
				//Format the results into an HTML list style with each entry as a separate li
				return "<li>" + $(this).text()+ "</li><br />" + animeImageHtml;
			}).get().join(' '); //Join all li together
		});
});

Meteor.methods({
	//Scrape anime chart data from external websites
	getChartData: function () {
		return animeTitle;
	}
});

function attachTime(animeString) {
	request
		.get("https://www.livechart.me/schedule/tv")
		.set("User-Agent", 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14')
		.end(function(err, res) {
			$ = cheerio.load(res.text);
			var animeCard = $('.anime-card').map(function(i, el) {
				var airTime = $(this).find(".poster-wrap > .episode-countdown").html();
				var mainTitle = $(this).find(".main-title").html();
				if (animeString.substr(0, 5).indexOf(mainTitle.substr(0, 5)) !== -1) {
					console.log(mainTitle + " == " + animeString);
					console.log(airTime);
				}
			});
		});
}
