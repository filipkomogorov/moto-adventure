var mongoose= require("mongoose");
var Route = require("./models/route");
var Comment = require("./models/comment")


var data = [
    {
        name: "From Central Bulgaria to Czech Republic",
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Sofia-Vourvourou", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "A weekend around the Balkans", 
        image: "https://images.unsplash.com/photo-1552306062-29a5560e1c31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all routes
   Route.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed routes!"); 
	   //add few adventure routes
	    data.forEach(function(seed){
			Route.create(seed, function(err, route){
				if(err){
					console.log(err)
				} else {
					console.log("added an adventure route");
					//create comment
					Comment.create(
                        {
                            text: "Awesome trip",
                            author: "John"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                route.comments.push(comment);
                                route.save();
                                console.log("Created new comment");
                            }
                        });
				}
			});
		});
	});	
};
 
module.exports = seedDB;