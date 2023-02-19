import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Signup() {
  const [sigInDetails, setSignInDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    let { name, email, password } = sigInDetails;
    e.preventDefault();

    // ** Uploading JSON data ** \\
    const url = `/api/auth/register`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const details = await response.json();
    console.log("Signup-->",details);
    if (details.success) {
      //localStorage.setItem("Signin_Token", details.jwtAuthToken);
      navigate("/login");
    }
    // Need a pop up message in else block
   };

  const handleChange = (e) => {
    setSignInDetails({ ...sigInDetails, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
    <h1 className="text-center">Sign In..</h1>
    <div className="card my-3">
    <form  onSubmit={handleSubmit}>
      <div className="my-4 mx-2">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="name"
          onChange={handleChange}
        />
      </div>
      <div className="my-4 mx-2">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="email"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 mx-2">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="d-flex justify-content-end btn btn-warning mx-3 mb-2">
        Register
      </button>
    </form>
    <h5>
      <Link to="/login">Already have an account</Link>
    </h5>
    </div>
  </div>
  )
}

export default Signup