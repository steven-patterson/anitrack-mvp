var cheerio = Meteor.npmRequire("cheerio");
var request= Meteor.npmRequire('superagent');

var cardsObj = {};
var airTimeObj = {};
var animeHtml = "";


Meteor.startup(function(){
	var url = "http://www.anime-planet.com/anime/seasons/summer-2015";
	var user_agent = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14';

	//Issue request to anime data site
	request
		.get(url)
		.set('User-Agent', user_agent)
		.end(function(err, res){
			$ = cheerio.load(res.text);
			//Find all anime titles on page
			var animeTitles = $('.card').find("h4").map(function(i, el) {
				//Grab the associated image and pair it to title
				var animeImage = $(this).siblings().find("div.crop.portrait img").attr("data-src");
				//Set the title as a key and image as a value
				cardsObj[$(this).text()] = animeImage;
				return $(this).text();
			}).get().join(", ");
		});

	request
		.get("http://animecalendar.net/")
		.set("User-Agent", user_agent)
		.end(function(err, res) {
			$ = cheerio.load(res.text);
			var airTimes = $("div.ep_box h3").map(function(i, el) {
				var animeTime = $(this).next().text().trim();
				airTimeObj[$(this).text()] = animeTime;
			});
		});
});

Meteor.methods({
	//Scrape anime chart data from external websites
	getChartData: function () {
		for (var key in cardsObj) {
			animeHtml += "<li>" + key + "<br />"
			+ "<img src='http://www.anime-planet.com" + cardsObj[key] + "'></li>";
		}

		return animeHtml;
	}
});
