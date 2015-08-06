Template.chart.helpers({
	// Return animes chart data
	"chartData": function() {
		return Session.get("animes");
	}
});

//Call the getChartData module to fetch new anime chart data
Meteor.call("getChartData", function(error, result) {
	Session.set("animes", result);
});
