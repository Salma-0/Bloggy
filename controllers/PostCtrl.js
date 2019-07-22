require('../models/comment');
require('../models/post');

let async = require('async');
let mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let Post = mongoose.model('Post');
let Comment = mongoose.model('Comment');

function removeImages(directory){
  fs.readdir(directory, function(err, files) {
    if(err) throw err;
    for(const file of files){
      fs.unlink(path.join(directory, file), err=>{
        if(err) throw err;
      })
    }
  })
}

//convert array of images into array of strings of base64

function toBase64(imgs){
  let array = [];
  for(let i =0; i<imgs.length; i++){
    console.log(imgs[i].path);
    let buffer = fs.readFileSync(imgs[i].path);
    array.push(buffer.toString('base64'));
  }

  
  return array;
}

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
    error.message = 'You need to sign in to access this page';
  	error.status = 403;
  	return next(error);
  }
  res.render('add-post', {title: 'New Post', logged: req.session.logged});
}

exports.create_post_post = function(req, res, next){
  let user = req.session.user;
  let title = req.body.title;
  let firstHeading = req.body.firstHeading;
  let quotes = req.body.quotes;
  let secHeadings = req.body.secHeadings;
  let paragraphs = req.body.paragraphs;
  let images = req.files;
  let imageBs64 = [];

  async.series([function(callback){
    if(images){
      imageBs64 = toBase64(images.image);
      console.log('The images have been converted successfully');
      return callback(null, imageBs64);
    }
  }], function(err, result){
    if(err) next(err);
    let now = new Date();
    var newPost = new Post({
      title: title,
      heading: firstHeading,
      quotes: quotes,
      section_headings: secHeadings,
      paragraphs: paragraphs,
      images: imageBs64,
      publish_date: now,
      update_date: now,
      author: user._id,
      comments_count: 0,
      likes_count: 0
    });

    newPost.save(function(err, post){
      if(err) return next(err);
      console.log(post);
      res.redirect('/posts/post/'+post._id);

    });
    removeImages('./uploads');
  });


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
  res.render('blog', {title: 'Blog', logged: req.session.logged});
}