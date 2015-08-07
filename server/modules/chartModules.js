var cheerio = Meteor.npmRequire("cheerio");
var requestSuper= Meteor.npmRequire('superagent');
var Browser = Meteor.npmRequire("zombie");

var animeTitle = null;

Meteor.startup(function(){
	var url = "https://www.livechart.me/summer-2015/tv";
	var user_agent = 'Firefox/5.0';
	var browser = new Browser({userAgent: user_agent, debug: true, waitFor: 10000});

	browser.visit(url, function() {
		result = browser.html();
		// console.log(result);
		$ = cheerio.load(result);
		//Find class that has anime title in result source code, map each entry to apply function
		// animeTitle = $('.anime-card').find(".main-title").map(function(i, el) {
		// 	//Get the episode countdown for each individual anime chart entry
		// 	var airDate = $(this).siblings().find(".poster-wrap > .episode-countdown").html();
		// 	//Get the paired anime image
		// 	var animeImage = $(this).siblings().find("img").attr("src");
		// 	var animeImageHtml = "<img src='" + animeImage + "'>";
		// 	//Format the results into an HTML list style with each entry as a separate li
		// 	if (airDate === null) {
		// 		return "<li>" + $(this).text()+ "</li><br />" + animeImageHtml;
		// 	} else {
		// 		return "<li>" + $(this).text()+ "<br /> "
		// 		+ airDate + "</li><br />" + animeImageHtml;
		// 	}
		// }).get().join(' ');
		animeTitle = $("title").text();
		// console.log(animeTitle);
		return animeTitle;
	});
});

Meteor.methods({
	//Scrape anime chart data from external websites
	getChartData: function () {
		return animeTitle;
	}
});
