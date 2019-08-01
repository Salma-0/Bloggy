let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	email: {
		type: String,
		required: true,
		unique: true,
		},
	password: {type: String, required: true}

});

module.exports = mongoose.model('User', UserSchema);
