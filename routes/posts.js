let express = require('express');
let router = express.Router();
let PostCtrl = require('../controllers/PostCtrl');

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

 router.post('/create', PostCtrl.create_post_post);

 /* Update Post Get */

 router.get('/update/:id', PostCtrl.update_post_get);

 /* Update Post Post */

 router.post('/update/:id', PostCtrl.update_post_post);

 /* Delete Post Get */

 router.get('/delete/:id', PostCtrl.delete_post_get);

 /* Delete Post Delete*/

 router.delete('/delete/:id', PostCtrl.delete_post_delete);

 /* READ Post Get */

 router.get('/post/:id', PostCtrl.get_post);


module.exports = router;