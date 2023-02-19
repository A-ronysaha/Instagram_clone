let express = require("express");
let router = express.Router();
let User = require("../Schema/userSchema");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let Login_Require = require("../Middleware/LoginRequire");

const JWT_SECRET = "Ronyisagood$boy";

router.post("/register", async (req, res) => {
  let success = false;
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success, errors: "Please add all the fields" });
    }
    const salt = bcrypt.genSaltSync(10); // generate salt
    const hash = bcrypt.hashSync(password, salt);
    const createUser = new User({
      name,
      email,
      password: hash,
    });

    const saveUser = await createUser.save();
    // console.log(saveUser);
    res.json({ success: true, saveUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Invalid login credential");
  }
});

router.post("/login", async (req, res) => {
  let success = false;
  let { email, password } = req.body;
  try {
    let existUser = await User.findOne({ email });
    if (!existUser) {
      success = false;
      return res
        .status(400)
        .json({ Error: "Please try to login with correct credential" });
    }

    const passwordCompare = bcrypt.compareSync(password, existUser.password); // To compare a password
    if (!passwordCompare) {
      success = false;
      return res
        .status(400)
        .json({ error: "Please try to login with correct credential" });
    } else {
      const data = {
        user: {
          _id: existUser._id,
          userTitle: existUser.name,
          userEmail: existUser.email,
         // userFollowing: existUser.following,
         // userFollowers: existUser.followers
        },
      };
      const jwtAuthToken = jwt.sign(data, JWT_SECRET); // send only logged user's jwtToken
      res.json({ success: true, data, jwtAuthToken });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Invalid login credential");
  }
});

router.post("/getuser", Login_Require, async (req, res) => {
  try {
    let loggedUserId = await User.findById(req.user._id).select("-password");
    // "select" argument choose everything related to login except that item which is pass as argument in select() argument
    res.send(loggedUserId);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Invalid login credential");
  }
});

module.exports = router;
