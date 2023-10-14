"use client";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export const TableRow = ({
  clickModalHandler,
  index,
  user_id,
  role,
  job,
  job_position,
  name,
  deleteUserFn,
  fetchUserInfo,
  setModalEvent,
  currentRole,
}) => {
  let badgeColor = "";
  switch (role) {
    case "organizer":
      role = "Организатор";
      badgeColor = "text-bg-secondary";
      break;
    case "coordinator":
      role = "Координатор";
      badgeColor = "text-bg-light";
      break;
    case "curator":
      role = "Куратор";
      badgeColor = "text-bg-info";
      break;
    case "executor":
      role = "Исполнитель";
      badgeColor = "text-bg-warning";
      break;
    case "minor":
      role = "Наставник";
      badgeColor = "text-bg-primary";
      break;
    default:
      role = "Несовершеннолетний";
      badgeColor = "text-bg-success";
  }

  const showUserInfoHandler = () => {
    setModalEvent("editUser");
    fetchUserInfo(user_id);
    clickModalHandler();
  };

  return (
    <>
      <tr>
        <td scope="row">{index}</td>
        <td>{name}</td>
        <td>
          <span className={`badge rounded-pill p-2 fs-7 ${badgeColor}`}>
            {role}
          </span>
        </td>
        <td>{job}</td>
        <td>{job_position}</td>
        <td>
          <div className="d-flex justify-content-end">
            {user_id !== "vADZjBkibpUjPWupcPZj" &&
              currentRole === "organizer" && (
                <OverlayTrigger
                  trigger="click"
                  key="left"
                  placement="left"
                  overlay={
                    <Popover id={`popover-positioned-left`}>
                      <Popover.Header
                        className="bg-danger text-white"
                        as="h3"
                      >{`Вы точно хотите удалить?`}</Popover.Header>
                      <Popover.Body>
                        <button
                          className="btn btn-dark mx-1"
                          onClick={() => deleteUserFn(user_id)}
                        >
                          Удалить
                        </button>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <button className="btn btn-outline-danger mx-1">
                    <AiFillDelete size={18} />
                  </button>
                </OverlayTrigger>
              )}
            <button
              className="btn btn-outline-primary mx-1"
              onClick={showUserInfoHandler}
            >
              <BsEyeFill size={18} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export const TableEventRow = ({
  index,
  event_id,
  title,
  date,
  deleteEventFn,
  setModalEvent,
  fetchEventInfo,
  clickModalHandler,
  currentRole,
  curatorName,
  executorName,
}) => {
  const showUserInfoHandler = () => {
    setModalEvent("editEvent");
    fetchEventInfo(event_id);
    clickModalHandler();
  };

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{executorName}</td>
        <td>{curatorName}</td>
        <td>{title}</td>
        <td>{date}</td>
        <td>
          <div className="d-flex justify-content-end">
            {currentRole !== "coordinator" && (
              <OverlayTrigger
                trigger="click"
                key="left"
                placement="left"
                overlay={
                  <Popover id={`popover-positioned-left`}>
                    <Popover.Header
                      className="bg-danger text-white"
                      as="h3"
                    >{`Вы точно хотите удалить?`}</Popover.Header>
                    <Popover.Body>
                      <button
                        onClick={() => deleteEventFn(event_id)}
                        className="btn btn-dark mx-1"
                      >
                        Удалить
                      </button>
                    </Popover.Body>
                  </Popover>
                }
              >
                <button className="btn btn-outline-danger mx-1">
                  <AiFillDelete size={18} />
                </button>
              </OverlayTrigger>
            )}
            <button
              onClick={showUserInfoHandler}
              className="btn btn-outline-primary mx-1"
            >
              <BsEyeFill size={18} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export const TableReportRow = ({
  index,
  id,
  mentor_id,
  teenager_id,
  event_id,
  date,
  deleteEventFn,
  additionalData,
  setModalEvent,
  fetchEventInfo,
  clickModalHandler,
  fetchUserInfo,
  currentRole,
}) => {
  const showUserInfoHandler = () => {
    setModalEvent("editReport");
    fetchEventInfo(id);
    fetchUserInfo(mentor_id);
    clickModalHandler();
  };

  const { users, eventData } = additionalData;

  function getTitleById(array, fieldID, fieldName) {
    const foundObject = array.find((item) => item[fieldName] === fieldID);

    if (foundObject) {
      return foundObject.name || foundObject.event_title;
    }

    return null;
  }

  return (
    <>
      <tr>
        <td>{(date !== "Invalid Date" && date) || "Удалено"}</td>
        <td>
          {getTitleById(users, mentor_id, "user_id") || "Пользователь удален"}
        </td>
        <td>
          {getTitleById(users, teenager_id, "user_id") || "Пользователь удален"}
        </td>
        <td>
          {getTitleById(eventData, event_id, "event_id") ||
            "Мероприятие удалено"}
        </td>
        <td>
          <div className="d-flex justify-content-end">
            {currentRole !== "coordinator" && (
              <OverlayTrigger
                trigger="click"
                key="left"
                placement="left"
                overlay={
                  <Popover id={`popover-positioned-left`}>
                    <Popover.Header
                      className="bg-danger text-white"
                      as="h3"
                    >{`Вы точно хотите удалить?`}</Popover.Header>
                    <Popover.Body>
                      <button
                        onClick={() => deleteEventFn(id)}
                        className="btn btn-dark mx-1"
                      >
                        Удалить
                      </button>
                    </Popover.Body>
                  </Popover>
                }
              >
                <button className="btn btn-outline-danger mx-1">
                  <AiFillDelete size={18} />
                </button>
              </OverlayTrigger>
            )}
            <button
              onClick={showUserInfoHandler}
              className="btn btn-outline-primary mx-1"
            >
              <BsEyeFill size={18} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export const TableMembersRow = ({
  clickModalHandler,
  // deleteUserFn,
  setModalEvent,
  index,
  user_id,
  minorName,
  totalEvents,
  totalPoints,
  name,
  teenager_record_type,
  teenager_education,
  setUserIdFn,
}) => {
  const showUserInfoHandler = () => {
    setUserIdFn(user_id);
    setModalEvent("showUserInfo");
    clickModalHandler();
  };

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{name}</td>
        <td>{minorName}</td>
        <td>{teenager_record_type}</td>
        <td>{teenager_education}</td>
        <td>{totalPoints}</td>
        <td>{totalEvents}</td>
        <td>
          <div className="d-flex justify-content-end">
            <button
              onClick={showUserInfoHandler}
              className="btn btn-outline-primary mx-1"
            >
              <BsEyeFill size={18} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
