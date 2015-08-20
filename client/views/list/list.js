Template.list.helpers({
	//Return the anime list registered to the current user id
	"animeList": function() {
		var currentUserId = Meteor.userId();
		return AnimeLists.find({});
	},
	"animeAiring": function() {
		var animeInfo = Session.get("animes");
		for (var i = 0; i < animeInfo.length; i++) {
			if (animeInfo[i].animeName === this.name) {
				return animeInfo[i].airTime;
			}
		}
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
	"click .anime": function() {
		//Pass set selectedAnime value for function to apply "selected" CSS class
		var animeId = this._id;
		Session.set("selectedAnime", animeId);
	},
	"click .remove": function() {
		//Get clicked anime and call the remove function
		var selectedAnime= Session.get("selectedAnime");
		Meteor.call("removeAnimeData", selectedAnime);
	},
	"click #add-anime": function() {
		var currentUserId = Meteor.userId();
		var animeName = this.animeName;
		//Insert the value of the submission box to the user anime list
		Meteor.call("insertAnimeData", animeName, currentUserId);
	}
});
