var 	express				  = require("express"),
		app					  = express(),
		passport    		  = require("passport"),
		LocalStrategy 		  = require("passport-local"),
		bodyParser 	  		  = require("body-parser"),
		flash       		  = require("connect-flash"),
		methodOverride 		  = require("method-override"),
		mongoose     		  = require("mongoose");
		
var 	User				  = require("./models/user");

var		commentRoutes		  = require("./routes/comments"),
		studioRoutes		  = require("./routes/studios"),
		indexRoutes		      = require("./routes/index");
		
mongoose.connect(process.env.DATABASEURL);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
	secret: "This is the secret key",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/studios", studioRoutes);
app.use("/studios/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("the server has started");
});