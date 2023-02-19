let express = require("express");
let router = express.Router();
let Insta_Post = require("../Schema/instaPostSchema");
let Login_Require = require("../Middleware/LoginRequire");



// Route 1.. ** Get all the INSTA-POSTS of : GET "api/post/fetchallpost" ** //

router.get("/fetchallpost", Login_Require, async (req, res) => {
  try {
    let allFetchPost = await Insta_Post.find({}).populate(
      "postedBy",
      "_id name"
    ).populate("comment.postedBy","_id name").select("-password")
    // SECOND POPULATE IS DONE BECAUSE,if we dont do, the username of the comment will not visible in the post
    res.json(allFetchPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Invalid login credential");
  }
});

// Route 2.. ** Add new INSTA-POSTS using: POST "api/post/createpost" , login required ** //

router.post("/createpost", Login_Require, async (req, res) => {
  let success = false;
  try {
    const { title, body, photo } = req.body;

    if (!title || !body || !photo) {
      success = false;
      return res.status(400).json({ errors: "Please fill the fields" });
    }
    const thePost = new Insta_Post({
      title,
      body,
      photo,
      postedBy: req.user._id,
    });
    const savePost = await thePost.save();
    // console.log(saveNote);
    res.json({ success: true, savePost });
  } catch (error) {
    console.log("Error in Createpost-->", error.message);
    res.status(500).send("Invalid login credential");
  }
});

// Route 3.. ** GET own-INSTA-POSTS using: POST "api/post/fetchownpost" , login required ** //

router.get("/fetchownpost", Login_Require, async (req, res) => {
  try {
    let FetchOwnPost = await Insta_Post.find({
      postedBy: req.user._id,
    }).populate("postedBy", "_id name");
    res.json(FetchOwnPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Invalid login credential");
  }
});

// Route 4.. **  LIKE insta-post

router.put("/likepost", Login_Require, async (req, res) => {
  try {
    let likePost = await Insta_Post.findByIdAndUpdate(
      req.body._id,
      { $push: { likes: req.user._id } },
      { new: true }
    );
    res.json(likePost)
  } catch (error) {
    console.log(error.message)
    return res.status(422).json({ error });
  }
});

// Route 5.. **  UNLIKE insta-post

router.put("/unlikepost", Login_Require, async (req, res) => {
  try {
    let unLikePost = await Insta_Post.findByIdAndUpdate(
      req.body._id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    res.json(unLikePost)
  } catch (error) {
    console.log(error.message)
    return res.status(422).json({ error });
  }
});

// Route 5.. COMMENTS

router.put('/comments',Login_Require,async(req,res)=>{
  try {
    let commentBody = {
      text: req.body.commentText,
      postedBy: req.user._id
    }
     let theComment = await Insta_Post.findByIdAndUpdate(
      req.body.commentId,
      { $push: { comment: commentBody } },
      { new: true }
    ).populate("comment.postedBy","_id name").populate("postedBy","_id name").select("-password")
     // second populate is needed because we need the user name (who is comment) to stay with every new page rendering.
     // If we do not do the populate, then on every new page rendering the username will not showing at comment part
    res.json(theComment)
  } catch (error) {
    console.log(error.message)
    return res.status(422).json({ error });
  }
})

// Route 4.. ** DELETE Notes using: DELETE: "api/post/deletepost" , login required ** //

router.delete("/deletepost/:id", Login_Require, async (req, res) => {
 
  try {
    //Find that note to be deleted
    let dltPost = await Insta_Post.findById(req.params.id)
    if (!dltPost) {
      return res.status(404).send("Not Found that note");
    }
    //Alow delete only if user owns this note
    if (dltPost.postedBy.toString() !== req.user._id) {
      console.log(dltPost.postedBy)
      return res.status(401).send("Not Match with userId");
    }

    dltPost = await Insta_Post.findByIdAndDelete(req.params.id);
    res.json({ Success: "Your Note has been deleted",  dltPost });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Invalid login credential");
  }
});



module.exports = router;
