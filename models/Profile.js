const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  avatar:{
    type: String,
    default:'https://e7.pngegg.com/pngimages/185/383/png-clipart-computer-icons-waveform-sound-wave-text-logo.png'
  },
  location:{
    type: String
  },
  bio: {
    type: String
  },
  genres:{
    type: [String]
  },
  status:{
    type: String,
    default: 'Music Lover'
  },
  projects:{
    type:[ mongoose.Schema.Types.ObjectId ],
    ref: 'discovery'
  },
  spotify:{
    type: String
  },
  soundcloud:{
    type: String
  },
  youtube:{
    type: String
  },
  facebook:{
    type: String
  },
  instagram:{
    type: String
  },
  twitter:{
    type: String
  }
  
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)