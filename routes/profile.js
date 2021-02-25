const express = require("express")
const router = express.Router()
const {
  check,
  validationResult
} = require("express-validator")
const Profile = require("../models/Profile")
const config = require("config")
const authMiddle = require("../middleware/authMiddle")


// @route     GET api/profile
// @desc      retrieve profile with token (logged in user)
// @access    private
router.get('/', authMiddle, async (req, res) => {

  try {

    const profile = await (await Profile.findOne({
      user: req.user
    }))

    if (!profile) {
      return res.status(400).json({
        msg: 'No profile found for this user'
      })
    }

    res.json(profile)

  } catch (err) {

    console.error(err.message)

    res.status(500).send('server error')
  }

})

// @route     POST api/profile
// @desc      create/update profile
// @access    private
router.post('/', authMiddle, async (req, res) => {

  const {
    avatar,
    location,
    bio,
    genres,
    status,
    projects, // @TODO - deal with projects being passed/created by user on profile
    spotify,
    soundcloud,
    youtube,
    facebook,
    instagram,
    twitter
  } = req.body;

  const profileObject = {
    user: req.user
  }

  if (avatar) profileObject.avatar = avatar
  if (location) profileObject.location = location
  if (bio) profileObject.bio = bio
  if (status) profileObject.status = status
  if (genres) {
    profileObject.genres = typeof genres === 'string' ? genres.split(',').map(skill => skill.trim()) : genres
  }

  // @@TODO - deal with projects being passed/created by user on profile

  profileObject.social = {}
  if (spotify) profileObject.social.spotify = spotify
  if (soundcloud) profileObject.social.soundcloud = soundcloud
  if (youtube) profileObject.social.youtube = youtube
  if (facebook) profileObject.social.facebook = facebook
  if (instagram) profileObject.social.instagram = instagram
  if (twitter) profileObject.social.twitter = twitter


  try {

    let profile = await Profile.findOne({ user: req.user })

    if(profile){
      //update
      profile = await Profile.findOneAndUpdate({ user: req.user }, { $set: profileObject }, { new: true })

      return res.json(profile)
    }

    profile = new Profile(profileObject)

    await profile.save()

    res.json({ profile })

  } catch (err) {

    console.error(err.message)

    res.status(500).send('server error')

  }


})



// @route     GET api/profile/:user_id
// @desc      retrieve profile by user_id
// @access    private
router.get('/:user_id', authMiddle, async (req, res) => {

  try {

    const profile = await (await Profile.findOne({ user: req.params.user_id }))

    if (!profile) {
      return res.status(400).json({
        msg: 'No profile found for this user'
      })
    }

    res.json(profile)

  } catch (err) {

    console.error(err.message)

    res.status(500).send('server error')
  }

})

module.exports = router