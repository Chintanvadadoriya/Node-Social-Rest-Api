const express=require('express');
const app =express()
const mongoose=require('mongoose')
const dotenv =require('dotenv')
const helmet =require('helmet')
const morgan=require('morgan')

dotenv.config()
mongoose.connect(process.env.MONGO_URL,
     {useNewUrlparser:true,useUnifieldTopology:true},
     ()=>{
     console.log('connection');
});

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))


app.listen(8800)    