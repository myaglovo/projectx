"use client";
import SpinnerComponent from "../Loaders/Spinner";
import Modal from "react-bootstrap/Modal";
import { EditUserForm } from "../Forms/EditUserForm";
import { AddUserForm } from "../../components/Forms/AddUserForm";
import { AddEventForm } from "../../components/Forms/AddEventForm";
import { EditEventForm } from "../Forms/EditEventForm";
import { ShowEventForm } from "../Forms/ShowEventForm";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { AddReportForm } from "../Forms/AddReportForm";
import { EditReportForm } from "../Forms/EditReportForm";
import { ShowUserInfoForm } from "../Forms/ShowUserInfoForm";

export function ModalComponent({
  handleCloseFn,
  show,
  handleSubmitFn,
  handleSubmitEditFn,
  error,
  setError,
  currentEntityObject,
  modalEvent,
  dataLoader,
  users,
  currentUser = null,
  registeredData = null,
  reportsData = null,
  eventData = null,
  teenagerEvents = null,
  currentRole,
  handlePartisBtnClick = null,
  data = null,
}) {
  let modalTitle = "";
  switch (modalEvent) {
    case "editUser":
      modalTitle = "Редактировать пользователя";
      break;
    case "addUser":
      modalTitle = "Добавить пользователя";
      break;
    case "addEvent":
      modalTitle = "Добавить мероприятие";
      break;
    case "editEvent":
      modalTitle = "Редактировать мероприятие";
      break;
    case "showEventModal":
      modalTitle = "Прими участие в мероприятии";
      break;
    case "addReport":
      modalTitle = "Добавить отчёт";
      break;
    case "editReport":
      modalTitle = "Редактировать отчёт";
      break;
    case "showUserInfo":
      modalTitle = "Информация об участнике";
      break;
    default:
      modalTitle = "Модальное окно";
  }

  const handleParticipateButton = (e) => {
    e.preventDefault();
    const event_id = currentEntityObject.event_id;
    const user_id = currentUser.id;
    handleSubmitFn({ event_id, user_id });
    handlePartisBtnClick();
  };

  function checkExistingRegistration() {
    if (registeredData) {
      for (let i = 0; i < registeredData.length; i++) {
        if (registeredData[i].eventID === currentEntityObject.event_id) {
          if (registeredData[i].teenagerID === currentUser?.id) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function calcExistingTeenagers() {
    if (registeredData) {
      let filteredArray = registeredData.filter(
        (item) => item.eventID === currentEntityObject.event_id
      );

      if (filteredArray.length < currentEntityObject.event_max_members) {
        return true;
      } else {
        return false;
      }
    }
  }

  const isExistingRegistration = checkExistingRegistration();
  const isMembersSizeLess = calcExistingTeenagers();

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleCloseFn}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          {modalEvent === "showEventModal" ? (
            <Modal.Title>{currentEntityObject.event_title}</Modal.Title>
          ) : (
            <Modal.Title>{modalTitle}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {dataLoader ? (
            <div className="d-flex justify-content-center py-5">
              <SpinnerComponent color="primary" />
            </div>
          ) : (
            <>
              {modalEvent === "editUser" && (
                <EditUserForm
                  currentEntityObject={currentEntityObject}
                  handleSubmitEditFn={handleSubmitEditFn}
                  handleCloseFn={handleCloseFn}
                  users={users}
                  currentRole={currentRole}
                />
              )}
              {modalEvent === "addUser" && (
                <AddUserForm
                  handleSubmitFn={handleSubmitFn}
                  handleCloseFn={handleCloseFn}
                  users={users}
                  setError={setError}
                />
              )}
              {modalEvent === "addEvent" && (
                <AddEventForm
                  handleSubmitFn={handleSubmitFn}
                  handleCloseFn={handleCloseFn}
                  users={users}
                  currentUser={currentUser}
                />
              )}
              {modalEvent === "editEvent" && (
                <EditEventForm
                  currentEntityObject={currentEntityObject}
                  handleSubmitEditFn={handleSubmitEditFn}
                  handleCloseFn={handleCloseFn}
                  users={users}
                  currentRole={currentRole}
                  data={data}
                />
              )}
              {modalEvent === "showEventModal" && (
                <ShowEventForm
                  currentEntityObject={currentEntityObject}
                  users={users}
                  currentUser={currentUser}
                />
              )}
              {modalEvent === "addReport" && (
                <AddReportForm
                  handleSubmitFn={handleSubmitFn}
                  handleCloseFn={handleCloseFn}
                  eventData={eventData}
                  users={users}
                  currentUser={currentUser}
                  teenagerEvents={teenagerEvents}
                  reportsData={reportsData}
                />
              )}
              {modalEvent === "editReport" && (
                <EditReportForm
                  handleSubmitEditFn={handleSubmitEditFn}
                  handleCloseFn={handleCloseFn}
                  eventData={eventData}
                  users={users}
                  currentUser={currentUser}
                  teenagerEvents={teenagerEvents}
                  currentEntityObject={currentEntityObject}
                  currentRole={currentRole}
                />
              )}
              {modalEvent === "showUserInfo" && (
                <ShowUserInfoForm
                  handleCloseFn={handleCloseFn}
                  users={users}
                  userId={currentUser}
                />
              )}
            </>
          )}
        </Modal.Body>
        {modalEvent === "showEventModal" && (
          <Modal.Footer>
            {currentUser?.role === "teenager" &&
              !isExistingRegistration &&
              !isMembersSizeLess && (
                <Button variant="primary" disabled>
                  Все места заняты
                </Button>
              )}
            {currentUser?.role === "teenager" && isExistingRegistration && (
              <Button variant="primary" disabled>
                Вы уже записались
              </Button>
            )}
            {currentUser?.role === "teenager" &&
              !isExistingRegistration &&
              isMembersSizeLess && (
                <Button variant="primary" onClick={handleParticipateButton}>
                  Принять участие
                </Button>
              )}
            {currentUser?.role !== "teenager" && (
              <>
                <Link
                  href="/login"
                  className="text-secondary text-decoration-none"
                >
                  Войдите в аккаунт
                </Link>
                <Button variant="primary" disabled>
                  Принять участие
                </Button>
              </>
            )}
          </Modal.Footer>
        )}
        {error && <Modal.Footer className="text-danger">{error}</Modal.Footer>}
      </Modal>
    </>
  );
}
