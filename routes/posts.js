let express = require('express');
let router = express.Router();
let PostCtrl = require('../controllers/PostCtrl');
let CommentCtrl = require('../controllers/CommentCtrl');
const multiparty = require('connect-multiparty');
const multipartMiddleware = multiparty({uploadDir: './uploads'});


/* Get Posts List */

router.get('/', function(req, res, next){
	res.send('Posts List');
});


/* 
 * CREATE POST GET
 */

router.get('/create', PostCtrl.create_post_get);

 /* 
 * CREATE POST POST
 */

 router.post('/create', multipartMiddleware, PostCtrl.create_post_post);

 /* Update Post Get */

 router.get('/update/:id', PostCtrl.update_post_get);

 /* Update Post Post */

 router.post('/update/:id', PostCtrl.update_post_post);

 /* Delete Post Get */

 router.get('/delete/:id', PostCtrl.delete_post_get);



 /* READ Post Get */

 router.get('/post/:id', PostCtrl.get_post);

 /* CREATE A COMMENT */

 router.post('/post/:id/comment/create', CommentCtrl.create_comment_post);

router.get('/post/:id/like', PostCtrl.post_like);

module.exports = router;