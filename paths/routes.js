var express = require("express");
var router = express.Router();
var Route = require("../models/route");
var middleware = require("../middleware");

//INDEX - Display the list of all routes and adventures
router.get("/", function(req, res){
	//Get all routes from DB
	Route.find({}, function(err, allRoutes){
		if(err){
			console.log(err)
		}else{
			res.render("routes/index", {routes:allRoutes, page: 'routes'});
		}
	});
});

//CREATE - Add a new adventure/route
router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from form and add to routes array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newRoute = {name: name, price: price, image: image, description: desc, author:author};
	//create new route and save to DB 	
	Route.create(newRoute, function(err, newlyCreated){
		if(err){
			console.log(err)
		}else{
			//redirect back to routes
			res.redirect("/routes");
		}
	});
});

//NEW - Display form to make a new adventure
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("routes/new"); 
});

//SHOW - Show more info about one adventure
router.get("/:id", function(req, res){
	//find the adventure with provided ID
	Route.findById(req.params.id).populate("comments").exec(function(err, foundRoute){
		if(err || !foundRoute){
			req.flash("error", "Post not found!");
			res.redirect("back");
		}else{
			//render show template with that route
			res.render("routes/show", {route: foundRoute});
		}
	});
});

//EDIT ROUTE PATH
router.get("/:id/edit", middleware.checkRouteOwnership, function(req, res){
		Route.findById(req.params.id, function(err, foundRoute){
			res.render("routes/edit", {route:foundRoute});
		});
	});

//UPDATE ROUTE PATH

router.put("/:id",middleware.checkRouteOwnership, function(req, res){
	//find and update the correct ROUTE
	Route.findByIdAndUpdate(req.params.id, req.body.route, function(err, updatedRoute){
		if(err){
			res.redirect("/routes");
		} else {
			res.redirect("/routes/" + req.params.id);
		}
	});
	//redict to the show page
});

//DESTROY ROUTE 
router.delete("/:id",middleware.checkRouteOwnership, function(req, res){
	Route.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/routes");
		} else {
			res.redirect("/routes");
		}
	});
});



module.exports = router;