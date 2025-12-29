import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavbarStudent } from "../../components/navbar/NavbarStudent.js";
import { Footer } from "../../components/Footer.js";
import { useDormsStudents } from "../../context/students/DormContext.js";
import { useAuth } from "../../context/AuthContext.js";
import axios from "axios";
import "../../styles/students/DormDetails.css";

export const DormDetails = () => {
  const { favorites, toggleFavorite } = useDormsStudents();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [dorm, setDorm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllImages, setShowAllImages] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Fetch dorm data
  useEffect(() => {
    const fetchDorm = async () => {
      try {
        const res = await axios.get(`/dorm/${id}`);
        if (res.data) {
          const imagesWithPrefix = res.data.images
            .filter(img => img)
            .map(img => `data:image/jpeg;base64,${img}`);
          setDorm({ ...res.data, images: imagesWithPrefix });
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchDorm();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!dorm) return <p>Dorm not found.</p>;

  const displayedImages = showAllImages ? dorm.images : dorm.images.slice(0, 3);
  const isFavorite = favorites.some(f => f.id === dorm.id);

  //  Add to favorite only if logged in
  const handleFavorite = async () => {
    if (!user) {
      alert("You must be logged in to add favorites!");
      navigate("/login");
      return;
    }

    try {
      await axios.post("/addFavorite", {
        user_id: user.id,
        dorm_id: dorm.id,
      });
      toggleFavorite(dorm); // update context
    } catch (err) {
      console.error("Failed to add favorite:", err);
    }
  };

  return (
    <div className="dorm-details-page">
      <NavbarStudent />

      <div className="back-btn" onClick={() => navigate("/student-dashboard")}>
        ← Back
      </div>

      <div className="dorm-images-grid">
        {displayedImages.map((img, idx) => (
          <div
            key={idx}
            className="dorm-img-wrapper"
            onClick={() => { setPhotoIndex(idx); setLightboxOpen(true); }}
          >
            <img src={img} alt={`${dorm.name} ${idx + 1}`} className="dorm-grid-img" />
          </div>
        ))}
      </div>

      {dorm.images.length > 3 && (
        <div className="text-center my-3">
          <button className="btn-show-more" onClick={() => setShowAllImages(!showAllImages)}>
            {showAllImages ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      <div className="dorm-info">
        <h2>{dorm.name}</h2>
        <div className="info-column">
          <p><strong>City:</strong> {dorm.city}</p>
          <p><strong>Price:</strong> {dorm.price}</p>
          <p><strong>University:</strong> {dorm.university}</p>
          <p><strong>Phone:</strong> {dorm.telephone}</p>
          <p><strong>Distance to university (min):</strong> {dorm.distance_to_university}</p>
        </div>

        <h3>Features</h3>
        <div className="features-container">
          {dorm.feature1 && <button className="feature-item">{dorm.feature1}</button>}
          {dorm.feature2 && <button className="feature-item">{dorm.feature2}</button>}
          {dorm.feature3 && <button className="feature-item">{dorm.feature3}</button>}
        </div>
      </div>

      <button className="btn-favorite" onClick={handleFavorite}>
        {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
      </button>

      <Footer />

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <img src={dorm.images[photoIndex]} alt={`Lightbox ${photoIndex + 1}`} className="lightbox-img" />
          <button
            className="lightbox-prev"
            onClick={e => { e.stopPropagation(); setPhotoIndex((photoIndex - 1 + dorm.images.length) % dorm.images.length); }}
          >‹</button>
          <button
            className="lightbox-next"
            onClick={e => { e.stopPropagation(); setPhotoIndex((photoIndex + 1) % dorm.images.length); }}
          >›</button>
          <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>✕</button>
        </div>
      )}
    </div>
  );
};
