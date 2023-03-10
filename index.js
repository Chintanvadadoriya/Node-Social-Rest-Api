const express = require('express');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const userAuth = require('./routes/auth')
const postRoute =require('./routes/post')
const multer =require('multer')
const path =require('path')


dotenv.config()
mongoose.set("strictQuery", false);
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

app.use('/images',express.static(path.join(__dirname,"public/images")))

const storage =multer.diskStorage({
     destination:(req,file,cb)=>{
          cb(null,'public/images')
     },
     filename :(req,file,cb)=>{
          cb(null,file.originalname)
     }
})

let upload =multer({storage})
app.post('/api/upload',upload.single('file'),(req,res)=>{
     try{
          return res.status(201).json('File upload successfuly')

     }catch(err){
          console.log('err in File Uplaod server :>> ', err);
     }
})



app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use('/api/users', userRoute)
app.use('/api/auth', userAuth)
app.use('/api/post',postRoute)


app.listen(5000)    