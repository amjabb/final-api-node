var router = require('express').Router();
var Category = require("./categoryModel").Category;
// setup boilerplate route jsut to satisfy a request
// for building

//This parameter is run whenever the router
//encounters a category_id on the path
//in this case is finds the requested category
//and returns it
router.param("category_id", function(req,res,next,id){
	Category.findById(id, function(err, doc){
		if(err) return next(err);
		if(!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.category = doc;
		return next();
	});
});


router.route('/')
  .get(function(req, res, next){ //Return all categories
  	Category.find({}).exec(function(err, categories){
  		if(err) return next(err);
  		res.json(categories);
  	});
  })
  .post(function(req,res,next){
  	var category = new Category(req.body);
  	category.save(function(err,category){
  		if(err) return next(err);
  		res.status(201);
  		res.json(category);
  	});
  });
  
router.route('/:category_id')
	.get(function(req, res, next){
		res.json(req.category);
	})
	.put(function(req, res, next){
		req.category.update(req.body, function(err, result){
			if(err) return next(err);
			res.json(result);
		});
	})
	//Deletes the category by the ID passed in
	//Returns that category in the response
	//In this case anyone can delete categories
	.delete(function(req, res, next){
		var categoryTemp = req.category;
		req.category.remove(function(err){
			req.category.save(function(err, post){
				if(err) return next(err);
				res.json(categoryTemp);
			});
		});
	});

  module.exports = router;