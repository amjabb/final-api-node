var router = require('express').Router();
var User = require("./userModel").User;
// setup boilerplate route jsut to satisfy a request
// for building

//This parameter is run whenever the router
//encounters a user_id on the path
//in this case is finds the requested user
//and returns it
router.param("user_id", function(req,res,next,id){
	User.findById(id, function(err, doc){
		if(err) return next(err);
		if(!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.user = doc;
		return next();
	});
});

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.
router.route('/')
  .get(function(req, res, next){ //Return all users
  	User.find({}).exec(function(err, users){
  		if(err) return next(err);
  		res.json(users);
  	});
  })
  .post(function(req,res,next){
  	var user = new User(req.body);
  	user.save(function(err,user){
  		if(err) return next(err);
  		res.status(201);
  		res.json(user);
  	});
  });

router.route('/:user_id')
	.get(function(req,res,next){
		res.json(req.user);
	})
	.put(function(req, res, next){
		req.user.update(req.body, function(err, result){
			if(err) return next(err);
			res.json(result);
		});
	})
	//Deletes the user by the ID passed in
	//Returns that user in the response
	//In this case anyone can delete users
	.delete(function(req, res, next){
		var userTemp = req.user;
		req.user.remove(function(err){
			req.user.save(function(err, post){
				if(err) return next(err);
				res.json(userTemp);
			});
		});
	});

module.exports = router;
