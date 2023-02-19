import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  InstaContext,
  InstaDispatchContext,
} from "../Hook/Context/Instacontext";

export default function Userprofiles() {
  const { userid } = useParams();
  const [otherUser, setOtherUser] = useState(null);
  const dispatch = useContext(InstaDispatchContext);
  const userState = useContext(InstaContext);
  //console.log(userid)
  //const followUser =  useContext(ServerContext)
  useEffect(() => {
    // Other User Profile
    const otherUserProfile = async (id) => {
      const serverUrl = `/api/user/otheruser/${id}`;
      const responseData = await fetch(serverUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("Login_Token"),
        },
      });
      const userProfiles = await responseData.json();
      //console.log("userprofile-->",userProfiles)
      setOtherUser(userProfiles);
    };
    otherUserProfile(userid);
  }, []);
  console.log("other user is-->", otherUser);

  const followUser = async () => {
    const serverUrl = `/api/user/follow`;
    const responseData = await fetch(serverUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Login_Token"),
      },
      body: JSON.stringify({ followId: userid }),
    });
    const followData = await responseData.json();
    console.log("Follow data-->", followData);
    dispatch({
      type: "UPDATE",
      payload: {
        following: followData.followingCase.following,
        followers: followData.followingCase.followers,
      },
    });
    localStorage.setItem(
      "LoggedUser",
      JSON.stringify(followData.followingCase)
    );
    //console.log(userState)
    setOtherUser((prvState) => {
      return {
        ...prvState,
        otherUserId: {
          ...prvState.otherUserId,
          followers: [
            ...prvState.otherUserId.followers,
            followData.followingCase._id,
          ],
        },
      };
    });
    //setIsFollowDone(false);
  };

  const unFollowUser = async () => {
    const serverUrl = `/api/user/unfollow`;
    const responseData = await fetch(serverUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Login_Token"),
      },
      body: JSON.stringify({ unFollowId: userid }),
    });
    const unFollowData = await responseData.json();
    console.log("UnFollow data-->", unFollowData);
   // setIsFollowDone(false)
    dispatch({
      type: "UPDATE",
      payload: {
        following: unFollowData.unFollowingCase.following,
        followers: unFollowData.unFollowingCase.followers,
      },
    });
    localStorage.setItem(
      "LoggedUser",
      JSON.stringify(unFollowData.unFollowingCase)
    );
    setOtherUser((prvState) => {
      let unfollowResult = prvState.otherUserId.followers.filter(
        (us) => us !== unFollowData.unFollowingCase._id
      );
      return {
        ...prvState,
        otherUserId: {
          ...prvState.otherUserId,
          followers: unfollowResult,
        },
      };
    });
    //setIsFollowDone(true);
  };
  console.log(otherUser?.otherUserId.followers.includes(userState._id))
 // console.log(userState.id)

  return (
    <div>
      {otherUser ? (
        <div
          style={{ maxWidth: "800px", margin: "0px auto" }}
          key={otherUser.otherUserId._id}
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
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                className="mb-4"
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              />
            </div>
            <div>
              <h4 className="profile-name">{otherUser.otherUserId?.name}</h4>
              <h5>{otherUser.otherUserId.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "120%",
                }}
              >
                <h5>{otherUser.thatUserPost.length} posts</h5>
                <h5>{otherUser.otherUserId.followers.length} followers</h5>
                <h5>{otherUser.otherUserId.following.length}following</h5>
              </div>
              
             
             {!otherUser.otherUserId.followers.includes(userState._id) ? (
             
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => {
                    followUser();
                    
                  }}
                >
                  Follow
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => {
                    unFollowUser();
                  }}
                >
                  Un_Follow
                </button>
              )}
            </div>
          </div>
          <div className="gallery">
            {otherUser.thatUserPost.map((pic) => {
              return (
                <div>
                  <img className="item" src={pic.photo} key={pic._id} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Loading..!!</h2>
      )}
    </div>
  );
}
