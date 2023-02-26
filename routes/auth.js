const router = require('express').Router()
const User = require('../model/User')

// REGISTER
router.get('/register', async (req, res) => {
     console.log('yup call');
     // res.send('yupppp')
     try {
          const user = await new User ({
               username: 'johnxc',
               email: 'jhon@gmaicl.com',
               password: '123456'
          })
          await user.save()
          res.send('ok')
     } catch (err) { console.log('err :>> ', err); }
})

module.exports = router