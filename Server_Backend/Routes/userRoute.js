let express = require("express");
let router = express.Router();
let Login_Require = require("../Middleware/LoginRequire");
let User = require("../Schema/userSchema");
let Insta_Post = require("../Schema/instaPostSchema");

// Route 1..  Check other user profile

router.get("/otheruser/:id", Login_Require, async (req, res) => {
  try {
    let otherUserId = await User.findById(req.params.id).select("-password");
    // "select" argument choose everything related to login except that item which is pass as argument in select() argument
    if (!otherUserId) {
      return res.status(404).send("Not Found that note");
    }
    let thatUserPost = await Insta_Post.find({
      postedBy: otherUserId._id,
    }).populate("postedBy", "_id name");

    res.json({ Success: "Found the user", otherUserId, thatUserPost });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Invalid User Id");
  }
});

// Route 2.. Followers and Following

router.put("/follow", Login_Require, async (req, res) => {
  try {
    // logged user follow a another profile
    let followerCase = await User.findByIdAndUpdate(
      req.body.followId, // Whoom the user follow
      { $push: { followers: req.user._id } }, //push the loggeduser into followers array of the person whoom he following
      { new: true }
    ).select("-password");
    if (!followerCase) {
      return res.status(404).send("Not Found that note");
    }
    // now update the logged user Following array
    let followingCase = await User.findByIdAndUpdate(
      req.user._id, //  the user whose following array is now update
      { $push: { following: req.body.followId } }, // push that profile id in user's following array
      { new: true }
    ).select("-password");
    res.json({ Success: "done", followerCase, followingCase });
   // console.log(req.user.id)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Invalid User Id");
  }
});

// Route 2.. Un-Follow

router.put("/unfollow", Login_Require, async (req, res) => {
  console.log("logged User-->",req.user.id)
  console.log("unfollow the id-->",req.body.unFollowId)
  try {
    // logged user follow a another profile
    let unFollowerCase = await User.findByIdAndUpdate(
      req.body.unFollowId, // Whoom the user unfollow
      { $pull: { followers: req.user._id } }, //pull out the loggeduser from followers array of the person whoom he following
      { new: true }
    ).select("-password");
    console.log("unfollow log user-->",unFollowerCase)
    if (!unFollowerCase) {
      return res.status(404).send("Not Found that note");
    }
    // now update the logged user Following array
    let unFollowingCase = await User.findByIdAndUpdate(
      req.user._id, //  the user whose following array is now update
      { $pull: { following: req.body.unFollowId } }, // pull out that profile id from user's following array
      { new: true }
    ).select("-password");
    
    console.log("unfollow that user-->",unFollowingCase)
    res.json({ Success: "done", unFollowerCase, unFollowingCase });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Invalid User Id");
  }
});

module.exports = router;
