const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: process.env.DATABASE_URL,
		ssl: true,
	}
});



app.use(express.json());
app.use(cors());


/*	/ --> res = this is working	*/
app.get('/', (req, res)=>{
	res.send('succes');
})

/*	/signin --> POST  = sicces/fail	*/
app.post('/signin', (req, res) => {sigin.handleSignIn(req, res, db, bcrypt)})

/*  /register --> POST = user */
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

/*	/profile/:userId --> GET = user 	*/

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res)})


/*	/image --> PUT --> user 	*/
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


/*// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running on port ${ process.env.PORT}`);
})

