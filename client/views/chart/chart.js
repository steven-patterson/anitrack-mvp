Template.chart.helpers({
	"chartData": function() {
		return Session.get("animes");
	}
});

Meteor.call("getChartData", function(error, result) {
	Session.set("animes", result);
});
