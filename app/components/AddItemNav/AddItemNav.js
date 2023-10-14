import React from "react";
import { FiPlus } from "react-icons/fi";
import { useSession } from "next-auth/react";

const AddItemNav = ({
  PageTitle,
  handleShowFn,
  setModalEvent,
  eventName,
  getUsers = null,
  fetchUserInfo = null,
  currentRole,
}) => {
  const { data: session } = useSession();

  const clickModalHandler = () => {
    setModalEvent(eventName);
    handleShowFn();
    if (getUsers) {
      getUsers();
    }
    if (fetchUserInfo) {
      fetchUserInfo(session?.user?.id);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="text-center">{PageTitle}</h1>
      {PageTitle === "Пользователи" && currentRole === "organizer" && (
        <button className="btn btn-primary" onClick={clickModalHandler}>
          <FiPlus /> Добавить
        </button>
      )}
      {PageTitle === "Мероприятия" &&
        (currentRole === "executor" || currentRole === "curator") && (
          <button className="btn btn-primary" onClick={clickModalHandler}>
            <FiPlus /> Добавить
          </button>
        )}
      {PageTitle === "Отчёты" && currentRole === "minor" && (
        <button className="btn btn-primary" onClick={clickModalHandler}>
          <FiPlus /> Добавить
        </button>
      )}
    </div>
  );
};

export default AddItemNav;
