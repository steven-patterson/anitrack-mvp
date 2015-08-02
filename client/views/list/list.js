Template.list.helpers({
	"animeList": function() {
		var currentUserId = Meteor.userId();
		return AnimeLists.find({});
	},
	"selectedAnime": function() {
		var animeId = this._id;
		var selectedAnime = Session.get("selectedAnime");
		if (animeId === selectedAnime){
			return "selected";
		}
	}
});

Template.list.events({
	"submit form": function(event) {
		event.preventDefault();
		var animeName = event.target.animeName.value;
		var currentUserId = Meteor.userId();
		Meteor.call("insertAnimeData", animeName, currentUserId);
		$("#listForm")[0].reset();
	},
	"click .anime": function() {
		var animeId = this._id;
		Session.set("selectedAnime", animeId);
	},
	"click .remove": function() {
		var selectedAnime= Session.get("selectedAnime");
		Meteor.call("removeAnimeData", selectedAnime);
	}
});
