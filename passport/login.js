var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var bCrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var configurations = require("../config");


module.exports = function (passport) {
//     passport.use('login', new LocalStrategy({
//             usernameField: 'username',
//             passwordField: 'password',
//             passReqToCallback: true
//         }, function (req, username, password, done) {
//             var data = req.body;
//             var date = new Date().toUTCString();

//             User.findOne({
//                 'username': username
//             }, function (err, user) {
//                 if (err) {
//                     return done({error: err});
//                 }
//                 if (!user) {
//                     return done(null, false, {'message': 'User Not found.'});
//                 }
//                 if (!isValidPassword(user, password)) {
//                     console.log('Invalid Password');
//                     return done(null, false, {'message': 'Invalid Password'}); // redirect back to login page
//                 }
//                 user.expiresAt = null;
//                 user.jwt_token = "";

//                 var jwt_object = {};
//                 jwt_object.username = user.username;
//                 jwt_object.user_id = user.id;
//                 var jwt_token = jwt.sign({
//                     data: jwt_object
//                 }, configurations.TOKEN_SECRET);
//                 user.jwt_token = jwt_token;
//                 user.isActive = 1;
// ({
//                 'username': username
//             }, function (err, users) {
//                 if (users) {
//                     return done(null, {
//                         jwt_token: user.jwt_token,
//                         username: user.username,
//                         user_id: user.user_id,
//                         user_name: user.user_name,
//                         institute_name: user.institute_name,
//                         isLoggedin: true
//                     });
//                 }
//             });
// user.save({
//                 'username': username
//             }, function (err, users) {
//                 if (users) {
//                     return done(null, {
//                         jwt_token: user.jwt_token,
//                         username: user.username,
//                         user_id: user.user_id,
//                         user_name: user.user_name,
//                         institute_name: user.institute_name,
//                         isLoggedin: true
//                     });
//                 }
//             });
               

//             });

//         })
//     );



};
