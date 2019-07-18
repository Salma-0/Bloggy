var express = require('express');
var router = express.Router();
let UserCtrl = require('../controllers/UserCtrl');
 
 
router.post('/create', UserCtrl.user_create_post);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET LOGIN PAGE */

router.get('/login', UserCtrl.login_get);

/* POST LOGIN REQUEST */

router.post('/login', UserCtrl.login_post);

/* LOGOUT */

router.get('/logout', UserCtrl.logout);

/* POST SIGN UP/CREATE USER */

/* GET PROFILE PAGE */

router.get('/user', UserCtrl.get_user);

/* UPDATE USER INFO */
router.post('/update', UserCtrl.update_user_post);

module.exports = router;
