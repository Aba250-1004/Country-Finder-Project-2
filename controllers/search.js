const express= require('express');
const router= express.Router()
const db= require('../models');
const session= require('express-session');
const passport= require('../config/ppConfig.js');
const flash= require('connect-flash');
const axios = require('axios');
const isLoggedIn= require('../middleware/isLoggedIn');
const methodOverride = require('method-override');

router.use(express.urlencoded({extended: false}));
router.use(methodOverride('_method '))

//session middleware
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//passport middleware
router.use(passport.initialize());
router.use(passport.session());

//flash middleware (goes AFTER session middleware, it uses sessions to store the message)
router.use(flash());

//CUSTOM MIDDLEWARE
router.use((req, res, next)=> {
    //before every route, attach the flash messages and current user to res.locals
    //this will give us access to these values in all our ejs pages 
    res.locals.alerts= req.flash();
    res.locals.currentUser= req.user;
    next() //move on to the next piece of 
})



router.get('/', (req, res)=> {
    res.render('search/home');
})

router.get('/results', (req, res)=> {
    // res.send(req.query)
    axios.get("https://restcountries.eu/rest/v2/all/")
    .then(response => {
        res.send(response)
    })
})

router.get('/name',(req,res)=>{
    res.render('search/name.ejs')
})

router.get('/name/results',(req,res)=>{
    // res.send(req.query)
    axios.get("https://restcountries.eu/rest/v2/name/"+req.query.toSearch)
    .then(response => {
        //res.send(response.data)
        let outputStr = "";
        for(let i = 0; i < response.data[0].timezones.length; i++){
            if (i+1 === response.data[0].timezones.length){
                outputStr += response.data[0].timezones[i]
            }else{
                outputStr += response.data[0].timezones[i] + ", ";
            }
        }
        db.country.findOrCreate({
            where:{name:response.data[0].name}
        })
        .then(([createdFave,wasCreated]) => {
            res.render('search/results/name.ejs',{response:response.data,zones:outputStr})
        })
    })
    .catch(err => {
        res.render('error.ejs')
    })
})


router.get('/code',(req,res)=>{
    res.render('search/code.ejs')
})

router.get('/code/results',(req,res)=>{
    //res.send(req.query)
    axios.get("https://restcountries.eu/rest/v2/alpha/"+req.query.toSearch)
    .then(response => {
        let outputStr = "";
        for(let i = 0; i < response.data.timezones.length; i++){
            if (i+1 === response.data.timezones.length){
                outputStr += response.data.timezones[i]
            }else{
                outputStr += response.data.timezones[i] + ", ";
            }
        }
        db.country.findOrCreate({
            where:{name:response.data.name}
        })
        .then(([createdFave,wasCreated]) => {
            res.render('search/results/code.ejs',{response:response.data,zones:outputStr})
        })
        // res.send(response.data)
    })
    .catch(err => {
        res.render('error.ejs')
    })
})


module.exports= router;