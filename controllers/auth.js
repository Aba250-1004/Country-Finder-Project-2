const express= require('express');
const router= express.Router()
const db= require('../models');
const passport= require('../config/ppConfig.js');

router.get('/signup', (req, res)=> {
    //res.send('sign up page');
    res.render('auth/signup');
})

router.post('/signup', (req, res)=> {
    // console.log('posting to auth/signup');
    console.log('sign-up form user input: ', req.body);
    db.user.findOrCreate({
        where: {email: req.body.email},
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    })
    .then(([createdUser, wasCreated])=> {
        if(wasCreated){
            console.log(`just created the following user: ${createdUser}`);
            //log the new user in 
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Account created and logged in!' //!-> FLASH <-!
            })(req, res) //IIFE= immediately invoked function
        } else {
            req.flash('error', 'email already exists, try logging in');
            res.redirect('/auth/login');
            //console.log(`An account associated with that email address already exists! Try logging in.`);
        }
        //res.redirect('/auth/login');
    })
    .catch(err => {
       // console.log('errors: ', err);
       req.flash('error', err.messsage);
       res.redirect('/auth/signup');
    })
    
})

router.get('/login', (req, res)=> {
    //res.send('login form page');
    res.render('auth/login.ejs');
})

// router.post('/login', (req, res)=> {
//     console.log('posting to auth/login');
//     console.log('login form input', req.body);

    
//     res.redirect('/');
// })

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
    failureFlash: 'Invalid email or password',
    successFlash: 'You are now logged in'
}))

router.get('/logout', (req, res)=> {
    req.logout();
    req.flash('success', 'Successfully logged out');
    res.redirect('/');
})

module.exports= router;