const User = require('../models/user');

// profile page
module.exports.profile = async function (req, res) {
    try {
        if (req.cookies.user_id) {
            const user = await User.findById(req.cookies.user_id);

            if (user) {
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            } else {
                return res.redirect('/users/sign-in');
            }
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.log('Error in finding user by ID:', err);
        return res.status(500).send('Server Error');
    }
};



// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
// module.exports.create =  function(req, res){
//     if (req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finding user in signing up'); return}

//         if (!user){
//             User.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user while signing up'); return}

//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             return res.redirect('back');
//         }

//     });
// }


// latest workig

// module.exports.create = async function (req, res) {
//     if (req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//     }

//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             const newUser = await User.create(req.body);
//             return res.redirect('/users/sign-in');
//         } else {
//             return res.redirect('back');
//         }
//     } catch (err) {
//         console.log('Error in finding/creating user while signing up:', err);
//         return res.status(500).send('Server Error');
//     }
// }

module.exports.create = async function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({email: req.body.email});
        if (!user){
            try{
                const newUser = await User.create(req.body);
                return res.redirect('/users/sign-in');
            } catch(err){
                console.log('error in creating user while signing up'); 
                return
            }}
        else {
            return res.redirect('back');
        }}
    catch (err) {
        console.log('error in finding user in signing up'); 
        return
    }            
}

 

// sign in and create a session for the user
module.exports.createSession = async function(req, res){
    // steps
    // find the user
    try{
        const user = await User.findOne({email: req.body.email});
        // handle user found
        if (user){
            // check password matches or not
            if (user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
            
        }
        else{
            // handle user not found
            return res.redirect('back');
        }
    }
    catch (err){
        console.log('error in finding user in signing up'); 
        return
    }

}