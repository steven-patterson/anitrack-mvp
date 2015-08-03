Template.chart.helpers({
	"chartData": function() {
		return Session.get("animes");
	}
});

Meteor.call("getTime", function(error, result) {
	console.log(result);
	Session.set("animes", result);
});
