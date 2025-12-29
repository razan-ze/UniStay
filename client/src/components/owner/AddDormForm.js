import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/owner/AddDormForm.css";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AddDormForm = () => {
  const navigate = useNavigate();
const { user } = useAuth();
  // Dorm text fields state
  const [dormData, setDormData] = useState({
    name: "",
    university: "",
    city: "",
    price: "",
    feature1: "",
    feature2: "",
    feature3: "",
    distance_to_university: "",
    telephone: "",
  });

  // Files and previews
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image input
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Append new files to existing ones
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    // Create previews for display
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
  };



  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to add this dorm?")) return;
    console.log("Owner ID being sent:", user?.id);
    try {
      const formData = new FormData();

      formData.append("name", dormData.name);
      formData.append("university", dormData.university);
      formData.append("city", dormData.city);
      formData.append("price", dormData.price);
      formData.append("feature1", dormData.feature1);
      formData.append("feature2", dormData.feature2);
      formData.append("feature3", dormData.feature3);
      formData.append("distance_to_university", dormData.distance_to_university);
      formData.append("telephone", dormData.telephone);

     formData.append("owner_id", user.id);

      // Append images
      files.forEach((file) => formData.append("images", file));

      await axios.post("/addDorm", formData);

      alert("Dorm added successfully!");
      navigate("/owner-dashboard");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="add-dorm-page">
      <div className="add-dorm-form-container container mt-4">
        <h2>Add Dorm</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Dorm Name</label>
            <input
              type="text"
              name="name"
              className="form-control add-dorm-input"
              value={dormData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>City</label>
            <input
              type="text"
              name="city"
              className="form-control add-dorm-input"
              value={dormData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control add-dorm-input"
              value={dormData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>University</label>
            <input
              type="text"
              name="university"
              className="form-control add-dorm-input"
              value={dormData.university}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row mb-3 g-2">
            <div className="col-md-2 col-6">
              <label>Feature 1</label>
              <input
                type="text"
                name="feature1"
                className="form-control form-control-sm add-dorm-input-sm"
                value={dormData.feature1}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2 col-6">
              <label>Feature 2</label>
              <input
                type="text"
                name="feature2"
                className="form-control form-control-sm add-dorm-input-sm"
                value={dormData.feature2}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2 col-6">
              <label>Feature 3</label>
              <input
                type="text"
                name="feature3"
                className="form-control form-control-sm add-dorm-input-sm"
                value={dormData.feature3}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 col-12">
              <label>Distance to University (min)</label>
              <input
                type="number"
                name="distance_to_university"
                className="form-control form-control-sm add-dorm-input-sm"
                value={dormData.distance_to_university}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label>Phone Number</label>
            <input
              type="tel"
              name="telephone"
              className="form-control add-dorm-input-phone"
              value={dormData.telephone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="form-control"
              required
            />
            {previews.length > 0 && (
              <div className="image-preview d-flex flex-wrap gap-2 mt-2">
                {previews.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Dorm ${idx + 1}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-success">
            Confirm
          </button>

          {error && <p style={{ color: "red" }}>Something went wrong</p>}
        </form>
      </div>

      <ArrowLeft
        size={28}
        onClick={() => navigate("/owner-dashboard")}
        className="back-arrow"
      />
    </div>
  );
};

export default AddDormForm;