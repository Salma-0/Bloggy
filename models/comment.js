let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var CommentSchema = new Schema({
	author: {type: Schema.ObjectId, ref: 'User', required: true}, 
	content: String,
	publish_date: Date,
	update_date: Date,
	post_id: {type: Schema.ObjectId, ref: 'Post', required: true}
});

module.exports = mongoose.model('Comment', Comment);