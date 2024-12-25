import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    // Validate password
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ email, password });
      navigate("/main"); // Navigate to MainPage on successful login
    }
  };

  return (
    <>
      <div>
        <div className="container-fluid-100">
          <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "red" }}>
            <div className="container-fluid d-flex justify-content-center">
              <a className="navbar-brand" href="#" style={{ color: "yellow" }}>
                iMovies - Your Destination to Find Movies
              </a>
            </div>
          </nav>
        </div>

        <div className="d-flex justify-content-center align-items-center" style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit} style={{ maxWidth: "350px", width: "100%" }}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="emailHelp"
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <p className="text-center">
              <Link to="/signup" className="text-decoration-none">
                Dont have an account? Sign up
              </Link>
            </p>
            <p className="text-center">
              <Link to="/Reset" className="text-decoration-none">
                Forgot Password?
              </Link>
            </p>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
