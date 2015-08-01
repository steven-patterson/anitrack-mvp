Template.header.helpers({
	"showUser": function() {
		return Meteor.user().emails[0].address;
	}
});

Template.header.events({
	"click #logout": function() {
		Meteor.logout();
	}
});
