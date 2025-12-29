import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import "../../styles/owner/DormCard.css";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const DormCard = ({ dorm, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  if (!dorm) return null;

  // Backend already returns images as Base64 array
  const images = dorm.images || [];

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${dorm.name}"?`)) {
      try {
        await axios.delete(`/dorms/${dorm.id}`);
        onDelete(dorm.id); // remove from frontend
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      {/* Dorm Card */}
      <div className="dorm-card">
        {images.length > 0 && (
          <img
            src={`data:image/jpeg;base64,${images[0]}`}
            alt={dorm.name}
            className="dorm-card-img"
          />
        )}

        <div className="dorm-card-body">
          <h5 className="dorm-card-title">{dorm.name}</h5>
          <p className="dorm-card-price">${dorm.price}</p>

          <div className="dorm-card-actions">
            <Button className="dorm-card-btn" onClick={handleShow}>
              View Details
            </Button>

            <FaTrash
              className="dorm-card-delete"
              title="Delete Dorm"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#4A5328", color: "#fff" }}
        >
          <Modal.Title>{dorm.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {images.length > 0 && (
            <Carousel>
              {images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100 carousel-img"
                    src={`data:image/jpeg;base64,${img}`}
                    alt={`Dorm ${idx + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}

          <div className="dorm-details mt-3">
            <p><strong>Location:</strong> {dorm.city}</p>
            <p><strong>University:</strong> {dorm.university}</p>
            <p><strong>Feature:</strong> {dorm.feature1}</p>
            <p><strong>Feature:</strong> {dorm.feature2}</p>
            <p><strong>Feature:</strong> {dorm.feature3}</p>
            <p>
              <strong>Distance to University:</strong>{" "}
              {dorm.distance_to_university} min
            </p>
            <p><strong>Phone:</strong> {dorm.telephone}</p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button className="close-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DormCard;
