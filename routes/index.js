var express = require("express"),
router  	= express.Router(),
User        = require("../models/user"),
passport    = require("passport");

router.get("/", function(req, res){
	res.render("index");
});

router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err) {
			req.flash("error", err.message);
			return res.redirect("register");
		} 
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to taraStudio, " + user.username + "!");
			res.redirect("/studios");
		});
	});
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {successRedirect: "/studios", failureRedirect: "/login", successFlash: "Welcome back to taraStudio!", failureFlash: "Invalid username or password"}), function(req, res){});

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You are now logged out");
	res.redirect("/");
});

module.exports = router;