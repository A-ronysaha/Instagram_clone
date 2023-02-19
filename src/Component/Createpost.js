import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Createpost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  // If the image url i.e.[{setImage(e.target.files[0])}] is succesfully update into cloudinary & also image is update by the processs of [{setImage(e.target.files[0])}]
  // then we make the network rqst for "createpost". So we put the network rqst logic into useEffect Hook

  useEffect(() => {
    if (imageUrl) {
      const fetchData = async () => {
        const serverUrl = `/api/post/createpost`;
        const responseData = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("Login_Token"),
          },
          body: JSON.stringify({ title, body, photo: imageUrl }),
        });
        const postDetails = await responseData.json();
        console.log("postDetails-->", postDetails);
        if (postDetails.success) {
          navigate("/");
        }
      };
      fetchData();
    }
  }, [imageUrl]);

  const postDetails = async () => {
    // **  From <input type="file" /> input element, Files can be uploaded using FormData() and fetch(). ** \\
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "insta-clone");
    formData.append("cloud_name", "daqedg8xh");
    const url = "https://api.cloudinary.com/v1_1/daqedg8xh/image/upload";
    const response = await fetch(url, {
      method: "PUT",
      body: formData,
    });
    const imageUploadDetails = await response.json();
    setImageUrl(imageUploadDetails.url);
    console.log("imageUploadDetails-->", imageUploadDetails);
  };
 
  return (
    <div
      className="card"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div className="input-group flex-nowrap">
        <span className="input-group-text">Title</span>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-group flex-nowrap">
        <span className="input-group-text">Body</span>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button
        className="d-flex justify-content btn btn-success"
        onClick={() => postDetails()}
      >
        Post
      </button>
    </div>
  );
}

export default Createpost;
