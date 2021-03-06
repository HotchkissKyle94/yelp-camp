//CAMPGROUND ROUTES

var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');


//Get all campgrounds
router.get("/", function(req, res){
    Campground.find({},
    function(err, campgrounds){
        if(err) {
            console.log("Something went wrong");
            console.log(err);
        } else {
           res.render("campgrounds/index", {campgrounds: campgrounds}); 
        }
    });
 
});

//EDIT CAMPGROUND
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});
    
//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect
});

//Post new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image:image, description: desc, author: author, price: price};
    Campground.create(newCampground, function(err, newCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


//Get new campground template
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


//Get show page of campground
router.get("/:id", function(req, res) {
    //find campground with related id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
  });
  
  //DESTROY CAMPGROUND ROUTE
  
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});
  
  module.exports = router;