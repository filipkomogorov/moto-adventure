var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	Route 			= require("./models/route"),
	Comment 		= require("./models/comment"),
	flash 			= require("connect-flash"),
	passport 		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	User 			= require("./models/user"),
	methodOverride  =require("method-override"),
	seedDB 			= require("./seeds");

//requiring routes/paths
var commentRoutes = require("./paths/comments"),
	routeRoutes   = require("./paths/routes"),
	indexRoutes 	  = require("./paths/index");


mongoose.connect("mongodb://localhost:27017/moto_adv", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Unbreakable secretty secret",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/routes/:id/comments", commentRoutes);
app.use("/routes", routeRoutes);


app.listen(3000, function(){
	console.log("Starting the MotoADV server")
}); 