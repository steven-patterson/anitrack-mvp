var cheerio = Meteor.npmRequire("cheerio");
var request= Meteor.npmRequire('superagent');
var Browser = Meteor.npmRequire("zombie");

var cardsObj = {};
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
});

Meteor.methods({
	//Scrape anime chart data from external websites
	getChartData: function () {
		for (var key in cardsObj) {
			animeHtml += "<li>" + key + "<br />"
			+ "<img src='http://www.anime-planet.com" + cardsObj[key] + "'></li>";
		}
		searchAnime("Railgun");
		return animeHtml;
	}
});

function searchAnime(animeName) {
	var url = "https://hummingbird.me/anime";
	var user_agent = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14';
	var browser = new Browser({userAgent: user_agent, debug: true, waitFor: 10000});

	browser.visit(url, function() {
		var result = browser.html();
		console.log(animeName);
		console.log(result);
	});
}
