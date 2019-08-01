require('../models/comment');
require('../models/post');
require('../models/user');
require('../models/likes');

let async = require('async');
let mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let Post = mongoose.model('Post');
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');
let Like = mongoose.model('Like');

const monthsNames = ["January", 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

formatDate = function(date){
  return `${date.getDate()} ${monthsNames[date.getMonth()]}, ${date.getFullYear()}`;
}

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
    if(images.image){
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
 let user = req.session.user;

  if(!user || user == null){
    let error = new Error('Forbidden');
    error.message = 'You need to sign in to access this page';
    error.status = 403;
    return next(error);
  }

  Post.deleteOne({_id: req.params.id}, function(err, result){
    if(err) 
      return next(err)
    else
      console.log(result);

  })

  Comment.deleteMany({post_id: req.params.id}, function(err, data){
    if(err) return next(err);
    else
      console.log(data);
  })
  res.redirect('/users/user');
}



exports.get_post = function(req, res, next){

  let postID = req.params.id;
  let author;
  let comments = [];
  async.series([
    function(callback){
      Post.findOne({_id: postID}, function(err, post){
        if(err) return callback(err);
        else
          User.findOne({_id: post.author}, function(error, user){
            if(error) return callback(error);
            else{
              author = user;
              return callback(null, post);
            }
          })
      });
  }, function(callback){
     Comment.find({post_id: postID}, function(err, commentsArr){
      if(err) return callback(err);
      if(commentsArr.length == 0)
        return callback(null, comments);
      return callback(null, commentsArr);
     })
  }
  ], function(err, result){
    if(err)
      return next(err);
    res.render('blog', {title: 'Blog', post: result[0],logged: req.session.logged, author: author.username, formatDate, comments: result[1]});
  });
}

exports.post_like = function(req, res, next){
  let user = req.session.user;
  if(!user || user == null)
    return next(new Error('Forbidden'));
  let postID = req.params.id;

  async.series([
    function(callback){
      Like.findOne({post: postID, user: user._id}, function(err, like){
        if(err) return callback(err);
        else if(like == null || !like)
            return callback(null, null);
        else
          return callback(new Error('You have already liked this post'), null);
      })
    },
    function(callback){
      Post.findOneAndUpdate({_id: postID}, { $inc: {likes_count: 1}}, {new: true}, function(err, response){
        if(err)
          return callback(err);
        return callback(null, null);
      });
    }, function(callback){
      let newLike = new Like({
        user: user._id,
        post: postID
      });
      newLike.save();
      return callback(null, null);
    }], function(err, result){
      if(err) 
        return next(err)
      else
        res.redirect('/posts/post/'+postID);
    })
}

