var  express =          require('express'),
     app =              express(),
     bodyParser =       require('body-parser'),
     mongoose =         require("mongoose"),
     Campground =       require('./models/campground.js'),
     seedDB =           require('./seeds.js'),
     Comment =          require("./models/comment.js"),
     passport =         require('passport'),
     localStrategy=     require('passport-local'),
     passportLocalMongoose = require('passport-local-mongoose'),
     User =             require('./models/users'),
     methodOverride =   require('method-override'),
     flash=             require('connect-flash');
     
     
var campgroundRoutes =          require('./routes/campground.js'),
    authRoutes =                require('./routes/auth.js'),
    commentRoutes =             require('./routes/comments.js');

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://Kyle:kayleeH5!@ds037195.mlab.com:37195/camp-practice");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//SEED THE DATABASE
// seedDB();

//PASSPORT CONFIG


app.use(require('express-session')({
  secret: "Rusty is the cutest dog in the world",
  resave: false,
 saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//SERVER STARTED
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp Started");
});










