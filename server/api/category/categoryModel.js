var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

CategorySchema.method("update", function(updates, callback) {
	Object.assign(this, updates);
	this.save(callback);
});

var Category = mongoose.model('category', CategorySchema)
module.exports.Category = Category;