# Country Information App

---
## Demo
https://country-finder-2.herokuapp.com/

## How to use App
Look for desried countries and see information about them and add to favorites and give countries nick names. 

---

## Installation Instuctions
* fork and clone this repo
* cd into the directory and `npm init`
* `npm i` to install all dependencies
* `sequelize init`
* in `config.json`, change the dialect to `"postgres"` and the database to `"proj2_development"`
* `sequelize db:migrate` 
* create a `.env` and add a `PORT` and a `SECRET_SESSION`
* run `nodemon` and open your localhost to the port you selected
* create a user

---

## How to use API 
* https://restcountries.eu/rest/v2/name/ Name Of Country
* https://restcountries.eu/rest/v2/alpha/ Country Code

---

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Dependencies:
   - axios
   - bcrypt
   - chart.js
   - connect-flash
   - dotenv
   - ejs
   - express
   - express-ejs-layouts
   - express-session
   - method-override
   - passport
   - passport-local
   - pg
   - sequelize


---

## Development Plan

- Back-end functional, data able to be stored and third party API called correctly.
- Layout and pages to have working links for the logged in user.
- Front-end, styling, setting a color scheme for site.

---

## MVP

- Site has a sign up/log in functionality with hashed passwords and authorization flow.
CRUD functions for the user:
   - User can create a favorite country.
   - User can view their favorite countries.
   - User can edit the name of the favorite countries, while not changing the name of the countries.
   - User can delete countries from their favorites.
   
