const router = require('express').Router()
const Message =require('../model/Message')
//add msg
 
router.post('/',async(req,res)=>{
     const newMessage =new Message(req.body);
     try{
          const savedMessage =await newMessage.save()
          res.status(201).json(savedMessage)

     }catch(err){
          console.log('err in add new msg :>> ', err);
          res.status(500).json(500)
     }
})

// get msg

router.get('/:conversationId',async(req,res)=>{
     console.log('yaaa :>> ');
     try{
          const message =await Message.find({conversationId:req.params.conversationId})
          res.status(200).json(message)
     }
     catch(err){
          console.log('err conversationId==== :>> ', err);
          res.status(500).json(500)
     }
})


module.exports=router;