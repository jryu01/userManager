var mongoose = require('mongoose');
var User = mongoose.model('User');

/*
 * GET users listing.
 */

exports.list = function(req, res){
	User.find(function(err, users) {
		if (err) {
			console.log(err);
			return res.send(500, err);
		}
		res.send(users);
	});
};

exports.detail = function(req, res){
	User.findById(req.params.id, function(err, user) {
		if (err) {
			console.log(err);
			res.send(404, err);
		}
		res.send(user);
	});
};

exports.create = function(req, res){
	var user = new User(req.body);
	user.save(function(err) {
		if (err) {
			console.log(err);
			return res.send(500, err);
		}
		res.send(user);
	});
};

exports.update = function(req, res){
	User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
		if (err) {
			console.log(err);
			return res.send(500, err);
		}	
		res.send(user);
	});
};

exports.remove = function(req, res){
	User.remove({_id: req.params.id}, function(err){
		if (err) {
			console.log(err);
			return res.send(500, err);
		}
		res.send(204);
	});
};
