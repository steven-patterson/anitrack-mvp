var cheerio = Meteor.npmRequire("cheerio");

Meteor.methods({
    getChartData: function () {
        var result = Meteor.http.get("https://www.livechart.me/summer-2015/tv");
        $ = cheerio.load(result.content);

        var animeTitle = $('.anime-card').find(".main-title").map(function(i, el) {
        	var animeDate = $(this).siblings().find(".poster-wrap > .episode-countdown").html();
        	if (animeDate === null) {
        		return "<li>" + $(this).text()+ "</li><br />";
        	} else {
        		return "<li>" + $(this).text()+ "<br /> "
        		+ animeDate + "</li><br />";
        	}
        }).get().join(' ');

        return animeTitle;
    }
});
