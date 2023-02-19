import "./App.css";
import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navitem/Navbar";
import Home from "./Component/Home/Home";
import Createpost from "./Component/Createpost";
import About from "./Component/About";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Profile from "./Component/Profile/Profile";
import Userprofiles from "./Component/Userprofiles";
import InstaProvider from "./Hook/Context/Instacontext";
import { InstaDispatchContext } from "./Hook/Context/Instacontext";
import ServerProvider from "./Hook/Context/Servercontext";
const Routing = () => {
  const navigate = useNavigate();
  const dispatch = useContext(InstaDispatchContext);

  // When react application start , at first App.js run. So useEffect ran only for once rendering. As a result it will check if there are logged-user
  // or not .If present then it update user state by dispatch & further process is follows.
  useEffect(() => {
    const logged_user = JSON.parse(localStorage.getItem("LoggedUser"));
    if (logged_user) {
      dispatch({ type: "USER", payload: logged_user }); // this line is helping us in Navbar styling. & update the userState by provide logged-user details
      //navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/about"  element={<About />} />
      <Route path="/createpost"  element={<Createpost />} />
      <Route path="/login"  element={<Login />} />
      <Route path="/signin"  element={<Signup />} />
      <Route path="/profile"  element={<Profile />} />
      <Route exact path="/profile/:userid"  element={<Userprofiles />} />
    </Routes>
  );
};

function App() {
  return (
    <InstaProvider>
      <ServerProvider>
        <div>
          <Navbar />
          <Routing />
        </div>
      </ServerProvider>
    </InstaProvider>
  );
}

export default App;

// ** NOTE ** :=> useNavigate cann't use outside the <BrowserRouter><App/></BrowserRouter>.So We put the routing staff(/home,/login,..) into another
//             :=> function and put it into <BrowserRouter><App/></BrowserRouter>
