Meteor.methods({
	//Insert passed anime name and associated user ID into anime list DB
	"insertAnimeData": function(animeName, currentUserId) {
		AnimeLists.insert({
			name: animeName,
			addedBy: currentUserId
		});
	},
	//Remove passed selected anime value to remove it from anime list DB
	"removeAnimeData": function(selectedAnime) {
		AnimeLists.remove({_id: selectedAnime});
	}
});
