var express = require("express"),
router  	= express.Router({mergeParams: true}),
Studio      = require("../models/studio"),
Comment     = require("../models/comment"),
middleware  = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
	Studio.findById(req.params.id, function(err, foundStudio){
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {studio: foundStudio});
		};
	});
});

router.post("/", middleware.isLoggedIn, function(req, res){
	var text = req.body.text;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var comment = {text: text, author: author};
	Studio.findById(req.params.id, function(err, foundStudio){
		if(err) {
			console.log(err);
		} else {
			Comment.create(comment, function(err, newComment){
				if(err) {
					console.log(err);
				} else {
					foundStudio.comments.push(newComment);
					foundStudio.save();
					req.flash("success", "Comment successfully added!");
					res.redirect("/studios/" + foundStudio._id);
				};
			});
		};
	});
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			console.log(err);
		} else {
			res.render("comments/edit", {studio_id:req.params.id, comment: foundComment});
		};
	});
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, editedComment){
		if(err){
			console.log(err);
		} else {
			req.flash("success", "Comment successfully edited!");
			res.redirect("/studios/" + req.params.id);	
		};
	});
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error", "Something went wrong");
			res.redirect("/studios/" + req.params.id);
		} else {
			req.flash("success", "Comment successfully deleted!");
			res.redirect("/studios/" + req.params.id);
		};
	});
});

module.exports = router;