// // const express = require('express');

// // const app = express();

// // app.use(express.json())

// // const database = {
// //     users: [
// //         {
// //             id: '123',
// //             name: 'jamal',
// //             email: 'jamal@gmail.com',
// //             password: 'cookies',
// //             entry: 0,
// //             joined: new Date()
// //         },
// //         {
// //             id: '124',
// //             name: 'nasir',
// //             email: 'nasir@gmail.com',
// //             password: 'bananas',
// //             entry: 0,
// //             joined: new Date()
// //         }
// //     ]
// // }

// // app.get('/', (req, res)=> {
// //     res.send(database.users)
// // })

// // // for the signin endpoint
// // app.post('/signin', (req, res)=> {
// //     if( req.body.email === database.users[0].email && req.body.password === database.users[0].password){
// //         res.json("Success")
// //     } else {
// //         res.status(400).json("error logging in")
// //     }
// // })

// // app.post('/register', (req, res)=> {
// //     const {name, email, password} = req.body
// //     database.users.push({
// //         id: '125',
// //         name: name,
// //         email: email,
// //         password: password,
// //         entry: 0,
// //         joined: new Date()
// //     })
// //     res.json(database.users[database.users.length - 1])
// // })






// // app.listen(3000, ()=> {
// //     console.log("app is running on port 3000")
// // })

const express = require('express');

const bcrypt = require('bcrypt-nodejs');

//importing the register file from controllers
const register = require('./controllers/register')
//importing the signin file from controllers
const signin = require('./controllers/signin')
//importing the profile file from controllers
const profile = require('./controllers/profile')
//importing the image file from controllers
const image = require('./controllers/image')
// we need to install cors to be able to connect our server on local host
const cors = require('cors');

// connecting to the database
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'test',
      database: 'smart-brain',
    },
  });


const app = express();
// we have to use the middleware to parse the body of the data so it can be read by the express framework.

app.use(express.json())
app.use(cors());



app.get('/', (req, res)=> {
    res.json('success')
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db ) })


// planning the API
// "/" -> res = this is working
// "/signin" -> POST = res = success
// "/register" -> POST = res = user 
// "/profile/:userId" = GET = user
// "image" --> PUT = res = user




// Load hash from your password DB.




app.listen(3000, ()=> {
    console.log("app is running on port 3000")
})


