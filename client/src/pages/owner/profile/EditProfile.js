import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../../styles/owner/ViewProfile.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const EditProfile = () => {
  const { user, setUser } = useAuth(); // no need for users array
  const navigate = useNavigate();

  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      // Send update to backend
      const res = await axios.put(`/users/${user.id}`, {
        address,
        phone,
      });

      // Update context with the new data
      setUser(res.data);

      // Navigate back to view profile
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-profile-page">
      {/* Back Arrow */}
      <div className="back-arrow" onClick={() => navigate("/profile")}>
        <FaArrowLeft size={24} /> Back
      </div>

      <h2 className="profile-title">Edit Profile</h2>

      <div className="view-profile-container">
        {/* Username (read-only) */}
        <div className="form-group">
          <label>Username</label>
          <input
            className="profile-input"
            type="text"
            value={user.username}
            readOnly
          />
        </div>

        {/* Address (editable) */}
        <div className="form-group">
          <label>Address</label>
          <input
            className="profile-input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Phone (editable) */}
        <div className="form-group">
          <label>Phone</label>
          <input
            className="profile-input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          className="btn-edit-profile"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;