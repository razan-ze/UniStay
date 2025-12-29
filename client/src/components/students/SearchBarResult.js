import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavbarStudent } from "../../components/navbar/NavbarStudent";
import SearchBar from "./../students/SearchBar";
import { Footer } from "./../Footer";
import axios from "axios";
import "../../styles/students/SearchResults.css";

export const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(
    new URLSearchParams(location.search).get("query") || ""
  );
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Track URL query changes
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query") || "";
    setSearchQuery(query);

    if (query.trim() === "") {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/dorms/search?q=${encodeURIComponent(query)}`
        );
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setResults([]);
      }
      setLoading(false);
    };

    fetchResults();
  }, [location.search]);

  return (
    <div className="search-results-page">
      <NavbarStudent />

      <div className="search-header">
        <h2>Search Results for "{searchQuery}"</h2>
        <button
          className="btn-back"
          onClick={() => navigate("/student-dashboard")}
        >
          ← Go Back
        </button>
        <div className="search-bar-container">
          <SearchBar />
        </div>
      </div>

      {loading ? (
        <p style={{ marginTop: "50px" }}>Loading results...</p>
      ) : results.length === 0 ? (
        <p style={{ marginTop: "50px" }}>No results found.</p>
      ) : (
        <div className="results-grid">
          {results.map((dorm) => (
            <div
              key={dorm.id}
              className="dorm-card"
              onClick={() => navigate(`/dorm-details/${dorm.id}`)}
            >
              <img
                src={dorm.images && dorm.images.length > 0 ? dorm.images[0] : "/no-image.png"}
                alt={dorm.name}
                className="dorm-card-img"
              />
              <h3>{dorm.name}</h3>
              <p><strong>City:</strong> {dorm.city}</p>
              <p><strong>Price:</strong> {dorm.price}</p>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};
