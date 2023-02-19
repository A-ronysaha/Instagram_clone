import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InstaDispatchContext } from "../Hook/Context/Instacontext";

export default function Login() {
  const [logInDetails, setLogInDetails] = useState({
    email: "",
    password: "",
  });
  const dispatch = useContext(InstaDispatchContext)

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  let { email, password } = logInDetails;
    e.preventDefault();
    const url = `/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email,password}),
    });
    const loginDetails = await response.json();
    console.log("Login Details-->",loginDetails);
    if (loginDetails.success) {
      localStorage.setItem("Login_Token", loginDetails.jwtAuthToken);
      localStorage.setItem("LoggedUser",JSON.stringify(loginDetails.data.user))
      dispatch({type:"USER",payload:loginDetails.data.user })
      navigate("/");
    }
    // Need a pop up message in else block
  };

  const handleChange = (e) => {
    setLogInDetails({ ...logInDetails, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1 className="text-center">Log In..</h1>
      <div className="card my-3">
        <form onSubmit={handleSubmit}>
          <div className="my-4 mx-2">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="email"
              value={logInDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mx-2">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
              value={logInDetails.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="d-flex justify-content-end btn btn-info mx-3 mb-2"
          >
            Log In
          </button>
          <h5>
            <Link to="/signin">Don't have an account</Link>
          </h5>
        </form>
      </div>
    </div>
  );
}
