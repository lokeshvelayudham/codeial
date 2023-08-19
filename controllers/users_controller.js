const User = require('../models/user');

// let's keep it same as before

module.exports.profile = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            console.log('User not found');
            return res.redirect('/');
        }

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
        console.error('Error in fetching user profile:', err);
        return res.redirect('/');
    }
};



module.exports.update = async function(req, res) {
    try {
        if (req.user.id === req.params.id) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

            if (!updatedUser) {
                console.log('User not found');
                return res.redirect('back');
            }

            return res.redirect('back');
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.error('Error in updating user:', err);
        return res.redirect('back');
    }
};


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error during user creation:', err);
        return res.redirect('back');
    }
};

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Sucessfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.error('Error during logout:', err);
        }

        req.flash('success', 'You have logged out');
        return res.redirect('/');
    });
};