"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardComponent from "../components/Card/Card";
import { ModalComponent } from "../components/Modal/Modal";
import { useSession } from "next-auth/react";
import { sortByDate } from "@/utils/sortFn";
import CardSkeleton from "../components/CardSkeleton/CardSkeleton";
import ToastComponent from "../components/Toast/ToastComponent";

export default function Calendar() {
  const [eventsData, setEventsData] = useState([]);
  const [registeredData, setRegisteredData] = useState([]);
  const [currentEntityObject, setCurrentEntityObject] = useState({});
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [dataLoader, setDataLoader] = useState(false);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [modalEvent, setModalEvent] = useState("");
  const { data: session, status } = useSession();
  const [toastStatus, setToastStatus] = useState(false);

  const fetchEvents = async () => {
    const getData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/events/date`,
      getData
    );
    const events = await res.json();
    const sortedEvents = sortByDate(events, "asc");
    setEventsData(sortedEvents);
    setCardsLoading(false);
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
  }

  const handleCloseFn = () => {
    setShowModal(false);
    setError("");
  };

  const fetchRegisteredData = async () => {
    const getData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/teenagerEvents`,
      getData
    );
    const events = await res.json();
    setRegisteredData(events);
  };

  const handleSubmitFn = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/teenagerEvents`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );

      if (res.ok) {
        fetchRegisteredData();
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePartisBtnClick = () => {
    setToastStatus(true);
  };

  useEffect(() => {
    if (status !== "loading") {
      getUsers();
      fetchEvents();
      fetchRegisteredData();
    }
  }, [status]);

  const skeletons = Array.from({ length: 6 }, (_, index) => (
    <CardSkeleton key={index} />
  ));

  const zeroState = (
    <div className="text-center text-secondary fs-5 text">
      Нет доступных мероприятий
    </div>
  );

  return (
    <div>
      <ToastComponent status={toastStatus} setToastStatus={setToastStatus} />
      <div className="mb-4 mt-5">
        <p>{process.env.NEXT_PUBLIC_URL}</p>
        <p>{process.env.NEXTAUTH_URL}</p>
        <h1 className="text-center mb-4">Календарь мероприятий</h1>
        <div className="row px-2 justify-content-center">
          {!eventsData.length && !cardsLoading && zeroState}
          {eventsData && !cardsLoading
            ? eventsData.map((event, index) => (
                <CardComponent
                  key={event.event_id}
                  image={event.event_image}
                  date={event.event_date}
                  group={event.event_group}
                  title={event.event_title}
                  id={event.event_id}
                  setShowModal={setShowModal}
                  setDataLoader={setDataLoader}
                  setModalEvent={setModalEvent}
                  fetchEventInfo={fetchEventInfo}
                />
              ))
            : skeletons}
          <ModalComponent
            show={showModal}
            error={error}
            dataLoader={dataLoader}
            handleCloseFn={handleCloseFn}
            modalEvent={modalEvent}
            currentEntityObject={currentEntityObject}
            handleSubmitFn={handleSubmitFn}
            users={users}
            currentUser={session?.user}
            registeredData={registeredData}
            handlePartisBtnClick={handlePartisBtnClick}
          />
        </div>
      </div>
    </div>
  );
}
