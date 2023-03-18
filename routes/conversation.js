const router = require('express').Router()
const Conversation =require('../model/Conversation')

// new Conversation

router.post('/',async(req,res)=>{

     const newConversation =new Conversation({
          members:[req.body.senderId,req.body.receiverId ]
     })

     try{
      const savedConversation= await newConversation.save();
      res.status(201).json(savedConversation)

     }catch(err){
          console.log('err in Conversation:>> ', err) ;
          res.status(500).json(err)
     }
})

// get conversation of a user
router.get('/:userId',async(req,res)=>{
     try{
          const conversation =await Conversation.find({
               members:{ $in : req.params.userId}
          })
          res.status(200).json(conversation)

     }catch(err){
          console.log('err in get Conversation:>> ', err) ;
          res.status(500).json(err)
     }
})

//get conv  include two userId 


router.get('/find/:firstUserId/:secondUserId',async(req,res)=>{
     try{
          const conv =await Conversation.findOne({members:{ $all : [req.params.firstUserId,req.params.secondUserId]}}
          )
          res.status(200).json(conv)
          
     }catch(err){
          console.log('convocation get two UserId :>> ', err)
          res.status(500).json(err)

     }
})
module.exports=router;