require('../models/comment');
require('../models/post');

let async = require('async');
let mongoose = require('mongoose');

let Post = mongoose.model('Post');
let Comment = mongoose.model('Comment');

exports.get_posts_list = function(req, res, next){
  let query = Post.find().sort('publish_date', -1).limit(10);
  query.exec(function(err, posts){
  	if(err) return next(err);
  	else
  		res.render('index', {title: 'Bloggy', posts: posts, logged: req.session.logged});
  });

}

exports.create_post_get = function(req, res, next){
  let user = req.session.user;

  if(!user || user == null){
  	let error = new Error('Forbidden');
  	error.status = 403;
  	return next(error);
  }
  
}

exports.create_post_post = function(req, res, next){

}

exports.update_post_get = function(req, res, next){

}

exports.update_post_post = function(req, res, next){

}

exports.delete_post_get = function(req, res, next){

}

exports.delete_post_delete = function(req, res, next){

}

exports.get_post = function(req, res, next){

}