"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { BsCalendarWeekFill, BsFillTelephoneFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { MdLocationOn, MdEmail } from "react-icons/md";

export const ShowUserInfoForm = ({ handleCloseFn, userId, users }) => {
  const user = users.find((u) => u.user_id === userId);

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("ru-RU", options);
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>ФИО Наставника</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={user.name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>ФИО Участника</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={user.minorName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>День рождения</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={formatDate(user.teenager_birthday)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Дата включения в проект</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={formatDate(user.teenager_registered_date)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Вид учета</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={user.teenager_record_type}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Учебное заведение</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={user.teenager_education}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Мобильный номер участника</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={user.phone}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Адрес проживания участника</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={user.teenager_adress}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Законный представитель</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={user.teenager_representative}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>
          Мобильный номер телефона законного представителя
        </Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={user.teenager_representative_phone}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Количество баллов всего</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={user.totalPoints}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Количество посещенных мероприятий</Form.Label>
        <Form.Control
          name="positive_results"
          required
          type="text"
          value={user.totalEvents}
        />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button onClick={handleCloseFn} className="me-2" variant="secondary">
          Закрыть
        </Button>
      </div>
    </Form>
  );
};
