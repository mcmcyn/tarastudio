var	Studio   = require("../models/studio"),
	Comment  = require("../models/comment");
	
var	middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	};
	req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
};

middlewareObj.checkStudioOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Studio.findById(req.params.id, function(err, foundStudio){
			if(err){
				req.flash("error", "Something went wrong");
				res.redirect("back");
			} else {
				if(foundStudio.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You need permission to do that!");
					res.redirect("/studios/" + req.params.id);
				};
			};
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("/login");
	};
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Someting went wrong");
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You need permission to do that!");
					res.redirect("/studios/" + req.params.id);
				};
			};
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("/login");
	};
};

module.exports = middlewareObj;