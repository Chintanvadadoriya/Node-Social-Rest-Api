const router =require('express').Router()
const Post =require('../model/Post')

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
//get timeline post
module.exports=router