Router.route('/', function () {
	this.render("home");
});

Router.route("/list", function() {
	this.render("list");
});

Router.route("/user_account", function() {
	this.render("userAccount");
});
