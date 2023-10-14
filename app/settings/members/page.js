"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminMembersTable } from "../../components/Table/Table.js";
import AddItemNav from "../../components/AddItemNav/AddItemNav.js";
import { ModalComponent } from "@/app/components/Modal/Modal.js";

export default function MembersPage() {
  const [mergedData, setMergedData] = useState([]);
  const [error, setError] = useState("");
  const [dataLoader, setDataLoader] = useState(false);
  const [modalEvent, setModalEvent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const { data: session, status } = useSession();
  const [firstLoading, setFirstLoading] = useState(true);

  const handleShowFn = () => setShowModal(true);

  const handleCloseFn = () => {
    setShowModal(false);
    setError("");
  };

  const fetchMembers = async () => {
    const getData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users`,
      getData
    );
    const users = await res.json();
    setFirstLoading(false);
    return users;
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
    return reports;
  };

  const mergeData = async () => {
    const users = await fetchMembers();
    const reports = await fetchReports();

    const filteredUsers = users.filter((user) => user.role === "teenager");

    const updatedUsers = filteredUsers.map((user) => {
      const minor = users.find((u) => u.user_id === user.owner_id);
      const matchingReports = reports.filter(
        (report) => report.teenager_id === user.user_id
      );
      const totalPoints = matchingReports.reduce((total, report) => {
        if (report.help_grade == 0) {
          return total + report.involvement_grade;
        } else {
          return total + report.involvement_grade + 5;
        }
      }, 0);
      return {
        ...user,
        totalPoints: totalPoints,
        totalEvents: matchingReports.length,
        minorName: minor.name,
      };
    });

    setMergedData(updatedUsers);
  };

  const setUserIdFn = (id) => {
    setUserId(id);
  };

  useEffect(() => {
    if (status !== "loading") {
      mergeData();
    }
  }, [status]);

  return (
    <div>
      <AddItemNav PageTitle="Участники" />
      <AdminMembersTable
        data={mergedData}
        handleShowFn={handleShowFn}
        setModalEvent={setModalEvent}
        setUserIdFn={setUserIdFn}
        firstLoading={firstLoading}
      />
      <ModalComponent
        handleCloseFn={handleCloseFn}
        show={showModal}
        setError={setError}
        error={error}
        modalEvent={modalEvent}
        dataLoader={dataLoader}
        users={mergedData}
        currentUser={userId}
      />
    </div>
  );
}
