"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminUsersTable } from "../../components/Table/Table.js";
import AddItemNav from "../../components/AddItemNav/AddItemNav.js";
import { ModalComponent } from "../../components/Modal/Modal";
import { sortByDate } from "@/utils/sortFn";
import { useSession } from "next-auth/react";

export default function UsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [currentEntityObject, setCurrentEntityObject] = useState({});
  const [error, setError] = useState("");
  const [modalEvent, setModalEvent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  const [currentRole, setCurrentRole] = useState("");
  const [firstLoading, setFirstLoading] = useState(true);

  const handleCloseFn = () => {
    setShowModal(false);
    setError("");
  };

  const handleShowFn = () => setShowModal(true);

  const handleSubmitFn = async (data, teenagerData) => {
    try {
      const resUserExist = await fetch(
        `${process.env.NEXTAUTH_URL}/api/userExists`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );

      const result = await resUserExist.json();
      if (result.message === "exist" || result.message === "error") {
        setError("Пользователь с таким email уже существует");
        return;
      }

      if (teenagerData) {
        const res2UserExist = await fetch(
          `${process.env.NEXTAUTH_URL}/api/userExists`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: teenagerData }),
          }
        );
        const resultTeenager = await res2UserExist.json();

        if (
          resultTeenager.message === "exist" ||
          resultTeenager.message === "error"
        ) {
          setError("Пользователь с таким email уже существует");
          return;
        }
      }

      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (teenagerData) {
        const resTeenager = await fetch(
          `${process.env.NEXTAUTH_URL}/api/users`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: teenagerData }),
          }
        );

        if (res.ok && resTeenager?.ok) {
          getUsers();
          setShowModal(false);
          return;
        }
      }

      if (res.ok) {
        getUsers();
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEditFn = async (data, id) => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (res.ok) {
        getUsers();
        setShowModal(false);
        return;
      }
    } catch (error) {
      console.error(error);
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
    const sortedUsers = sortByDate(users, "desc");
    setUsers(sortedUsers);
    setFirstLoading(false);
  }

  async function deleteUserFn(id) {
    if (!id) return;

    const usersData = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users`,
      usersData
    );

    const { message } = await res.json();
    if (message === "deleted") {
      const updatedUsers = users.filter((user) => user.user_id !== id);
      setUsers(updatedUsers);
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
      setCurrentEntityObject(currentUser);
    } catch (error) {
      console.error(error);
    } finally {
      setDataLoader(false);
    }
  };

  useEffect(() => {
    setCurrentRole(session?.user?.role);
    getUsers();
  }, [status]);

  return (
    <div>
      <AddItemNav
        PageTitle="Пользователи"
        setModalEvent={setModalEvent}
        handleShowFn={handleShowFn}
        fetchUserInfo={fetchUserInfo}
        eventName="addUser"
        currentRole={currentRole}
      />
      <AdminUsersTable
        deleteUserFn={deleteUserFn}
        users={users}
        handleShowFn={handleShowFn}
        fetchUserInfo={fetchUserInfo}
        setDataLoader={setDataLoader}
        setModalEvent={setModalEvent}
        currentRole={currentRole}
        firstLoading={firstLoading}
      />
      <ModalComponent
        handleSubmitFn={handleSubmitFn}
        handleSubmitEditFn={handleSubmitEditFn}
        handleCloseFn={handleCloseFn}
        show={showModal}
        setError={setError}
        error={error}
        currentEntityObject={currentEntityObject}
        modalEvent={modalEvent}
        dataLoader={dataLoader}
        users={users}
        currentRole={currentRole}
      />
    </div>
  );
}
