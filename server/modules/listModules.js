Meteor.methods({
	//Insert passed anime name and associated user ID into anime list DB
	"insertAnimeData": function(animeName, airTime, currentUserId) {
		AnimeLists.insert({
			name: animeName,
			airing: airTime,
			addedBy: currentUserId
		});
	},
	//Remove passed selected anime value to remove it from anime list DB
	"removeAnimeData": function(selectedAnime) {
		AnimeLists.remove({_id: selectedAnime});
	}
});
