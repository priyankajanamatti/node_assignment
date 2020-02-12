var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var nodeMailer = require('nodemailer');
var configuration = require("../config");
// var email = require("../utils/mailer");
module.exports = function (passport) {
//     passport.use('signup', new LocalStrategy({
//             usernameField: 'username',
//             passwordField: 'password',
//             passReqToCallback: true   // allows us to pass back the entire request to the callback
//         }, function (req, username, password, done) {
// var users_count;
//             findOrCreateUser = function () {
//                 var data = req.body;
//                 User.count({}, function (err, events) {
//                     if (err) {
//                         callback({
//                             msg: "Finding event_id from database , an error",
//                             statuscode: 500,
//                         });
//                     } else if (events == null) {
//                         users_count = 0;
//                     }else{
//                         users_count = events;
                       
//                     }
//                 User.findOne({username:data.username}, function (err, user) {
//                     if (err) {
//                         return done({message: err});
//                     }
//                     if (user) {
//                         return done({message: "Username " +username}, false, {message: req.flash(username + " is already taken.")});
//                     } else {
//                         var newUser = new User();
//                         newUser.username = username;
//                         newUser.password = createHash(password);
//                         var date = new Date();
//                         newUser.createdAt = date.toUTCString();
//                         createHash(username);
//                         var time = new Date().getTime();
//                         var crypto = require('crypto');
//                         var name = username;
//                         var signupcry = crypto.createHash('md5').update(name).digest('hex');
//                         var passtoken = signupcry.concat(time);
//                         newUser.passtoken = passtoken;
//                         newUser.isActive = true;
//                         if(users_count == 0){
//                             newUser.role = "admin";
//                         }else{
//                             newUser.role = "user";
//                         }
//                         newUser.save(function (err) {
//                             if (err) {
//                                 console.log('Error in Saving user: ' + err);
//                                 return done(err);
//                             }
//                             return done(null, newUser);
//                         });
//                     }
//                 });
//                 });
//             };
//             process.nextTick(findOrCreateUser);
//         })
//     );



}
