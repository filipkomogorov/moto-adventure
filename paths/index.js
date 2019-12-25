var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")


//root route
router.get("/", function(req, res){
    res.render("landing");
});


//Register form route
router.get("/register", function(req, res){
   res.render("register", {page: 'reguster'}); 
});

//route to handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {error: err.message})
        }
        passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Moto Adventures " + user.username)
            res.redirect("/routes"); 
        });
    });
});

//Show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/routes",
        failureRedirect: "/login"
    }), function(req, res){
});

//Logout route
router.get("/logout", function(req, res){
   req.logout();
	req.flash("success", "Logged Out!")
   res.redirect("/routes");
});


module.exports = router;