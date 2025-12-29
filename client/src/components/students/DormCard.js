import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/students/Card.css';
import { useDormsStudents } from "../../context/students/DormContext.js";
import { useNavigate } from "react-router-dom";

export const DormCard = ({ dorm }) => {
  const { setSelectedDorm } = useDormsStudents();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!dorm) return;
    setSelectedDorm(dorm);
    navigate(`/dorm-details/${dorm.id}`);
  };

  return (
    <div
      className="card shadow-sm rounded-4 overflow-hidden"
      style={{ cursor: "pointer" }}
    >
      <div
        id={`carousel-${dorm.id}`}
        className="carousel slide"
        data-bs-ride="carousel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="carousel-inner">
          {dorm.images && dorm.images.length > 0 ? (
            dorm.images.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={`data:image/jpeg;base64,${img}`}
                  className="d-block w-100"
                  alt={dorm.name}
                />
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <img
                src="/placeholder.png"
                className="d-block w-100"
                alt=""
              />
            </div>
          )}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#carousel-${dorm.id}`}
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#carousel-${dorm.id}`}
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      <div className="card-body text-center">
        <h5 className="card-title">{dorm.name}</h5>
        <p className="card-text text-muted mb-1">
          {dorm.university} • {dorm.city}
        </p>
        <p className="card-text text-success">{dorm.price}</p>

        <button className="btn-view-details mt-2" onClick={handleNavigate}>
          View Details
        </button>
      </div>
    </div>
  );
};
