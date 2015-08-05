var cheerio = Meteor.npmRequire("cheerio");

Meteor.methods({
    getChartData: function () {
        result = Meteor.http.get("https://www.livechart.me/summer-2015/tv");
        $ = cheerio.load(result.content);
        // CurrentTime = $('.main-title').text();
        animeTitle = $('.main-title').map(function(i, el) {
          // this === el
          return "<li>" + $(this).text() + "</li>";
        }).get().join(' ');
        return animeTitle;
    }
});
