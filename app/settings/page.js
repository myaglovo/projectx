"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSession } from "next-auth/react";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { useState, useEffect } from "react";

const UsersLink = { title: "Пользователи", href: "users" };
const EventsLink = { title: "Мероприятия", href: "events" };
const ReporsLink = { title: "Отчёты", href: "reports" };
const MembersLink = { title: "Участники", href: "members" };

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [selectedComponents, setSelectedComponents] = useState([]);

  const componentsByRole = {
    organizer: [UsersLink, EventsLink, ReporsLink, MembersLink],
    coordinator: [UsersLink, EventsLink, ReporsLink, MembersLink],
    curator: [EventsLink],
    executor: [EventsLink],
    minor: [ReporsLink],
    teenager: [],
  };

  useEffect(() => {
    setSelectedComponents(componentsByRole[session?.user?.role]);
  }, [status]);

  return (
    <div>
      <h1 className="text-center mt-5 mb-4">Выберите раздел</h1>
      <div className="row px-2 justify-content-center">
        {selectedComponents &&
          selectedComponents.map((Component, index) => (
            <Card
              key={index}
              className="col-lg-4 col-md-6 col-sm-12 m-2 flex-shrink-1 overflow-hidden"
            >
              <Card.Header>{Component.title}</Card.Header>
              <Card.Body>
                <Link href={`/settings/${Component.href}`}>Перейти</Link>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
}
