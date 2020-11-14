# Country Information App

## How to use App
Look for desried countries and see information about them and add to favorites and give countries nick names. 

---

## How to use API 
* https://restcountries.eu/rest/v2/name/ Name Of Country
* https://restcountries.eu/rest/v2/alpha/ Country Code

---

## Instructions
* create a node app: npm init -y
* .gitignore
* set up express: npm i express
    * then set up require express/home route/listen port
* stubbed out GET and POST login and signup routes 
* set up router 
* set up ejs layouts 
* make 2 ejs files, one for signup and one for login 
    * can be put in auth folder
* set get routes to res.render
* make a form for signup that takes name, email, and password 
    * form types text, email, password
* make a form for login that takes email and password 
* set up sequelize database 


# Sequelize Hooks
* sequelize hook: 
    * hooks give the ability to go into a lifecycle event and perform a certain function related to that instance
    * lifecycle event: the various stages that an instance goes through as its being updated/created/destroyed 
    * called before and after calls in sequelize are executed 
* using hooks: 
    * All hooks are defined using a function that takes two arguments. The first argument is the instance passing through the lifecycle hook. The second argument is an options object (rarely used - you can often ignore it or exclude it).
* add hooks:
    * via .define() method
    * .hook() method
    * direct method: calls hook function directly on table/model
* types: 
    * Global hooks: hooks that run for all models
        * default: runs if the model does not define its own hook
        * permanent: always runs before, regardless of specifying hook
    * instance hooks: run whenever youre editting a single object 
    * model hooks: used for when editing more than one record at a time, run whenever youre using method bulkCreate, update, destroy 

## bcrypt:
1. bcyrpt is an npm package which implements the bcyrpt function to hash passwords so they can be saved in the database.
2. The 'b' stands for Blowfish encryption which is an algorithm used. bcrypt incorporates a unique salt to each password to create a hashed-password/salt combination which can be safely stored in the database.
3. To use bcrypt in node first run `npm i bcrypt` and require it: const `bcrypt= require('bcrypt')` at the top of your models' file. Then you need to specify a number of salt rounds (e.g. 10) which will be used by the bcrypt.genSalt or .hash methods. The documentation recommends to use the async implementation which can also be considered as Promises or can be used with async/await.


## session: 
* WHAT IS A COOKie
* session is a cookie for the server side, can contain more secure info for the user 
* new session is created for each new user 
* that session is used to hold particular data for that user and something their intereations with the site 
* stores it in the backend 
* when a request comes in, the cookie has a unique session identifier for a user and will check it 
* keeps track of who is logged in 
* a session is basically the period of time a user is browsing/interacting with a website. a session creates a file in a temp directory on the server
* use: 
    * to install: npm i express-session
    * import it: const session= require('express-session');
    * set up middleware: 
            app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true
            }));
        * each session has a secret (save in env variables)
        * resave: 

Session notes:
https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session


## passport: 
* Passport recognizes that each application has unique authentication requirements. Authentication mechanisms, known as strategies, are packaged as individual modules. Applications can choose which strategies to employ, without creating unnecessary dependencies.
* install: npm i passport
* Authenticating requests is as simple as calling passport.authenticate() and specifying which strategy to employ.
* strategy is what strategy app uses when logging in (?)
* create config file: ppConfig.js in config folder
* By default, if authentication fails, Passport will respond with a 401 Unauthorized status, and any additional route handlers will not be invoked. If authentication succeeds, the next handler will be invoked and the req.user property will be set to the authenticated user.
* import it in ppConfig.js, `const passport= require('passport');`
* then require the exported module in your entry point (index.js) file `const passport= require('./config/ppConfig.js');`
* check ppConfig for required code 
* middleware in entry file:
`app.use(passport.initialize());`
`app.use(passport.session());`
* http://www.passportjs.org/docs/
* redirect/flash message
* install: npm i passport-local
* require it in ppConfig: `const LocalStrategy= require('passport-local');`
* require it in auth.js: `const passport= require('../config/ppConfig.js');`
* login post route: 
        router.post('/login', passport.authenticate('local', {
            failureRedirect: '/auth/login',
            successRedirect: '/'
        }))


### ERROR NOTES: 
express deprecated res.send(status, body): Use res.status(status).send(body) instead  
    * means to use string intrapolation instead of ,

## How to set up:
1. fork and clone
2. install dependencies 
```
npm i 
```
3. create a `config.json` with the following code 
``` json
{
  "development": {
    "database": "<insert develop db name here >",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "<insert test db name here >",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "<insert production db name here >",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
**Note:** If your database requires a username and password, you'll need to include these fields as well.
4. create a database 
```
sequelize db:create <insert db name here > 
```
5. Migrate the `user` model to your database 
```
sequelize db:migrate 
```
6. Add a `SESSION_SECRET` (can be any string) and `PORT` environment variable in a `.env` file 
