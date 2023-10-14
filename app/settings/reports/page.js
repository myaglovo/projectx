"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddItemNav from "../../components/AddItemNav/AddItemNav.js";
import { AdminReportsTable } from "../../components/Table/Table.js";
import { ModalComponent } from "@/app/components/Modal/Modal.js";
import { useSession } from "next-auth/react";
import { sortByDate } from "@/utils/sortFn";

export default function ReportsPage() {
  const { data: session, status } = useSession();
  const [reportsData, setReportsData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [users, setUsers] = useState([]);
  const [teenagerEvents, setTeenagerEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentEntityObject, setCurrentEntityObject] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalEvent, setModalEvent] = useState("");
  const [error, setError] = useState("");
  const [dataLoader, setDataLoader] = useState(false);
  const [currentRole, setCurrentRole] = useState("");
  const [firstLoading, setFirstLoading] = useState(true);
  const [systemUserId, setSystemUserId] = useState("");

  const handleShowFn = () => setShowModal(true);

  const handleSubmitFn = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (res.ok) {
        fetchReports();
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEditFn = async (data, id) => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reports/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (res.ok) {
        fetchReports();
        setShowModal(false);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      `${process.env.NEXT_PUBLIC_URL}/api/reports`,
      deleteData
    );

    const { message } = await res.json();
    if (message === "deleted") {
      const updatedReports = reportsData.filter((report) => report.id !== id);
      setReportsData(updatedReports);
    }
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

  const fetchReportInfo = async (id) => {
    setDataLoader(true);
    try {
      const userData = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const res = await await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/reports/${id}`,
        userData
      );
      const { currentReport } = await res.json();
      setCurrentEntityObject(currentReport);
    } catch (error) {
      console.error(error);
    } finally {
      setDataLoader(false);
    }
  };

  const fetchReports = async () => {
    const getData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/reports`,
      getData
    );
    const reports = await res.json();
    const sortedReports = sortByDate(reports, "desc");

    if (session.user.role === "minor") {
      const filteredReportsByMinorId = sortedReports.filter(
        (report) => report.mentor_id === session.user.id
      );
      setReportsData(filteredReportsByMinorId);
    } else {
      setReportsData(sortedReports);
    }
    setFirstLoading(false);
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

  async function fetchTeenagerEvents() {
    const usersData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    };
    const res = await await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/teenagerEvents`,
      usersData
    );
    const teenagerEventsData = await res.json();
    setTeenagerEvents(teenagerEventsData);
  }

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

    setEventData(events);
  }

  useEffect(() => {
    if (status === "authenticated") {
      setCurrentRole(session.user.role);
      setSystemUserId(session.user.id);
      fetchReports();
      getUsers();
      getEvents();
      fetchTeenagerEvents();
    }
  }, [status]);

  return (
    <div>
      <AddItemNav
        PageTitle="Отчёты"
        eventName="addReport"
        handleShowFn={handleShowFn}
        setModalEvent={setModalEvent}
        fetchUserInfo={fetchUserInfo}
        currentRole={currentRole}
      />
      <AdminReportsTable
        eventName="editReport"
        data={reportsData}
        deleteEventFn={deleteEventFn}
        setModalEvent={setModalEvent}
        additionalData={{ users, eventData }}
        fetchEventInfo={fetchReportInfo}
        handleShowFn={handleShowFn}
        fetchUserInfo={fetchUserInfo}
        firstLoading={firstLoading}
        currentRole={currentRole}
        currentUser={currentUser}
      />
      <ModalComponent
        handleSubmitFn={handleSubmitFn}
        handleSubmitEditFn={handleSubmitEditFn}
        handleCloseFn={handleCloseFn}
        show={showModal}
        error={error}
        modalEvent={modalEvent}
        dataLoader={dataLoader}
        reportsData={reportsData}
        eventData={eventData}
        users={users}
        currentUser={currentUser}
        teenagerEvents={teenagerEvents}
        currentEntityObject={currentEntityObject}
        currentRole={currentRole}
      />
    </div>
  );
}
