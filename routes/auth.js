const router=require('express').Router()

router.get('/',(req,res)=>{
     res.send('call route auth file')
})

module.exports=router