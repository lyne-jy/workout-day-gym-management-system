import React from "react";
import { Button, Modal } from "react-bootstrap";

const CancelAppointmentConfirm = ({ ifVisible, onClose, onConfirmDelete }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this appointment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onConfirmDelete}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CancelAppointmentConfirm;
