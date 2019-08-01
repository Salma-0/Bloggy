let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var LikeSchema = new Schema({
	user: {type: Schema.ObjectId, ref: 'User', required: true},
	post: {type: Schema.ObjectId, ref: 'Post', required: true}
});

module.exports = mongoose.model('Like', LikeSchema); 

