const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')


//update user

router.put('/:id', async (req, res) => {
     if (req.body.userId === req.params.id || req.body.isAdmin) {
          if (req.body.password) {
               try {
                    const salt = await bcrypt.genSalt(10)
                    req.body.password = await bcrypt.hash(req.body.password, salt)

               } catch (err) {
                    res.status(500).json(err),
                     console.log('Password change user Exeption :>> ', err)
               }
          }
          try{
               const user =await User.findByIdAndUpdate(req.params.id,{$set:req.body})
               res.status(200).json({msg:'Account has been updated'}) 

          }catch(err){
             console.log('user update Exeption :>> ',err)
             res.status(500).json(err)
          }

     } else {
          return res.status(403).json({ msg: "You can update only your account" })
     }
})

//delete user

router.delete('/:id', async (req, res) => {
     if (req.body.userId === req.params.id || req.body.isAdmin) {
          
          try{
               const user =await User.findByIdAndDelete(req.params.id)
               res.status(200).json({msg:'Account has been delete'}) 

          }catch(err){
             console.log('user delete Exeption :>> ',err)
             res.status(500).json(err)
          }

     } else {
          return res.status(403).json({ msg: "You can delete only your account" })
     }
})

// get user

router.get('/:id',async(req,res)=>{
     try{
        const user =await User.findById(req.params.id)
        const {password,updatedAt,...other}=user._doc
        res.status(200).json(other)
     }catch(err){
         console.log('Get user Exeption :>> ',err)
         res.status(500).json(err)
     }
})
//follow user
router.put('/:id/follow',async(req,res)=>{
     if(req.body.userId !== req.params.id){
      try{
         const user =await User.findById(req.params.id)
         const currentUser=await User.findById(req.body.userId)

         if(!user.followers.includes(req.body.userId)){
          await user.updateOne({$push:{followers:req.body.userId}})
         await currentUser.updateOne({$push:{followings:req.params.id}}) 
         res.status(201).json({msg:'user has been followed'})

         }else{
          res.status(403).json({msg:"You already followed this user"})
         }
      }catch(err){
          console.log('follow Exeption :>> ',err);
          res.status(500).json(err)
      }
     }else{
          res.status(403).json({msg:'You can not follow your self'})
     }
})


// unfollow user

router.put('/:id/unfollow',async(req,res)=>{
     if(req.body.userId !== req.params.id){
      try{
         const user =await User.findById(req.params.id)
         const currentUser=await User.findById(req.body.userId)

         if(user.followers.includes(req.body.userId)){
          await user.updateOne({$pull:{followers:req.body.userId}})
         await currentUser.updateOne({$pull:{followings:req.params.id}}) 
         res.status(201).json({msg:'User has been unfollowed'})

         }else{
          res.status(403).json({msg:"You doni't unfollowe this user"})
         }
      }catch(err){
          console.log('unfollow Exeption :>> ',err);
          res.status(500).json(err)
      }
     }else{
          res.status(403).json({msg:'You can not unfollow your self'})
     }
})


module.exports = router