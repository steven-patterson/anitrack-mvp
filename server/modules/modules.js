Meteor.methods({
	"insertAnimeData": function(animeName) {
		AnimeLists.insert({
			name: animeName
		});
	},
	"removeAnimeData": function(selectedAnime) {
		AnimeLists.remove({_id: selectedAnime});
	}
});
