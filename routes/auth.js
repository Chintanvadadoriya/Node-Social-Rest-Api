const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt');


// REGISTER
router.post('/register', async (req, res) => {
     try {
          //Generate hash password

          const salt = await bcrypt.genSalt(10)
          const hashpassword = await bcrypt.hash(req.body.password.toString(), salt)

          // Create new user

          const newUser = await new User({
               username: req.body.username,
               email: req.body.email,
               password: hashpassword
          })
          // Save and return user  responce

          const user = await newUser.save()
          res.status(201).json(user)
     } catch (err) {
          res.status(500).json(err)
          console.log('err :>> ', err);
     }
})


//LOGIN

router.post('/login', async (req, res) => {
     try {
          const user = await User.findOne({ email: req.body.email })
          !user && res.status(404).send('user not found')

          const validpassword = await bcrypt.compareSync(req.body.password.toString(), user.password)
          !validpassword && res.status(400).json({ msg: 'wrong password' })
          user && validpassword && res.status(200).json({ user, msg: 'User login successed' })

     } catch (err) {
          res.status(500).json(err)
          console.log('err Login :>> ', err);
     }

})
module.exports = router