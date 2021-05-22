const express = require('express');

const UsersController = require('../controllers/users');

const router = express.Router();


router.post('/signup', UsersController.users_sign_up);


router.post('/login', UsersController.users_log_in);


router.delete('/:userId', UsersController.users_delete); 


module.exports = router;