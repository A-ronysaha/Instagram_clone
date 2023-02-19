import React, { useState, useEffect, useContext } from "react";
import { InstaContext } from "../../Hook/Context/Instacontext";
import { ServerContext } from "../../Hook/Context/Servercontext";
import "./Profile.css";

export default function Profile() {
  const { userProfile, profile } = useContext(ServerContext);
  const userState = useContext(InstaContext);
   console.log(userState)
  useEffect(() => {
    profile();
  }, []);
  console.log(userProfile);

  return (
    <div
      style={{ maxWidth: "800px", margin: "0px auto" }}
      key={userProfile._id}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 5px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            className="mb-4"
            src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            // src={profilePic ? profilePic.url : "loading"}
          />{" "}
        </div>

        <div>
          <h4 className="profile-name">{userState?.name}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "120%",
            }}
          >
            <h5>{userProfile.length} posts</h5>
            {/* <h5>{userState.includes(followers.length)?(userState.followers.length) : "0"} followers</h5>
                <h5>{userState.includes(following.length)?(userState.following.length) : "0"}following</h5> */}
          </div>
        </div>
      </div>
      <div className="gallery">
        {userProfile.map((pic) => {
          return <img className="item" src={pic.photo} key={pic._id} />;
        })}
      </div>
    </div>
  );
}
