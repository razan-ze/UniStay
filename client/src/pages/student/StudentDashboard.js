import React, { useEffect, useState } from "react";
import { NavbarStudent } from "../../components/navbar/NavbarStudent.js";
import { DormCard } from "../../components/students/DormCard.js";
import { Footer } from "../../components/Footer";
import "../../styles/students/Sdashboard.css";
import SearchBar from "../../components/students/SearchBar.js";
import axios from "axios";

export const StudentDashboard = () => {
  const [dorms, setDorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const res = await axios.get("/dorms");
        setDorms(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dorms");
      } finally {
        setLoading(false);
      }
    };

    fetchDorms();
  }, []);

  return (
    <div className="student-dashboard-page">
      <NavbarStudent />

      <div className="search-container">
        <SearchBar />
      </div>

      <div className="container mt-5">
        <div className="row">
          {loading ? (
            <p>Loading dorms...</p>
          ) : error ? (
            <p>{error}</p>
          ) : dorms.length === 0 ? (
            <p>No dorms found.</p>
          ) : (
            dorms.map((dorm) => (
              <div className="col-md-4 mb-5" key={dorm.id}>
                <DormCard dorm={dorm} />
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
