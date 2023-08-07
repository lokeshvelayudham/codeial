const express = require('express');
const router = express.Router();


const postsController = require('../controller/posts_controller');

router.get('/',postsController.posts);

module.exports = router;