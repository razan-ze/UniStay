import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; 
import "../../../styles/owner/ViewProfile.css";

const ViewProfile = () => {
  const { user } = useAuth(); // use context directly
  const navigate = useNavigate();

  if (!user) return <p>Loading...</p>; // or redirect if not logged in

  return (
    <div className="view-profile-page">
      {/* Back Arrow */}
      <div className="back-arrow" onClick={() => navigate("/student-dashboard")}>
        <FaArrowLeft size={24} /> Back
      </div>

      <h2 className="profile-title">My Profile</h2>

      <div className="view-profile-container">
        <div className="form-group">
          <label>Username</label>
          <input className="profile-input" type="text" value={user.username} readOnly />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input className="profile-input" type="text" value={user.address} readOnly />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input className="profile-input" type="text" value={user.phone} readOnly />
        </div>

        <button
          className="btn-edit-profile"
          onClick={() => navigate("/editstudentprofile")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;