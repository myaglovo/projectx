"use client";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { FaFileCsv } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import {TableEventRow, TableMembersRow, TableReportRow, TableRow} from "./TableRow";
import CsvDownloadButton from 'react-json-to-csv'
import SpinnerComponent from "../Loaders/Spinner";
import TableSkeleton from "../CardSkeleton/TableSkeleton";

export const AdminUsersTable = ({ handleShowFn, users, deleteUserFn, fetchUserInfo,setModalEvent, currentRole,firstLoading}) => {
  const clickModalHandler = () => {
    handleShowFn();
  };

  if(firstLoading) {
    return <div className="text-center">
      <TableSkeleton/>
    </div>;
  }

  const zeroState = <div className="text-center text-secondary">В таблице нет данных</div>

  return (
    <div className="table-responsive mt-4">
      <table className="table rounded-2 overflow-hidden table-hover table-responsive">
        <thead className="table-primary">
          <tr className="">
            <th scope="col">#</th>
            <th scope="col">ФИО</th>
            <th scope="col">Роль</th>
            <th scope="col">Место работы</th>
            <th scope="col">Должность</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <TableRow
              deleteUserFn={deleteUserFn}
              fetchUserInfo={fetchUserInfo}
              index={idx +1}
              key={user.user_id}
              clickModalHandler={clickModalHandler}
              user_id={user.user_id}
              name={user.name}
              role={user.role}
              job={user.job}
              job_position={user.job_position}
              userData={...user}
              setModalEvent={setModalEvent}
              currentRole={currentRole}
            />
          ))}
        </tbody>
      </table>
      {!users.length && zeroState} 
    </div>
  );
};

export const AdminEventsTable = ({ handleShowFn, data, deleteEventFn, fetchUserInfo, setModalEvent, fetchEventInfo, firstLoading, currentRole}) => {
  const clickModalHandler = () => {
    handleShowFn();
  };

  function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);
    return date.toLocaleDateString('ru-RU', options);
  }

  if(firstLoading) {
    return <div className="text-center">
      <TableSkeleton/>
    </div>;
  }

  const zeroState = <div className="text-center text-secondary">В таблице нет данных</div>

  return (
    <div className="table-responsive mt-4">
      <table className="table rounded-2 overflow-hidden table-hover table-responsive">
        <thead className="table-primary">
        <tr className="">
            <th scope="col">#</th>
            <th scope="col">Ф.И.О. исполнителя</th>
            <th scope="col">Ф.И.О куратора</th>
            <th scope="col">Наименование</th>
            <th scope="col">Дата проведения</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        {data.map((event, idx) => <TableEventRow
              deleteEventFn={deleteEventFn}
              fetchUserInfo={fetchUserInfo}
              fetchEventInfo={fetchEventInfo}
              clickModalHandler={clickModalHandler}
              setModalEvent={setModalEvent}
              index={idx +1}
              key={event.event_id}
              curatorName={event.curatorData?.name || 'Пользователь удален'}
              executorName={event.executorData?.name || 'Пользователь удален'}
              event_id={event.event_id}
              title={event.event_title}
              date={formatDate(event.event_date)}
              time={event.event_time}
              maxMembers={event.event_max_members	}
              currentRole={currentRole}
            />)}
        </tbody>
      </table>
      {!data.length && zeroState} 
    </div>
  );
};

export const AdminReportsTable = ({ handleShowFn, data, deleteEventFn, fetchUserInfo, setModalEvent, fetchEventInfo, additionalData,firstLoading, currentRole, currentUser}) => {

  const clickModalHandler = () => {
    handleShowFn();
  };

  function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);
    return date.toLocaleDateString('ru-RU', options);
  }

  if(firstLoading) {
    return <div className="text-center">
      <TableSkeleton/>
    </div>;
  }

  const zeroState = <div className="text-center text-secondary">В таблице нет данных</div>


  return (
    <div className="table-responsive mt-4">
      <table className="table rounded-2 overflow-hidden table-hover table-responsive">
        <thead className="table-primary">
        <tr className="">
            <th scope="col">Дата добавления</th>
            <th scope="col">ФИО наставника</th>
            <th scope="col">ФИО Несовершеннолетнего</th>
            <th scope="col">Наименование мероприятия</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        {data.map((report, idx) => <TableReportRow
              deleteEventFn={deleteEventFn}
              fetchUserInfo={fetchUserInfo}
              fetchEventInfo={fetchEventInfo}
              clickModalHandler={clickModalHandler}
              setModalEvent={setModalEvent}
              additionalData={additionalData}
              index={idx +1}
              key={report.id}
              id={report.id}
              mentor_id={report.mentor_id}
              teenager_id={report.teenager_id}
              event_id={report.event_id}
              date={formatDate(report.createdAt)}
              currentRole={currentRole}
            />)}
        </tbody>
      </table>
      {!data.length && zeroState} 
    </div>
  );
};


export const AdminMembersTable = ({data, setModalEvent, handleShowFn, setUserIdFn,firstLoading}) => {
  const clickModalHandler = () => {
    handleShowFn();
  };


  const dataToDownload = data.map((obj) => {
    const { password,job,job_position,slave_id,owner_id, ...rest } = obj; 
    return rest;
  });

  if(firstLoading) {
    return <div className="text-center">
      <TableSkeleton/>
    </div>;
  }

  const zeroState = <div className="text-center text-secondary">В таблице нет данных</div>

  return (
    <div className="table-responsive mt-4">
      <table className="table rounded-2 overflow-hidden table-hover table-responsive">
        <thead className="table-primary">
          <tr className="">
            <th scope="col">#</th>
            <th scope="col">Ф.И.О. участника</th>
            <th scope="col">Ф.И.О. наставника</th>
            <th scope="col">Вид учета</th>
            <th scope="col">Учебное заведение</th>
            <th scope="col">Количество баллов всего</th>
            <th scope="col">Количество посещенных мероприятий</th>
            <th scope="col">
            <CsvDownloadButton data={dataToDownload} filename="Участники.csv" className="btn btn-primary" style={{display: 'flex',justifyContent: "center",alignItems: "center"}}><FaFileCsv size={18} /> Экспорт</CsvDownloadButton>
            </th>
          </tr>
        </thead>
        <tbody>
        {data.map((user, idx) => <TableMembersRow
              // deleteUserFn={deleteUserFn}
              setUserIdFn={setUserIdFn}
              clickModalHandler={clickModalHandler}
              setModalEvent={setModalEvent}
              index={idx +1}
              key={user.user_id}
              user_id={user.user_id}
              name={user.name}
              role={user.role}
              minorName={user.minorName}
              totalPoints={user.totalPoints}
              totalEvents={user.totalEvents}
              teenager_record_type={user.teenager_record_type}
              teenager_education={user.teenager_education}
            />)}
        </tbody>
      </table>
      {!data.length && zeroState} 
    </div>
  );
};