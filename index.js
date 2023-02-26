const express = require('express');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const userAuth = require('./routes/auth')


dotenv.config()
mongoose.set("strictQuery", false);
console.log('object :>> ', process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL,
     (err) => {
          if (err) {
               console.log('err on cloud mongoose :>> ', err);
          } else {

               console.log('connection cloud');
          }
     });

// mongoose.connect(process.env.MONGO_URL_Local,(err)=>{
//      console.log('err :>> ', err);
//      console.log('connect mongoose Locally')
// })

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use('/api/users', userRoute)
app.use('/api/auth', userAuth)


app.listen(5000)    