var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstname: String,
	lastname: String,
	age: Number
});

UserSchema.statics = {

};
mongoose.model('User', UserSchema);
