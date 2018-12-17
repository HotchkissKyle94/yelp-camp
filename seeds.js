var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var Comment = require("./models/comment.js");

var data = [
   
    {   name: "Cloud's Rest", 
        image: "https://media-cdn.tripadvisor.com/media/photo-s/08/cb/a8/8c/fuller-s-resort-campground.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    
      { name: "Mountain's Goat", 
        image: "https://campingmama.files.wordpress.com/2009/05/10_27_2008_cg-review-trip-011-22.jpg?w=470&amp;h=352",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    
      { name: "John Darnielle Ridge", 
        image: "https://media-cdn.tripadvisor.com/media/photo-s/06/10/e0/0b/camp-siter.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];


function seedDB () {
    //REMOVE ALL CAMPGROUNDS
        Campground.remove({}, function(err) {
        if(err) {
            console.log("ERROR");
        }
        
        console.log("REMOVED CAMPGROUND");
          data.forEach(function(seed){
     //ADD A FEW CAMPGROUNDS
          Campground.create(seed, function(err, campground){
              if(err) {
                  console.log(err);
              } else {
                  console.log("Added a campground to database");
                  //CREATE A COMMENT
                  Comment.create(
                      {
                          text:"This place is great!",
                          author: "Tom"
                           
                      }, function(err, comment){
                          if(err) {
                              console.log("ERROR!"); 
                          } else {
                              campground.comments.push(comment);
                              campground.save();
                              console.log("Created new comment!");
                          }
                      });
              }
          });
        });
    });
}

module.exports = seedDB;