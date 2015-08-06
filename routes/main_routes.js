Router.route('/', function () {
	//If the user is logged in, show the user list page, otherwise show the home page
	if (!Meteor.user()) {
		this.render("home");
	} else {
		this.render("list");
	}
});

Router.route("/user_account", function() {
	//Render signup/login page
	this.render("userAccount");
});
