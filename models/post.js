let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var PostSchema = new Schema({
	author: {type: Schema.ObjectId, ref: 'User', required: true},
	title: String,
	heading: String,
	images: [String],
	section_headings: [String],
	paragraphs: [String],
	quotes: [String],
	publish_date: Date,
	update_date: Date,
	likes_count: Number,
	comments_count: Number
});

module.exports = mongoose.model('Post', PostSchema);