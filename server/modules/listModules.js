Meteor.methods({
	"insertAnimeData": function(animeName, currentUserId) {
		AnimeLists.insert({
			name: animeName,
			addedBy: currentUserId
		});
	},
	"removeAnimeData": function(selectedAnime) {
		AnimeLists.remove({_id: selectedAnime});
	}
});
