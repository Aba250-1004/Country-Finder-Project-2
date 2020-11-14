const express= require('express');
const router= express.Router()
const db= require('../models');
const session= require('express-session');
const passport= require('../config/ppConfig.js');
const flash= require('connect-flash');
const isLoggedIn= require('../middleware/isLoggedIn');
const methodOverride = require('method-override');

router.use(methodOverride('_method'))
router.use(express.urlencoded({extended: false}));

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



router.get('/', isLoggedIn, (req, res)=> {
    res.render('profile/home.ejs');
})

router.get('/favorites',isLoggedIn,(req,res)=>{
    listOfCountries = []
    db.CountryUser.findAll({
        where:{userId:req.user.id},
    })
    .then(foundUserCountry => {   
        res.render("profile/favorites/favorites2.ejs",{info:foundUserCountry})  
    })    
})

router.post('/favorites',isLoggedIn,(req,res)=>{
    // res.send("this is me posting")
    // res.send(req.user)
    db.user.findOne({
        where: {id: req.user.id}
    })
    .then(foundUser => {
        db.country.findOne({
            where: {name: req.body.name},
        })
        .then(foundCountry => {
            foundUser.addCountry(foundCountry)
            .then(newRelation => {
                console.log(newRelation)
                db.country.findAll()
                .then(foundCountries => {
                    for (let country of foundCountries){
                    db.CountryUser.update(
                        {countryName: country.name},
                        {where:{countryId:country.id}
                    })
                .then(numUpdated => {
                    console.log(numUpdated)
                    res.redirect('/profile/favorites')
        })
    }
    })
            })
        })
    })
    
    // res.redirect('/profile/favorites');
})

// router.put('/favorites',isLoggedIn,(req,res) => {
//     console.log(req.params)
//     console.log('====================')
//     console.log(req.body.newName)
//     db.user.update({
//         name:req.body.newName},
//         {where:{id:req.user.id}
//     }).then(editedUser => {
//         console.log(editedUser)
//         res.redirect('/profile/favorites');
//     })
// })

router.put('/favorites',isLoggedIn,(req,res) => {
    console.log(req.params)
    console.log('====================')
    console.log(req.body)
    db.CountryUser.update({
        countryName:req.body.newName},
        {where:{
            userId:req.user.id,
            countryId: req.body.countryId
        }})
        .then(numUpdated => {
            res.redirect('/profile/favorites')
        })
    
})

router.delete('/favorites/:id',isLoggedIn,(req,res)=> {
    console.log(req.params.id)
    console.log("00000000000000")
    db.CountryUser.destroy({
        where:{
            countryId:req.params.id,
            userId:req.user.id
        }
    })
    .then(deleted => {
        res.redirect('/profile/favorites')
    })
})




module.exports= router;