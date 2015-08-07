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
			animeTitle = $(".cardDeck h4").map(function(i, el) {
				return "<li>" + $(this).text()+ "</li><br />";
			}).get().join(' ');
		});
});

Meteor.methods({
	//Scrape anime chart data from external websites
	getChartData: function () {
		return animeTitle;
	}
});
