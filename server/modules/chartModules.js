var cheerio = Meteor.npmRequire("cheerio");

Meteor.methods({
	//Scrape anime chart data from external websites
	getChartData: function () {
		//Store HTTP get into a result var for passing to cheerio
		var requestWithAgent= request.defaults({
		    headers: { "User-Agent": "Mozilla/5.0 (X11; U; Linux i686) Gecko/20071127 Firefox/2.0.0.11" }
		});
		var result = requestWithAgent.getSync("https://www.livechart.me/summer-2015/tv");
		var resultBody = result.body;
		$ = cheerio.load(resultBody);
		//Find class that has anime title in result source code, map each entry to apply function
		var animeTitle = $('.anime-card').find(".main-title").map(function(i, el) {
			//Get the episode countdown for each individual anime chart entry
			var airDate = $(this).siblings().find(".poster-wrap > .episode-countdown").html();
			//Get the paired anime image
			var animeImage = $(this).siblings().find("img").attr("src");
			var animeImageHtml = "<img src='" + animeImage + "'>";
			//Format the results into an HTML list style with each entry as a separate li
			if (airDate === null) {
				return "<li>" + $(this).text()+ "</li><br />" + animeImageHtml;
			} else {
				return "<li>" + $(this).text()+ "<br /> "
				+ airDate + "</li><br />" + animeImageHtml;
			}
		}).get().join(' '); //Join all li together
		//Return all the li for rendering in HTML
		return animeTitle;
	}
});
