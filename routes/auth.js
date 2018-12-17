var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');

//==========================
//AUTH ROUTES
//==========================


//root route
router.get("/", function(req, res){
    res.render("landing");
});

//Get the register template
router.get("/register", function(req, res) {
    res.render("register");
});


//Sign up for an account
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
            });
        }
    });
    
});


//Get in the login form
router.get("/login", function(req, res) {
   res.render("login"); 
});


//Successfully log in to site
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    
}), function(req,res){
    
});


//Logout
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged You Out");
    res.redirect("/campgrounds");
});


module.exports = router;