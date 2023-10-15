"use client";
import NavLink from "./NavLink";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import MenuSkeleton from "../CardSkeleton/MenuSkeleton";

const UsersLink = () => <NavLink text="Пользователи" href="users" />;
const EventsLink = () => <NavLink text="Мероприятия" href="events" />;
const ReporsLink = () => <NavLink text="Отчёты" href="reports" />;
const MembersLink = () => <NavLink text="Участники" href="members" />;

function NavMenu() {
  const { data: session, status } = useSession();
  const [selectedComponents, setSelectedComponents] = useState([]);
  const pathname = usePathname();

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

  if (status != "authenticated") return <MenuSkeleton />;

  return (
    <>
      {pathname !== "/settings" && (
        <div className="mb-5">
          <ul className="nav nav-underline">
            {selectedComponents &&
              selectedComponents.map((Component, index) => (
                <Component key={index} />
              ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default NavMenu;
