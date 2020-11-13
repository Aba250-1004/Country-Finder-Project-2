require('dotenv').config();
const express= require('express');
const app= express();
const ejsLayouts= require('express-ejs-layouts');
const session= require('express-session');
const methodOverride = require('method-override');
const passport= require('./config/ppConfig.js');
const flash= require('connect-flash');
const isLoggedIn= require('./middleware/isLoggedIn');

app.use(express.urlencoded({extended: false}));

//session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method '))

//flash middleware (goes AFTER session middleware, it uses sessions to store the message)
app.use(flash());

//CUSTOM MIDDLEWARE
app.use((req, res, next)=> {
    //before every route, attach the flash messages and current user to res.locals
    //this will give us access to these values in all our ejs pages 
    res.locals.alerts= req.flash();
    res.locals.currentUser= req.user;
    next() //move on to the next piece of 
})

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use('/auth', require('./controllers/auth.js'));

app.get('/', (req, res)=> {
    //res.send('scary spooky skeleton')
    // if(req.user) {
    //     res.send(`Current user: ${req.user.name}`);
    // } else {
    //     res.send('No user currently logged in!');
    // }
    res.render('home.ejs');
})

app.use('/search?',require('./controllers/search.js'))
app.use('/profile',require('./controllers/profile.js'))

//isLoggedIn is middleware that only applies to specific routes, access it because we required it at the top


app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
})