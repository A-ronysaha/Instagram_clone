import React,{useState,createContext} from 'react'
export const ServerContext = createContext();


export default function ServerProvider(props) {

  
    const [homeData, setHomeData] = useState([]);
    const [followingPostData, setfollowingPostData] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const [userProfilepost, setUserProfilePost] = useState([]);
   
    // Fetch all Post
      const homeScreen = async () => {
        const serverUrl = "/api/post/fetchallpost";
        const responseData = await fetch(serverUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("Login_Token"),
          },
        });
        const data = await responseData.json();
        setHomeData(data);
      };

    // Fetch own Post

    const profile = async () => {
        const serverUrl = "/api/post/fetchownpost";
        const responseData = await fetch(serverUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("Login_Token"),
          },
        });
        const userData = await responseData.json();
      //  console.log("Userdata-->",userData)
        setUserProfile(userData);
        //setUserProfilePost(userData[0].photo)
      };
      


    // Delete Post

    const deletePost =  async(dltId) => {
      const url = `/api/post/deletepost/${dltId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('Login_Token')
        },
      });
      const dltJson = await response.json();
      console.log("Delete from Client-->",dltJson);
      
  
      //==> logic for DELETE <==\\
      let updtPost = homeData.filter((t) => t._id !== dltId);
      setHomeData(updtPost);
    };

    // Follow case

    // const followUser = async()=>{
    //   const serverUrl = `/api/user/follow`;
    //     const responseData = await fetch(serverUrl, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "auth-token": localStorage.getItem("Login_Token"),
    //       },
    //     });
    //     const followData = await responseData.json();
    //     console.log("Follow data-->",followData) 
    //   };
    // }

  return (
    <ServerContext.Provider
      value={{ homeData,setHomeData,homeScreen,userProfile,userProfilepost,profile,deletePost}}
    >
      {props.children}
    </ServerContext.Provider>
  )
}
