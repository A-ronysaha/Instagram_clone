let express = require("express");
let app = express();


 


let mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose
  .connect("mongodb://127.0.0.1:27017/Insta_Clone")
  .then(() => {
    console.log("CONNECTION ESTD !!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR !!!");
    console.log(err);
  });

app.use(express.json())

let auth_Route = require("./Routes/authRoute");
app.use("/api/auth", auth_Route);

let Instapost_Routes = require("./Routes/instaPostRoute");
app.use("/api/post", Instapost_Routes);

let User_Routes = require("./Routes/userRoute");
app.use("/api/user", User_Routes);


app.listen(1000, (req, res) => {
    console.log("LISTENING ON PORT");
  });