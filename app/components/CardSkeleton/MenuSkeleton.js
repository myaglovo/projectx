"use client";
import Card from "react-bootstrap/Card";
import React from "react";
import Placeholder from "react-bootstrap/Placeholder";

const MenuSkeleton = () => {
  return (
    <Placeholder as={Card.Title} animation="glow" className="mb-5 row gap-3">
      <Placeholder xs={1} style={{ height: "28px" }} />
      <Placeholder xs={1} style={{ height: "28px" }} />
      <Placeholder xs={1} style={{ height: "28px" }} />
      <Placeholder xs={1} style={{ height: "28px" }} />
    </Placeholder>
  );
};

export default MenuSkeleton;
