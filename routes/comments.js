//========================================
//COMMENTS ROUTES
//========================================

var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground.js');
var Comment = require('../models/comment.js');
var middleware = require('../middleware');


//Get new comment template
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log("Error");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Post new comment
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    //save comment
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully Added Comment");
                    res.redirect("/campgrounds/" + campground._id);
                    
                }
            });
        }
    });
});

//EDIT EXISTING COMMENT

router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.redirect('back');
        } else {
             res.render("./comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE COMMENT

router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY ROUTE

router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success","Comment Deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});




module.exports = router;