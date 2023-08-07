module.exports.profile = function(req,res){

    return res.render('user_profile',{
        title: 'User Profile'
    })
    // return res.end('<h1>user Profile</h1>');
}