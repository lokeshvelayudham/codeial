const Post = require('../models/post');
const { posts } = require('./posts_controller');
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);


    // Post.find({})
    //     .then(posts => {
    //         return res.render('home', {
    //             title: "Codeial || home",
    //             posts: posts

    //         });
    //     })
    //     .catch(err =>{
    //         console.log('error in fetching post', err);
    //         return res.status(500).send('Error fetching post');
    //     })


    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path:'user'
        }
    })
    .exec()
        .then(posts => {
            return res.render('home', {
                title: "Codeial || home",
                posts: posts

            });
        })
        .catch(err =>{
            console.log('error in fetching post', err);
            return res.status(500).send('Error fetching post');
        })

}
    

// module.exports.actionName = function(req, res){}