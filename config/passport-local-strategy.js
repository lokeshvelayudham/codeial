const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function (email, password, done) {
    try {
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
            console.log('Invalid Username/Password');
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> passport', err);
        return done(err);
    }
}));



// passport.use(new LocalStrategy({
//     usernameField:'email'
// },
// function(email,password,done){
//     // find a user and establish the identity
//     User.findOne({email:email}, function(err,user) {
//         if (err){
//             console.log('Error in finding user --> passport');
//             return done(err);
//         }
//         if (!user ||user.password != password){
//             console.log('invalid Username/ password');
//             return done(null,false);
//         }
//         return done(null,user);
//     });
// }

// ));

// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
})


// deserializing the user from the key in the cookies

// passport.deserializeUser(function(id,done){
//     User.findById(id, function(err,user){
//         if (err){
//             console.log('Error in finding user --> passport');
//             return done(err);
//         }
//         return done(null,user); 

//     })
// })

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            console.log('User not found for deserialization');
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log('Error in deserializing user', err);
        return done(err);
    }
});


// check if the user is authticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;

