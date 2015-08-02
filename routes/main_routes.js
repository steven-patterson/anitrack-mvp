Router.route('/', function () {
	if (!Meteor.user()) {
		this.render("home");
	} else {
		this.render("list");
	}
});

Router.route("/user_account", function() {
	this.render("userAccount");
});
