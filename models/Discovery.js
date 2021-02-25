const mongoose = require("mongoose")

const DiscoverySchema = mongoos.Schema({
  title:{
    type: String,
    required: true
  },
  genres:{
    type:[String],
    required: true
  },
  description:{
    type: String,
    required: true
  },
  essentialListening:{
    type: String
  },
  links:{
    type:[String]
  },
  social:{
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
  },
  videoUrl:{
    type: String
  },
  members:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: user
  },
})

module.exports = Discovery = mongoose.model('discovery', DiscoverySchema)