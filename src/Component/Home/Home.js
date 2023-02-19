import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ServerContext } from "../../Hook/Context/Servercontext";
import { InstaContext } from "../../Hook/Context/Instacontext";
import "./Home.css";

export default function Home() {
  const { homeData, setHomeData, homeScreen, deletePost } =
    useContext(ServerContext);
  const userState = useContext(InstaContext);
  const [inputPart,setInputPart] = useState("")

  useEffect(() => {
    homeScreen();
  }, []);
  console.log("Home Page-->",homeData)

  const likePostFunc = async (postId) => {
    const serverUrl = "/api/post/likepost";
    const responseData = await fetch(serverUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Login_Token"),
      },
      body: JSON.stringify({ _id: postId }),
    });
    const likeUser = await responseData.json(); // likeuUser contain updated array of the post
    //console.log(likeUser);
    let newData = homeData.map((d) => {
      if (d._id === likeUser._id) {
        return likeUser; 
      } else {
        return d;
      }
    });
    setHomeData(newData);
  };
  console.log("Update homedata after LIKE-->",homeData)
  const unLikePostFunc = async (postId) => {
    const serverUrl = "/api/post/unlikepost";
    const responseData = await fetch(serverUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Login_Token"),
      },
      body: JSON.stringify({ _id: postId }),
    });
    const unLikeUser = await responseData.json();
    console.log(unLikeUser);
    let newData = homeData.map((d) => {
      if (d._id === unLikeUser._id) {
        return unLikeUser;
      } else {
        return d;
      }
    });
    setHomeData(newData);
  };
  console.log("Update homedata after UNLIKE-->",homeData)

  const makeComment = async (text, postId) => {
    const serverUrl = "/api/post/comments";
    const responseData = await fetch(serverUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Login_Token"),
      },
      body: JSON.stringify({
        commentText: text,
        commentId: postId,
      }),
    });
    const comments = await responseData.json();
    console.log("comment-->",comments);
    //console.log(unLikeUser);
    let newData = homeData.map((d) => {
      if (d._id === comments._id) {
        return comments;
      } else {
        return d;
      }
    });
    setHomeData(newData);
  };
  return (
    <div classname="home-container">
      {homeData.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>
              <Link to={item.postedBy._id !== userState._id ? `/profile/${item.postedBy._id}`: "/profile"}>
                {item.postedBy.name}
              </Link>
              <span>
                {item.postedBy._id === userState._id && (
                  <i
                    className="fas fa-trash"
                    style={{ float: "right" }}
                    onClick={() => {
                      deletePost(item._id);
                      //console.log(item._id)
                    }}
                  />
                )}
              </span>
            </h5>
            <div className="card-img">
              <img className="picture" src={item.photo} />
            </div>
            <div className="card-content">
              {item.likes.includes(userState._id) ? (
                <i
                  className="fas fa-thumbs-down"
                  style={{ color: "red" }}
                  onClick={() => {
                    unLikePostFunc(item._id);
                  }}
                />
              ) : (
                <i
                  className="fas fa-thumbs-up"
                  style={{ color: "red" }}
                  onClick={() => {
                    likePostFunc(item._id);
                  }}
                />
              )}

              <h6>{item.likes.length} likes</h6>
              <h5>{item.title}</h5>
              <p>{item.body}</p>
              {item.comment.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "700" }}>
                      {record.postedBy.name} {""}
                      {"-->"}
                    </span>{" "}
                    {record.text}
                    <i
                    className="fas fa-trash"
                    style={{ float: "end" }}
                    onClick={() => {
                     // deletePost();
                      //console.log(item._id)
                    }}
                  />
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id); // children elements of that parent are in array format
                  setInputPart("")
                }}
              >
                <input type="text" placeholder="add a comment" onChange={()=>setInputPart(e.target.value)} />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
