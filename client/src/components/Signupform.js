import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRole } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SignupForm.css"; 


function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { signup } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await signup(username, password, role, address, phone);

      if (success) {
        alert(`Account created successfully as ${role}!`);

        if (role === "student") navigate("/student-dashboard");
        else navigate("/owner-dashboard");
      } else {
        alert("Username already exists!");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Please try again.");
    }
  };


  const handleBack = () => {
    if (role === "student") navigate("/student-dashboard");
    else navigate("/");
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container shadow-lg rounded-5 overflow-hidden position-relative">
        {/* Back Button */}
        <ArrowLeft
          size={28}
          onClick={handleBack}
          className="back-arrow"
        />

        {/* Left Panel */}
        <div className="signup-left-panel">
          <h2 className="fw-bold mb-3">Welcome!</h2>
          <p className="mb-4">Enter your personal details to join us.</p>

          <button
            onClick={() => navigate("/login")}
            className="btn signup-left-btn"
          >
            Sign In
          </button>
        </div>

        {/* Right Panel */}
        <div className="signup-right-panel p-5 d-flex flex-column justify-content-center">
          <h2 className="fw-bold mb-3 signup-header">Create Account</h2>
          <p className="text-muted mb-4">Fill in your details to register</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-3 signup-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              className="form-control mb-3 signup-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="text"
              className="form-control mb-3 signup-input"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <input
              type="tel"
              className="form-control mb-3 signup-input"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn w-100 py-2 text-white rounded-3 shadow-sm signup-submit-btn"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-muted">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="signup-login-link"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;