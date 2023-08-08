const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const { route } = require('./users');

console.log('router loaded');


router.get('/', homeController.home);
router.get('/posts', require('./posts'));
router.use('/users', require('./users'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;