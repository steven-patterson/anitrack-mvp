Meteor.publish("animeLists", function() {
	var currentUserId = this.userId;
	return AnimeLists.find({addedBy: currentUserId});
});
