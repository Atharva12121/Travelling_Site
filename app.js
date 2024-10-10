if (process.env.NODE_ENV != "production") {
    require('dotenv').config(); //use to access the  the env variable first instal the dotenv package
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const MongoStore = require("connect-mongo"); // it use to store the section in mongo atlas when we host than it  is importanat
const session = require("express-session");
const flash = require("connect-flash");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const cookie = require("express-session/session/cookie.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const dbUrl = process.env.ATLASDB_URL;


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: SECRET // use to  encrpt the  data
    },
    touchAfter: 24 * 3600, //use when the referse the page than relogin to avoid this their have time has to be set it mean their will be updation on session in 24 hourse

});

store.on("error", () => {
    console.log("Error in mongo session store, " + err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000, //millisecond this is the time of one week
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/", (req, res) => {
//     res.send("Server will start");
// });

main().then(() => console.log("server will started")).catch(err => console.log(err));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));





app.use(methodOverride("_method"));

app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

async function main() {
    // const dbUrl = process.env.ATLASDB_URL;

    await mongoose.connect(dbUrl);
}

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser", async(req, res) => {
//     let fakerUser = new User({
//         email: "atharva@gmail.com",
//         username: "Atharva"
//     });
//     const registerUser = await User.register(fakerUser, "helloworld");
//     res.send(registerUser);
// });


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter)


//------------
//  middleware

app.all("*", (req, res, next) => { // use to match will all server if does not match than send some response
    next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something is wrong" } = err;
    res.status(statusCode).render("./listings/error.ejs", { message })
        // res.status(statusCode).send(message);
});
app.listen(3000, () => {
    console.log(`server will started 3000`);
});
















// app.get("/testListing", async(req, res) => {
//     let samplesListings = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//     await samplesListings.save();
//     console.log("sample was saved");
//     res.send("Successful testing");
// });