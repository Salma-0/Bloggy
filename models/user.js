let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		    'Please fill a valid email address']
		},
	password: {type: String, required: true}

});

module.exports = mongoose.model('User', UserSchema);
