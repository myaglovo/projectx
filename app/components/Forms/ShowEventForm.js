"use client";
import React, { useState } from "react";
import { BsCalendarWeekFill, BsFillTelephoneFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { MdLocationOn, MdEmail } from "react-icons/md";

export const ShowEventForm = ({ currentEntityObject, users }) => {
  const {
    event_curator_id,
    event_executor_id,
    event_adress,
    event_date,
    event_time,
    event_description,
    event_id,
  } = currentEntityObject;
  const curatorInfo = users.filter((user) => user.user_id === event_curator_id);
  const executorInfo = users.filter(
    (user) => user.user_id === event_executor_id
  );

  const eventDate = event_date;
  const eventDateObject = new Date(eventDate);
  const year = eventDateObject.getFullYear();
  const month = String(eventDateObject.getMonth() + 1).padStart(2, "0");
  const day = String(eventDateObject.getDate()).padStart(2, "0");
  const formattedEventDateObject = `${year}-${month}-${day}`;

  return (
    <>
      <div className="mb-3">
        <h4>Описание мероприятия</h4>
        <p className="text-body-secondary">{event_description}</p>
      </div>
      <div className="mb-3">
        <h4>Детали мероприятия</h4>
        <div className="d-flex text-body-secondary">
          <div className="d-flex align-items-center me-3">
            <BsCalendarWeekFill size={18} className="me-1" />{" "}
            <span>{formattedEventDateObject}</span>
          </div>
          <div className="d-flex align-items-center me-3">
            <AiFillClockCircle size={18} className="me-1" />{" "}
            <span>{event_time?.slice(0, -3)}</span>
          </div>
          <div className="d-flex align-items-center me-3">
            <MdLocationOn size={18} className="me-1" />{" "}
            <span>{event_adress}</span>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <h4>Куратор мероприятия</h4>
        <p className="text-body-secondary">{curatorInfo[0]?.job}</p>
      </div>
      <div className="mb-3">
        <h4>Исполнитель мероприятия</h4>
        <p className="text-body-secondary">{executorInfo[0]?.job}</p>
      </div>
      <div className="mb-3">
        <h4>Контакты</h4>
        <div className="d-flex text-body-secondary">
          <div className="d-flex align-items-center me-3">
            <BsFillTelephoneFill size={18} className="me-1" />{" "}
            <span>{executorInfo[0]?.phone}</span>
          </div>
          <div className="d-flex align-items-center me-3">
            <MdEmail size={18} className="me-1" />{" "}
            <span>{executorInfo[0]?.email}</span>
          </div>
        </div>
      </div>
    </>
  );
};
