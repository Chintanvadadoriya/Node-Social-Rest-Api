const router =require('express').Router()
const Post =require('../model/Post')
const User=require('../model/User')

// create post
router.post('/',async(req,res)=>{
     const newPost =await Post(req.body)
     try{
        const savePost =await newPost.save()
        res.status(201).json(savePost)
     }catch(err){
          console.log('Create post Exeption :>> ',err);
          res.status(500).json(err)
     }
})


// update post
router.put('/:id',async(req,res)=>{
     try{
      const post =await Post.findById(req.params.id)
      if(post.userId === req.body.userId){
          await Post.updateOne({$set:req.body})
          res.status(200).json({msg:'The post has been updated'})
      }else{
          res.status(500).json({msg:'you can update only your post'})
      }
     }catch(err){
          console.log('Update post exeption :>> ',err);
          res.status(500).json(err)
     }
})

// delete post
router.delete('/:id',async(req,res)=>{
     try{
      const post =await Post.findById(req.params.id)
      if(post.userId === req.body.userId){
          await Post.deleteOne()
          res.status(200).json({msg:'The post has been delete'})
      }else{
          res.status(500).json({msg:'user not found for delete post'})
      }
     }catch(err){
          console.log('Delete post exeption :>> ',err);
          res.status(500).json(err)
     }
})
// likes post
router.put('/:id/like',async(req,res)=>{
     try{
          const post =await Post.findById(req.params.id)  
          if(!post.likes.includes(req.body.userId)){
            await Post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json({msg:'The post has been like'})
          } else{
               await Post.updateOne({$pull:{likes:req.body.userId}})
               res.status(200).json({msg:'The post has been disliked'})
          } 
      }catch(err){
          console.log('Like post Exeption :>> ',err);
          res.status(500).json(err)
     }
})
// get post
router.get('/:id',async(req,res)=>{
     try{
     const post  =await Post.findById(req.params.id)
     res.status(200).json(post)
     }catch(err){
          console.log('err in Get post :>> ', err);
          res.status(500).json(err)
     }
})
//get timeline post
router.get('/timeline/:userId',async(req,res)=>{
     try{
          const currentUser =await User.findById(req.params.userId );
          const userPost =await Post.find({userId:currentUser._id})
          const friendPost =await Promise.all(currentUser.followings.map((friendId)=>{ return Post.find({userId:friendId})}))
          res.json(userPost.concat(...friendPost))
     }catch(err){
          console.log('Timeline Exeption :>> ', err);
          res.status(500).json(err)
     }
})

//get  user all posts
router.get('/profile/:username',async(req,res)=>{
     try{
          const user =await User.findOne({username:req.params.username} );
          const posts =await Post.find({userId:user._id})
          res.status(200).json(posts)
         
     }catch(err){
          console.log('user all posts Exeption :>> ', err);
          res.status(500).json(err)
     }
})
module.exports=router



