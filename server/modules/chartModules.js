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
						console.log(animeImage);
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
