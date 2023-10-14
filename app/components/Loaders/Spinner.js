import React from "react";
import Spinner from "react-bootstrap/Spinner";

const SpinnerComponent = ({ color }) => {
  return <Spinner animation="border" variant={color} />;
};

export default SpinnerComponent;
