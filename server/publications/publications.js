Meteor.publish("animeLists", function() {
	var currentUserId = this.userId;
	//Filter to only return lists belonging to current user
	return AnimeLists.find({addedBy: currentUserId});
});
