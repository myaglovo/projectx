"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="centered-form">
      <Container className="text-center">
        <h1 className="mb-3 text-center">Упс... Страница не найдена</h1>
        <Link type="button" className="btn btn-primary" href="/">
          Перейти на главную
        </Link>
      </Container>
    </div>
  );
};

export default NotFound;
