import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarStudent } from "../../components/navbar/NavbarStudent";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "../../styles/students/Favorite.css";

export const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `/favorites/${user.id}`
        );
        setFavorites(res.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, [user]);

  // ================= NOT LOGGED IN =================
  if (!user) {
    return (
      <>
        <NavbarStudent />
        <div className="favorites-page empty">
          <h2>You must be logged in to see favorites 😔</h2>
          <button onClick={() => navigate("/login")} className="btn-back">
            → Login
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // ================= EMPTY FAVORITES =================
  if (favorites.length === 0) {
    return (
      <>
        <NavbarStudent />
        <div className="favorites-page empty">
          <h2>Your Favorites is Empty 😔</h2>
          <button
            onClick={() => navigate("/student-dashboard")}
            className="btn-back"
          >
            ← Go Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // ================= FAVORITES LIST =================
  return (
    <div className="favorites-container">
      <NavbarStudent />

      <div className="favorites-page">
        <div className="favorites-header">
          <h2>My Favorites</h2>
          <button
            onClick={() => navigate("/student-dashboard")}
            className="btn-back"
          >
            ← Go Back
          </button>
        </div>

        <div className="favorites-grid">
          {favorites.map((dorm) => (
            <div key={dorm.id} className="favorite-card">
              <img
                src={
                  dorm.images && dorm.images.length > 0
                    ? dorm.images[0]
                    : "/no-image.png"
                }
                alt={dorm.name}
                className="favorite-img"
                onClick={() =>
                  navigate(`/dorm-details/${dorm.id}`)
                }
              />

              <h3>{dorm.name}</h3>
              <p>
                <strong>City:</strong> {dorm.city}
              </p>
              <p>
                <strong>Price:</strong> {dorm.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
