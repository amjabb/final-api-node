var router = require('express').Router();
var Posts = require("./postModel").Posts;
// setup boilerplate route jsut to satisfy a request
// for building

//This parameter is run whenever the router
//encounters a post_id on the path
//in this case is finds the requested post
//and returns it
router.param("post_id", function(req,res,next,id){
	Posts.findById(id, function(err, doc){
		if(err) return next(err);
		if(!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.post = doc;
		return next();
	});
});

//Return all posts by everyone
router.route('/')
  .get(function(req, res, next){ 
    Posts.find({}).exec(function(err, posts){
  		if(err) return next(err);
  		res.json(posts);
  	});
  })//Delete semicolon how do you figure out when to 
  .post(function(req,res,next){  //Add the authors user ID to the json body
  	var post = new Posts(req.body);
  	post.save(function(err,post){
  		if(err) return next(err);
  		res.status(201);
  		res.json(post);
  	});
  });


router.route("/:post_id")
	//Get a specific post by ID
	.get(function(req,res,next){
		res.json(req.post);
	})
	.put(function(req, res, next){
		req.post.update(req.body, function(err, result){
			if(err) return next(err);
			res.json(result);
		});
	})
	//Deletes the post by the ID passed in
	//Returns that post in the response
	//In this case anyone can delete posts
	.delete(function(req, res){
		req.post.remove(function(err){
			req.post.save(function(err, post){
				if(err) return next(err);
				res.json(post);
			});
		});
	});


module.exports = router;
