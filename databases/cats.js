var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", {useNewUrlParser: true, useUnifiedTopology: true});


var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);



//add new cat to DB

// var george = new Cat({
// 	name: "Mrs. Norris",
// 	age: 7,
// 	temperament: "Evel"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("Something went wrong")
// 	}else{
// 		console.log("Cat saved to DB");
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: "Shishi",
	age: 27,
	temperament: "its ok"
}, function(err, cat){
	if(err){
		console.log("Something went wrong");
	}else{
		console.log("Another cat saved");
		console.log(cat);
	};
});

//retrieve all cats from DB and console.log each one

Cat.find({}, function(err, cats){
	if(err){
		console.log("error");
		console.log(err);
	}else{
		console.log("All CATS:")
		console.log(cats);
	};
});


