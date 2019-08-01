require('../models/comment');
require('../models/post');
require('../models/user');

let async = require('async');
let mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

exports.create_comment_post = function(req, res, next){
  let user = req.session.user;
  if(!user || user == null){
  	return next(Error('Forbidden'));
  }
  
  let postID = req.params.id;
  let content = req.body.content;
  let now = Date();
  async.series([
  	function(callback){
      let comment = new Comment({
      	author: user._id,
      	username: user.username,
      	content: content, 
      	publish_date: now,
      	update_date: now,
      	post_id: postID 
      });

      comment.save(function(err, result){
      	if(err) 
      		return callback(err);
      	else
      		console.log(result);
      });
      return callback(null, null);
  	}, function(callback){
  		Post.findOneAndUpdate({_id: postID}, { $inc: {comments_count: 1}}, {new: true}, function(err, response){
  			if(err)
  				return callback(err);
  			return callback(null, null);
  		})
  	}],
  	 function(err, results){
  		if(err) 
  			return next(err);
  		res.redirect('/posts/post/'+postID);
  	})
}

exports.update_comment_post = function(req, res, next){

}

exports.get_comments = function(req, res, next){

}

exports.delete_comment = function(req, res, next){

}