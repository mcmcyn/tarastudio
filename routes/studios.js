var express = require("express"),
router  	= express.Router(),
Studio      = require("../models/studio"),
middleware  = require("../middleware");

router.get("/", function(req, res){
	Studio.find({}, function(err, allStudios){
		if(err){
			console.log(err);
		} else {
			res.render("studios/studios", {studios: allStudios});
		};
	});
});

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("studios/new");
});

router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newStudio = {name: name, image: image, description: desc, author: author};
	Studio.create(newStudio, function(err, createdStudio){
		if(err) {
			console.log(err);
		} else {
			req.flash("success", "Studio successfully added!");
			res.redirect("studios/" + createdStudio._id);
		};
	});
});

router.get("/:id", function(req, res){
	Studio.findById(req.params.id).populate("comments").exec(function(err, foundStudio){
		if(err) {
			console.log(err);
		} else {
			res.render("studios/show", {studio: foundStudio});
		};
	});
});

router.get("/:id/edit", middleware.checkStudioOwnership, function(req, res){
	Studio.findById(req.params.id, function(err, foundStudio){
		if(err){
			console.log(err);
		} else {
			res.render("studios/edit", {studio: foundStudio});
		};
	});
});

router.put("/:id", middleware.checkStudioOwnership, function(req, res){
	Studio.findByIdAndUpdate(req.params.id, req.body.studio, function(err, editedStudio){
		if(err) {
			console.log(err);
		} else {
			req.flash("success", "Studio successfully edited!");
			res.redirect("/studios/" + req.params.id);
		};
	});
});

router.delete("/:id", middleware.checkStudioOwnership, function(req, res){
	Studio.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			req.flash("something went wrong");
			res.redirect("/studios");
		} else {
			req.flash("success", "Studio successfully deleted!");
			res.redirect("/studios");
		};
	});
});

module.exports = router;