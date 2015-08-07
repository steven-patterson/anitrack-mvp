var cheerio = Meteor.npmRequire("cheerio");
var request= Meteor.npmRequire('superagent');

var animeTitles = null;
var animeImages = null;
var cardsObj = {};
var animeHtml = "";

Meteor.startup(function(){
	var url = "http://www.anime-planet.com/anime/seasons/summer-2015";
	var user_agent = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14';

	request
		.get(url)
		.set('User-Agent', user_agent)
		.end(function(err, res){
			$ = cheerio.load(res.text);
			animeTitles = $('.card').find("h4").map(function(i, el) {
				var animeImage = $(this).siblings().find("div.crop.portrait img").attr("data-src");
				cardsObj[$(this).text()] = animeImage;
				return $(this).text();
			}).get().join(", ");
			animeImages = $(".card").find("div.crop.portrait img").map(function(i, el) {
				return $(this).attr("data-src");
			}).get().join(", ");
		});
});

Meteor.methods({
	//Scrape anime chart data from external websites
	getChartData: function () {
		var animeArr = animeTitles.split(",");
		var imageArr = animeImages.split(",");
		for (var key in cardsObj) {
			animeHtml += "<li>" + key + "<br />"
			+ "<img src='http://www.anime-planet.com" + cardsObj[key] + "'></li>";
		}
		return animeHtml;
	}
});
