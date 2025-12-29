import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRole } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form refresh

    try {
      // Wait for login to complete
      const success = await login(username, password, role);

      if (success) {
        // Check role
        if (role === "student") {
          alert(`Welcome, ${username}!`);
          navigate("/student-dashboard");
        } else if (role === "owner") {
          alert(`Welcome, ${username}!`);
          navigate("/owner-dashboard");
        } else {
          alert("You do not have an account with this role.");
        }
      } else {
        alert("Invalid username, password, or role.");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
  };

  const handleBack = () => {
    if (role === "student") navigate("/student-dashboard");
    else navigate("/");
  };

  return (
    <div className="login-page-container">
      <div className="login-main-box">
        <ArrowLeft size={28} className="login-back-arrow" onClick={handleBack} />

        {/* LEFT SIDE */}
        <div className="login-left">
          <h2 className="login-title">Sign In</h2>
          <p className="text-muted mb-4">Use your email and password to Sign In</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control login-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              className="form-control login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn login-btn">
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-muted">
            Don’t have an account?{" "}
            <span className="signup-link" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <h2 className="fw-bold mb-3">Hello, Friend!</h2>
          <p className="mb-4 login-right-text">
            Register with your personal details to explore all our features.
          </p>

          <button className="btn login-right-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;