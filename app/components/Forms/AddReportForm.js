"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { generate } from "short-uuid";

export function AddReportForm({
  handleCloseFn,
  eventData,
  users,
  currentUser,
  teenagerEvents,
  handleSubmitFn,
  reportsData,
}) {
  const [userData, setUserData] = useState({
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

  const [minorData, setMinorData] = useState({});
  const [teenagerData, setTeenagerData] = useState({});
  const [registeredData, setRegisteredData] = useState([]);

  const submitFormHandler = (e) => {
    e.preventDefault();
    let data = { ...userData };
    data.id = generate();
    data.mentor_id = minorData.user_id;
    data.teenager_id = minorData.slave_id;
    handleSubmitFn(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function filterArray(arr1, arr2, userId) {
    const filteredReports = arr2.filter(
      (report) => report.teenager_id === userId
    );

    if (filteredReports) {
      const filteredArray = arr1.filter((item1) => {
        return !filteredReports.some(
          (item2) => item2.event_id === item1.eventID
        );
      });
      return filteredArray;
    }
    return arr1;
  }

  useEffect(() => {
    if (currentUser.role === "minor") {
      setMinorData(currentUser);
      setTeenagerData(
        ...users.filter((user) => user.user_id === currentUser.slave_id)
      );

      const slaveObj = users.filter(
        (user) => user.user_id === currentUser.slave_id
      );

      const teenagerEventList = teenagerEvents.filter(
        (event) => event.teenagerID === currentUser.slave_id
      );

      const eventListWithTitle = teenagerEventList.map((eventItem) => {
        const matchingEvent = eventData.find(
          (event) => event.event_id == eventItem.eventID
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

      const filteredArrayByExisParam = filterArray(
        controleTitleAndId,
        reportsData,
        slaveObj[0].user_id
      );

      setRegisteredData(filteredArrayByExisParam);
    }
  }, []);

  return (
    <Form onSubmit={submitFormHandler}>
      <fieldset>
        {currentUser.role === "minor" && (
          <Form.Group className="mb-3" controlId="formCurator">
            <Form.Label>ФИО наставника</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="mentor_id"
              onChange={handleInputChange}
              required
              disabled
            >
              <option value={minorData.user_id}>{minorData.name}</option>
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formTeenager">
          <Form.Label>ФИО несовершеннолетнего</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="teenager_id"
            onChange={handleInputChange}
            required
            disabled
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
          >
            <option value="">Выберите мероприятие</option>
            {registeredData?.map((event) => (
              <option key={event.eventID} value={event.eventID}>
                {event.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>Степень участия</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="involvement_grade"
            onChange={handleInputChange}
            required
          >
            <option value="">Выберите вариант</option>
            <option value="0">Не пришёл (0 баллов)</option>
            <option value="1">Посещение мероприятия (1 балл)</option>
            <option value="3">Активное участие в мероприятии (3 балла)</option>
            <option value="5">Занял призовое мест (5 баллов)</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>Помощь в организации</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="help_grade"
            onChange={handleInputChange}
            required
          >
            <option value="">Выберите вариант</option>
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
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button onClick={handleCloseFn} className="me-2" variant="secondary">
            Отменить
          </Button>
          <Button type="submit" variant="primary">
            Добавить отчёт
          </Button>
        </div>
      </fieldset>
    </Form>
  );
}
