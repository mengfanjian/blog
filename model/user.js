var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name : {
		user : String,
		type : String,
		unique : true
	},
	password : String
});

module.exports = mongoose.model('user',userSchema);