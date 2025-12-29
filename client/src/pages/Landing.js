import React, { useEffect } from "react"; // React + useEffect hook
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import "../styles/Landing.css"; // Custom CSS
import DL1 from "../assets/DL1.webp"; // Hero background image
import DL2 from "../assets/Dorm1.jpg"; // About section image
import AOS from "aos"; // Animate on Scroll library
import "aos/dist/aos.css"; // AOS styles
import { Footer } from "../components/Footer";
import {useAuth} from "../context/AuthContext"

const Landing = () => {
  const { setRole } = useRole(); // Context function to set role
  const navigate = useNavigate();
const { logout } = useAuth();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Handle role selection
  const handleSelectRole = (selectedRole) => {
    logout(); // clear any previous session
    setRole(selectedRole); // Save role in context
    if (selectedRole === "owner") {
      // Owners must log in first
      navigate("/login");
    } else if (selectedRole === "student") {
      // Students can go straight to dashboard
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <section
        className="hero-section d-flex align-items-center justify-content-center text-center"
        style={{ backgroundImage: `url(${DL1})` }}

      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="display-4 fw-bold text-olive">Welcome to UniStay</h1>
          <p className="lead text-muted mt-3">
            Smart, safe, and stylish dorm living for university students.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              className="btn btn-olive px-4 py-2"
              onClick={() => handleSelectRole("student")}
            >
              I’m a Student
            </button>
            <button
              className="btn btn-beige-dark px-4 py-2"
              onClick={() => handleSelectRole("owner")}
            >
              I’m an Owner
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section container py-5">
        <div className="row align-items-center">
          <div
            className="col-md-6 text-center mb-4 mb-md-0"
            data-aos="fade-right"
          >
            <img
              src={DL2}
              alt="Dorm Room"
              className="img-fluid rounded-4 shadow about-img"
            />
          </div>
          <div className="col-md-6" data-aos="fade-left">
            <h2 className="fw-bold text-olive mb-3">About UniStay</h2>
            <p className="text-muted fs-5">
              UniStay is designed to help students easily find and rent
              high-quality dorm rooms near their universities. Owners can
              showcase and manage their rooms seamlessly. Smart dorm living made
              simple and stylish.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;