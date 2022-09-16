const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileid = require('./controllers/profileid')
const image = require('./controllers/image')


const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-symmetrical-67410)',
    user : 'postgres',
    password : 'testing',
    database : 'smart-brain'
  }
});



const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.get('/', (req, res)=>{
	res.send('pog');
})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res)=> {profileid.handleProfileif(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApicall(req, res,)})



app.listen(process.env.PORT || 3000, ()=> {
  console.log(`Running on port ${process.env.PORT}`)
})