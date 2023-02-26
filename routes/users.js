const router=require('express').Router()

router.get('/',(req,res)=>{
     res.send('call route file')
})

module.exports=router