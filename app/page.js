"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Row className="justify-content-md-center text-center">
        <Col md={6}>
          <div className="text">
            <h1 className="mb-4 mt-4 fs-1 fw-semibold">
              Путь к Перемене: Вдохновляем Трудных Подростков
            </h1>
            <p className="mb-4">
              Наш проект предоставляет шанс трудным подросткам пересмотреть свои
              жизни и научиться новым навыкам через культурные, спортивные и
              образовательные мероприятия. Мы верим в силу положительных
              изменений и стремимся вдохновить молодых людей на путь к лучшей
              жизни.
            </p>
            <Link
              type="button"
              href="/events"
              className="btn btn-primary mb-4 px-3 py-3"
            >
              Смотреть календарь мероприятий
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
