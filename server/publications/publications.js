Meteor.publish("animeLists", function() {
	return AnimeLists.find({});
});
