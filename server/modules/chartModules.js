var cheerio = Meteor.npmRequire("cheerio");

Meteor.methods({
    //Scrape anime chart data from external websites
    getChartData: function () {
        //Store HTTP get into a result var for passing to cheerio
        var result = Meteor.http.get("https://www.livechart.me/summer-2015/tv");
        $ = cheerio.load(result.content);
        //Find class that has anime title in result source code, map each entry to apply function
        var animeTitle = $('.anime-card').find(".main-title").map(function(i, el) {
            //Get the episode countdown for each individual anime chart entry
        	var animeDate = $(this).siblings().find(".poster-wrap > .episode-countdown").html();
            //Format the results into an HTML list style with each entry as a separate li
        	if (animeDate === null) {
        		return "<li>" + $(this).text()+ "</li><br />";
        	} else {
        		return "<li>" + $(this).text()+ "<br /> "
        		+ animeDate + "</li><br />";
        	}
        }).get().join(' '); //Join all li together
        //Return all the li for rendering in HTML
        return animeTitle;
    }
});
