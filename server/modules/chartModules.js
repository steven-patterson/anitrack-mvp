var cheerio = Meteor.npmRequire("cheerio");

Meteor.methods({
    getTime: function () {
        result = Meteor.http.get("http://anichart.net/airing");
        $ = cheerio.load(result.content);
        CurrentTime = $('a').text();
        return CurrentTime;
    }
});
