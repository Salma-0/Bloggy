let mongoose = require('mongoose');
let crypto = require('crypto');
let async = require('async');
let moment = require('moment');
require('../models/user');
require('../models/post');

let User = mongoose.model('User');
let Post = mongoose.model('Post');

let monthsNames = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

var formatDate = function(date){
  return `${date.getDate()} ${monthsNames[date.getMonth()]}, ${date.getFullYear()}`;
}



//HASH PASSWORD
function hashPassword(password){
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');

	return[salt, hash].join('$');
}


//VERIFY HASHED PASSWORD
function verifyHash(password, original){
	const originalHash = original.split('$')[1];
	const salt = original.split('$')[0];
	const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');

	return hash === originalHash;
}


exports.login_get = function(req, res, next){
	res.render('login', {title: 'Sign in'});
}

exports.login_post = function(req, res, next){
 var email = req.body.email;
  var pass = req.body.password;

    
    User.findOne({email: email})
    .exec(function(err, record){
      if(err){
        return next(err);
      }else if(!record || record == null){
        let error = new Error('User Not Found');
        error.status = 404;
        return next(error);
      }
      if(!verifyHash(pass, record.password)){
        var error = new Error('Incorrect Password');
        error.status = 401;
        return next(error);
      }
      else{
        req.session.user = record;
        req.session.logged = true;
        res.redirect('/users/user/');
      }

    });
}


exports.logout = function(req, res, next){
  req.session.logged = false;
  req.session.destroy();
  res.redirect('/');
}

exports.user_create_post = function(req, res, next){
	let username = req.body.username;
  let pass = hashPassword(req.body.password1);
  let email = req.body.email;

  var user = new User({
    username: username,
    password: pass,
    email: email
  });
  user.save(err =>{
    if(err) return next(err);
    else
      res.redirect('/users/login');
  });

}

exports.get_user = function(req, res, next){
	var user = req.session.user;
  if(!user || user == null){
  	var error = new Error('Unauthorized');
  	error.status = 500;
  	return next(error);
  }else{

    async.series([
      function(callback){
        Post.find({author: user._id}, function(err, posts){
          if(err) return callback(err);
          else
            return callback(null, posts);
        })
      }], function(err, result){
        if(err) 
          return next(err);
        res.render('profile', {title: user.username, user: user, logged: req.session.logged, posts: result[0], formatDate});
      })
  }
}

exports.update_user_post = function(req, res, next){
   let user = req.session.user;
   if(!user || user == null){
    let error = new Error('Forbidden');
    error.status = 403;
    return next(error);
   }

   async.series([
    function(callback){
      User.findOne({_id: user._id}, function(err, record){
        if(err) return callback(err);
        else{
          record.username = req.body.username;
          record.save();
          req.session.user = record;
          return callback(null, null);
        }
      })
    }], function(err, result){
      if(err) 
        return next(err);
      res.redirect('/users/user');
    })
}