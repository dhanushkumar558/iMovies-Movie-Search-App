import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!name) newErrors.name = "Name is required";

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    // Validate password
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";

    // Validate dob
    if (!dob) newErrors.dob = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ name, email, password, dob });
      // Proceed with form submission (e.g., send data to API)
    }
  };

  return (
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

      <div className="d-flex justify-content-center align-items-center " style={{ fontSize: "0.875rem" }}>
        <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "350px", padding: "20px" }}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label" style={{ fontSize: "0.9rem" }}>Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontSize: "0.875rem", padding: "0.375rem 0.75rem" }}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label" style={{ fontSize: "0.9rem" }}>Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ fontSize: "0.875rem", padding: "0.375rem 0.75rem" }}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label" style={{ fontSize: "0.9rem" }}>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ fontSize: "0.875rem", padding: "0.375rem 0.75rem" }}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="dob" className="form-label" style={{ fontSize: "0.9rem" }}>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={{ fontSize: "0.875rem", padding: "0.375rem 0.75rem" }}
            />
            {errors.dob && <div className="text-danger">{errors.dob}</div>}
          </div>

          <p className="text-center" style={{ fontSize: "0.875rem" }}>
            <Link to="/" className="text-decoration-none">Back to Login</Link>
          </p>

          <button type="submit" className="btn btn-primary w-100" style={{ padding: "0.5rem" }}>Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
