var express = require("express");
var router = express.Router({mergeParams: true});
var Route = require("../models/route");
var Comment = require("../models/comment");
var middleware = require("../middleware");



//Comments - NEW

router.get("/new",middleware.isLoggedIn, function(req, res){
// 	find route/adventure by ID
	Route.findById(req.params.id, function(err, route){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {route: route})
		};
	});
});;

//Comments CREATE

router.post("/", middleware.isLoggedIn, function(req, res){
	//look for route using ID
	Route.findById(req.params.id, function(err, route){
		if(err){
			console.log(err);
			res.redirect("/routes");
		} else {
			//create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err)
				} else {
					//add username and ID to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					//connect new comment to route
					route.comments.push(comment);
					route.save();
					req.flash("success", "Comment added")
					//redirect to route show page
					res.redirect("/routes/" + route._id);
				}
			});
		}
	});
});


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Route.findById(req.params.id, function(err, foundRoute){
		if(err || !foundRoute){
			req.flash("error", "Post not found");
			return res.redirect("back")
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
      		if(err){
          		res.redirect("back");
      		} else {
       			 res.render("comments/edit", {route_id: req.params.id, comment: foundComment});
      		};
   		});
	});	
});




// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/routes/" + req.params.id );
      }
   });
});


// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
		   req.flash("success", "Comment deleted")
           res.redirect("/routes/" + req.params.id);
       }
    });
});




module.exports = router;
