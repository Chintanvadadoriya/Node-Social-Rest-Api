const UserSchema = new mongoose.Schema({

     username: {
          type: String,
          require: true,
          min: 3,
          max: 20,
          unique: true
     },
     email: {
          type: String,
          require: true,
          max: 50,
          unique: true
     },
     password: {
          type: String,
          require: true,
          min: 6
     },
     profilePicture: {
          type: String,
          default: ''
     },
     coverPicture: {
          type: String,
          default: ''
     },

     followers: {
          type: Array,
          default: []
     },
     followins: {
          type: Array,
          default: []
     },
     isAdmin: {
          type: Boolean,
          default: false
     }
})