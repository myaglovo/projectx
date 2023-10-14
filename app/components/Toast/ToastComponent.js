import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Alert from "react-bootstrap/Alert";

function AlertComponent() {
  return (
    <Alert variant="success" className="fs-6 text lh-lg m-0">
      Вы записались на мероприятие!
    </Alert>
  );
}

function ToastComponent({ status, setToastStatus }) {
  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{ zIndex: 1, position: "fixed" }}
      onClose={() => setToastStatus(false)}
      show={status}
      delay={5000}
      autohide
    >
      <Toast
        onClose={() => setToastStatus(false)}
        show={status}
        delay={5000}
        autohide
      >
        <AlertComponent />
      </Toast>
    </ToastContainer>
  );
}

export default ToastComponent;
