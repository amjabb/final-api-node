var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  address: {
  	type: String,
  	unique: true,
  	required: true
  }
});

UserSchema.method("update", function(updates, callback) {
	Object.assign(this, updates);
	this.save(callback);
});

var User = mongoose.model('user', UserSchema)
module.exports.User = User;
