"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { generate } from "short-uuid";

export function EditReportForm({
  handleSubmitEditFn,
  handleCloseFn,
  currentEntityObject,
  eventData,
  users,
  currentUser,
  teenagerEvents,
  currentRole,
}) {
  const [editMode, setEditMode] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [minorData, setMinorData] = useState({});
  const [teenagerData, setTeenagerData] = useState({});
  const [registeredData, setRegisteredData] = useState([]);
  const [selectedObject, setSelectedObject] = useState({});

  const [formData, setFormData] = useState({
    id: "",
    mentor_id: "",
    teenager_id: "",
    event_id: "",
    involvement_grade: "",
    help_grade: "",
    positive_results: "",
    negative_results: "",
    conclusions: "",
  });

  const handleChangeEditMode = () => {
    setEditMode(true);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    handleSubmitEditFn(formData, formData.id);
  };

  useEffect(() => {
    if (currentUser.role === "minor") {
      setMinorData(currentUser);
      setTeenagerData(
        ...users.filter((user) => user.user_id === currentUser.slave_id)
      );

      const teenagerEventList = teenagerEvents.filter(
        (event) => event.teenagerID === currentUser.slave_id
      );
      const eventListWithTitle = teenagerEventList.map((eventItem) => {
        const matchingEvent = eventData.find(
          (event) => event.event_id === eventItem.eventID
        );

        if (matchingEvent) {
          return { ...eventItem, title: matchingEvent.event_title };
        } else {
          return eventItem;
        }
      });

      const controleTitleAndId = eventListWithTitle.filter(
        (item) => item.title && item.eventID
      );

      setRegisteredData(controleTitleAndId);

      setFormData({
        ...formData,
        id: currentEntityObject.id,
        mentor_id: currentUser.user_id,
        teenager_id: currentEntityObject.teenager_id,
        event_id: selectedObject?.event_id,
        involvement_grade: currentEntityObject.involvement_grade,
        help_grade: currentEntityObject.help_grade,
        positive_results: currentEntityObject.positive_results,
        negative_results: currentEntityObject.negative_results,
        conclusions: currentEntityObject.conclusions,
      });
    }
  }, [currentUser, currentEntityObject, users]);

  useEffect(() => {
    setSelectedObject(
      eventData.find((event) => event.event_id === currentEntityObject.event_id)
    );
  }, []);

  return (
    <Form onSubmit={submitFormHandler}>
      <fieldset disabled={!editMode}>
        <Form.Group className="mb-3" controlId="formCurator">
          <Form.Label>ФИО наставника</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="mentor_id"
            onChange={handleInputChange}
            required
            disabled
            value={currentUser.user_id}
          >
            <option value={currentUser.user_id}>{currentUser.name}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTeenager">
          <Form.Label>ФИО несовершеннолетнего</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="teenager_id"
            onChange={handleInputChange}
            required
            disabled
            value={teenagerData.user_id}
          >
            <option value={teenagerData.user_id}>{teenagerData.name}</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEvent">
          <Form.Label>Наименование мероприятия</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="event_id"
            onChange={handleInputChange}
            required
            disabled
            value={selectedObject.event_id ? selectedObject.event_id : ""}
          >
            <option
              value={selectedObject.event_id ? selectedObject.event_id : ""}
            >
              {selectedObject.event_id ? selectedObject.event_title : ""}
            </option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>Степень участия</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="involvement_grade"
            onChange={handleInputChange}
            required
            value={formData.involvement_grade}
          >
            <option value="0">Не пришёл (0 баллов)</option>
            <option value="1">Посещение мероприятия (1 балл)</option>
            <option value="3">Активное участие в мероприятии (3 балла)</option>
            <option value="5">Занял призовое место (5 баллов)</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>Помощь в организации</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="help_grade"
            onChange={handleInputChange}
            required
            value={formData.help_grade}
          >
            <option value="1">Да (5 баллов)</option>
            <option value="0">Нет (0 баллов)</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Положительные результаты работы</Form.Label>
          <Form.Text> (Максимум 2000 символов)</Form.Text>
          <Form.Control
            as="textarea"
            rows={6}
            aria-label="With textarea"
            onChange={handleInputChange}
            name="positive_results"
            required
            type="text"
            value={formData.positive_results}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Отрицательные результаты работы</Form.Label>
          <Form.Text> (Максимум 2000 символов)</Form.Text>
          <Form.Control
            as="textarea"
            rows={6}
            aria-label="With textarea"
            onChange={handleInputChange}
            name="negative_results"
            required
            type="text"
            value={formData.negative_results}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>
            Выводы и предложения по результатам проведенной работы
          </Form.Label>
          <Form.Text> (Максимум 2000 символов)</Form.Text>
          <Form.Control
            as="textarea"
            rows={6}
            aria-label="With textarea"
            onChange={handleInputChange}
            name="conclusions"
            required
            type="text"
            value={formData.conclusions}
          />
        </Form.Group>
      </fieldset>
      <div className="d-flex justify-content-end">
        <Button onClick={handleCloseFn} className="me-2" variant="secondary">
          Отменить
        </Button>
        {!editMode && currentRole !== "coordinator" && (
          <Button onClick={handleChangeEditMode} variant="primary">
            Редактировать отчёт
          </Button>
        )}
        {editMode && (
          <Button type="submit" variant="primary">
            Сохранить изменения
          </Button>
        )}
      </div>
    </Form>
  );
}
