import React, { useEffect, useState } from "react";
import NavbarOwner from "../../components/navbar/NavbarOwner";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import "../../styles/owner/AddDormbtn.css";
import "../../styles/owner/OwnerDashboard.css";
import DormCard from "../../components/owner/DormCard";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [dorms, setDorms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchDorms = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/dorms/owner/${user.id}`
        );
        setDorms(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDorms();
  }, [user]);

  return (
    <div className="owner-dashboard-page">
      <NavbarOwner />

      <div className="container mt-4">
        <Link to="/add-dorm-form" className="add-dorm-btn">
          Add Dorm
        </Link>
      </div>

      <div className="container mt-4">
        <h2 className="dashboard-title">Available Dorms</h2>

        {loading ? (
          <p>Loading...</p>
        ) : dorms.length > 0 ? (
          <div className="d-flex flex-wrap gap-3">
            {dorms.map((dorm) => (
              <DormCard
                key={dorm.id}
                dorm={dorm}
                onDelete={(id) =>
                  setDorms((prev) => prev.filter((d) => d.id !== id))
                }
              />
            ))}
          </div>
        ) : (
          <p className="no-dorms">No dorms available.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OwnerDashboard;