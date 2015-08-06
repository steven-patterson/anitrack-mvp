Template.list.helpers({
	//Return the anime list registered to the current user id
	"animeList": function() {
		var currentUserId = Meteor.userId();
		return AnimeLists.find({});
	},
	//Apply the "selected" CSS class to selected anime
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
		//Get the value of the input box for anime submission
		var animeName = event.target.animeName.value;
		var currentUserId = Meteor.userId();
		//Insert the value of the submission box to the user anime list
		Meteor.call("insertAnimeData", animeName, currentUserId);
		//Clear the submission box for next anime value
		$("#listForm")[0].reset();
	},
	"click .anime": function() {
		//Pass set selectedAnime value for function to apply "selected" CSS class
		var animeId = this._id;
		Session.set("selectedAnime", animeId);
	},
	"click .remove": function() {
		//Get clicked anime and call the remove function
		var selectedAnime= Session.get("selectedAnime");
		Meteor.call("removeAnimeData", selectedAnime);
	}
});
