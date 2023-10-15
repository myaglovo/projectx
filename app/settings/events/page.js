"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { AdminEventsTable } from "../../components/Table/Table.js";
import AddItemNav from "../../components/AddItemNav/AddItemNav.js";
import { ModalComponent } from "../../components/Modal/Modal";
import { useSession } from "next-auth/react";
import { sortByDate } from "@/utils/sortFn";

export default function EventsPage() {
  const { data: session, status } = useSession();
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState("");
  const [dataLoader, setDataLoader] = useState(false);
  const [modalEvent, setModalEvent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentEntityObject, setCurrentEntityObject] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [currentRole, setCurrentRole] = useState("");
  const [firstLoading, setFirstLoading] = useState(true);
  const [mergedData, setMergedData] = useState([]);

  const handleSubmitFn = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/events`, {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        mergeDataFn();
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEditFn = async (data, id) => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/events/${id}`, {
        method: "PUT",
        body: data,
      });

      if (res.ok) {
        mergeDataFn();
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowFn = () => setShowModal(true);

  const handleCloseFn = () => {
    setShowModal(false);
    setError("");
  };

  async function deleteEventFn(id) {
    if (!id) return;

    const deleteData = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/events`,
      deleteData
    );

    const { message } = await res.json();
    if (message === "deleted") {
      const updatedEvents = eventData.filter((event) => event.event_id !== id);
      setMergedData(updatedEvents);
    }
  }

  async function getUsers() {
    const usersData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    };
    const res = await await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users`,
      usersData
    );
    const users = await res.json();
    setUsers(users);
    return users;
  }

  const fetchUserInfo = async (id) => {
    setDataLoader(true);
    try {
      const userData = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const res = await await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/users/${id}`,
        userData
      );
      const { currentUser } = await res.json();
      setCurrentUser(currentUser);
    } catch (error) {
      console.error(error);
    } finally {
      setDataLoader(false);
    }
  };

  const fetchEventInfo = async (id) => {
    setDataLoader(true);
    try {
      const data = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const res = await await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/events/${id}`,
        data
      );
      const { currentEvent } = await res.json();
      setCurrentEntityObject(currentEvent);
    } catch (error) {
      console.error(error);
    } finally {
      setDataLoader(false);
    }
  };

  async function getEvents() {
    const getData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    };
    const res = await await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/events`,
      getData
    );
    let events = await res.json();

    if (session.user.role === "executor") {
      events = events.filter(
        (event) => event.event_executor_id == session.user.id
      );
    }

    if (session.user.role === "curator") {
      events = events.filter(
        (event) => event.event_curator_id === session.user.id
      );
    }

    const sortedEvents = sortByDate(events, "desc");
    setEventData(sortedEvents);
    setFirstLoading(false);
    return sortedEvents;
  }

  const mergeDataFn = () => {
    const promiseEvents = getEvents();
    const promiseUsers = getUsers();
    Promise.all([promiseEvents, promiseUsers])
      .then(([events, users]) => {
        const enrichData = events.map((event) => {
          const curatorData = users.find(
            (user) => event.event_curator_id === user.user_id
          );
          const executorData = users.find(
            (user) => event.event_executor_id === user.user_id
          );
          return { ...event, curatorData, executorData };
        });
        setMergedData(enrichData);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };

  useEffect(() => {
    if (status === "authenticated") {
      setCurrentRole(session?.user?.role);
      mergeDataFn();
    }
  }, [status]);

  return (
    <div>
      <AddItemNav
        PageTitle="Мероприятия"
        handleShowFn={handleShowFn}
        setModalEvent={setModalEvent}
        eventName="addEvent"
        getUsers={getUsers}
        fetchUserInfo={fetchUserInfo}
        currentRole={currentRole}
      />
      <AdminEventsTable
        data={mergedData}
        deleteEventFn={deleteEventFn}
        setModalEvent={setModalEvent}
        handleShowFn={handleShowFn}
        currentRole={currentRole}
        fetchEventInfo={fetchEventInfo}
        firstLoading={firstLoading}
      />
      <ModalComponent
        handleSubmitFn={handleSubmitFn}
        handleSubmitEditFn={handleSubmitEditFn}
        handleCloseFn={handleCloseFn}
        show={showModal}
        error={error}
        currentEntityObject={currentEntityObject}
        modalEvent={modalEvent}
        dataLoader={dataLoader}
        users={users}
        currentUser={currentUser}
        currentRole={currentRole}
        data={mergedData}
      />
    </div>
  );
}
