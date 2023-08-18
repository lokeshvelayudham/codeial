
const Post = require("../models/post");
// const Comment = require("../models/comment");
var Comment = require("../models/comment");

module.exports.create = function(req, res){
    Post.findById(req.body.post)
    .then(post => {
        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })
        .then(comment =>{
            post.comments.push(comment);
            post.save();

            res.redirect('/')
        })
        .catch(err =>{
            console.log('error in saving comment', err);
            return res.status(500).send('Error fetching commment');
        })
    })
    .catch(err =>{
        console.log('error in fetching post', err);
        return res.status(500).send('Error fetching post');
    })


}