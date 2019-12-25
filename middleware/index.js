var Route = require("../models/route");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkRouteOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Route.findById(req.params.id, function(err, foundRoute){
           if(err || !foundRoute){
			   req.flash("error", "Post not found")
               res.redirect("back");
           }  else {
               // does user own the Route?
            if(foundRoute.author.id.equals(req.user._id)) {
                next();
            } else {
				req.flash("error", "You don't have permission to do that!")
                res.redirect("back");
            }
           }
        });
    } else {
		req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err || !foundComment){
			   req.flash("error", "Comment not found!");
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
				req.flash("error", "You dont have permission to do that!")
                res.redirect("back");
            }
           }
        });
    } else {
		req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;