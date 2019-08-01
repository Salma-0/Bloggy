var express = require('express');
var router = express.Router();
require('../models/post');
const mongoose = require('mongoose');
const async = require('async');

const Post = mongoose.model('Post');

const monthsNames = ["January", 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let formatDate = function(date){
  return `${date.getDate()} ${monthsNames[date.getMonth()]}, ${date.getFullYear()}`;
}
/* GET home page. */
router.get('/', function(req, res, next) {
  let page = 1;
async.series([
	function(callback){
		const query = {};
        const projection = {title: 1, heading: 1, publish_date: 1};
        const options = { sort: { publish_date: -1 }, limit: 5};
        Post.find(query, projection, options).exec(function(err, posts) { 
           if(err)
           	return callback(err);
           else
           	return callback(null, posts);
        });
	}], function(err, results){
		res.render('index', { title: 'Bloggy', logged: req.session.logged, posts: results[0], formatDate, page: page});

	})
});

router.post('/older-posts', function(req, res, next){
  let page = parseInt(req.body.page) + 1;

  async.series([
    function(callback){
      const query = {};
      const projection = {title: 1, heading: 1, publish_date: 1};
      const options = { skip: 2*page, limit: 5,};
      Post.find(query, projection, options).exec(function(err, posts){
        if(err) return callback(err);
        else
          return callback(null, posts);
      });
    }], function(err, results){
      res.render('index', { title: 'Bloggy', logged: req.session.logged, posts: results[0], formatDate, page: page});

    });
})




module.exports = router;
