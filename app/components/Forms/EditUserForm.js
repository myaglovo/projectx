"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const AllRoles = ({ handleInputChange, userData, currentRole }) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Электронная почта для входа</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="email"
          required
          type="email"
          value={userData.email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Пароль для входа в систему</Form.Label>
        {currentRole === "coordinator" ? (
          <Form.Control
            onChange={handleInputChange}
            name="password"
            type="password"
            required
            value={userData.password}
          />
        ) : (
          <Form.Control
            onChange={handleInputChange}
            name="password"
            type="text"
            required
            value={userData.password}
          />
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Ф.И.О.</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="name"
          type="text"
          required
          value={userData.name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Мобильный номер</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="phone"
          type="number"
          required
          value={userData.phone}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formWork">
        <Form.Label>Место работы</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="job"
          type="text"
          required
          value={userData.job}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPosition">
        <Form.Label>Должность</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="job_position"
          type="text"
          required
          value={userData.job_position}
        />
      </Form.Group>
    </>
  );
};

const TeenagersRoles = ({ handleInputChange, userData, currentRole }) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicEmailTeenager">
        <Form.Label>Электронная почта для входа</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="email"
          required
          type="email"
          value={userData.email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPasswordTeenager">
        <Form.Label>Пароль для входа</Form.Label>
        {currentRole === "coordinator" ? (
          <Form.Control
            onChange={handleInputChange}
            name="password"
            type="password"
            required
            value={userData.password}
          />
        ) : (
          <Form.Control
            onChange={handleInputChange}
            name="password"
            type="text"
            required
            value={userData.password}
          />
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNameTeenager">
        <Form.Label>Ф.И.О Несовершеннолетнего</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="name"
          type="text"
          required
          value={userData.name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBirthdayTeenager">
        <Form.Label>Дата рождения</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_birthday"
          type="date"
          required
          value={userData.teenager_birthday}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDateTeenager">
        <Form.Label>Дата включения в проект</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_registered_date"
          type="date"
          required
          value={userData.teenager_registered_date}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTypeTeenager">
        <Form.Label>Вид учета</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_record_type"
          type="text"
          required
          value={userData.teenager_record_type}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEduTeenager">
        <Form.Label>Учебное заведение</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_education"
          type="text"
          required
          value={userData.teenager_education}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhoneTeenager">
        <Form.Label>Мобильный номер</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="phone"
          type="number"
          required
          value={userData.phone}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAdressTeenager">
        <Form.Label>Адрес проживания</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_adress"
          type="text"
          required
          value={userData.teenager_adress}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRepresentativeTeenager">
        <Form.Label>Ф.И.О законного представителя</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_representative"
          type="text"
          required
          value={userData.teenager_representative}
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicPhoneRepresentativeTeenager"
      >
        <Form.Label>Мобильный номер представителя</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_representative_phone"
          type="number"
          required
          value={userData.teenager_representative_phone}
        />
      </Form.Group>
    </>
  );
};

export const EditUserForm = ({
  handleSubmitEditFn,
  handleCloseFn,
  currentEntityObject,
  users,
  currentRole,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [userData, setUserData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    password: "",
    job: "",
    job_position: "",
    teenager_name: "",
    teenager_registered_date: "",
    teenager_birthday: "",
    teenager_email: "",
    teenager_password: "",
    teenager_role: "teenager",
    teenager_record_type: "",
    teenager_education: "",
    teenager_phone: "",
    teenager_adress: "",
    teenager_representative: "",
    teenager_representative_phone: "",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (currentEntityObject.role === "teenager") {
      const birthdayDate = currentEntityObject.teenager_birthday;
      const birthdayDateObject = new Date(birthdayDate);
      const year = birthdayDateObject.getFullYear();
      const month = String(birthdayDateObject.getMonth() + 1).padStart(2, "0");
      const day = String(birthdayDateObject.getDate()).padStart(2, "0");
      const formattedBirthdayDateObject = `${year}-${month}-${day}`;

      const registeredDate = currentEntityObject.teenager_registered_date;
      const registeredDateObject = new Date(registeredDate);
      const yearRegistered = registeredDateObject.getFullYear();
      const monthRegistered = String(
        registeredDateObject.getMonth() + 1
      ).padStart(2, "0");
      const dayRegistered = String(registeredDateObject.getDate()).padStart(
        2,
        "0"
      );
      const formattedRegisteredDateObject = `${yearRegistered}-${monthRegistered}-${dayRegistered}`;

      setUserData({
        ...userData,
        user_id: currentEntityObject.user_id,
        name: currentEntityObject.name,
        role: currentEntityObject.role,
        phone: currentEntityObject.phone,
        email: currentEntityObject.email,
        password: currentEntityObject.password,
        owner_id: currentEntityObject.owner_id,
        job: currentEntityObject.job,
        job_position: currentEntityObject.job_position,
        teenager_registered_date: formattedRegisteredDateObject,
        teenager_birthday: formattedBirthdayDateObject,
        teenager_record_type: currentEntityObject.teenager_record_type,
        teenager_education: currentEntityObject.teenager_education,
        teenager_adress: currentEntityObject.teenager_adress,
        teenager_representative: currentEntityObject.teenager_representative,
        teenager_representative_phone:
          currentEntityObject.teenager_representative_phone,
      });
    }
    if (currentEntityObject.role !== "teenager") {
      setUserData({
        ...userData,
        user_id: currentEntityObject.user_id,
        name: currentEntityObject.name,
        role: currentEntityObject.role,
        phone: currentEntityObject.phone,
        email: currentEntityObject.email,
        password: currentEntityObject.password,
        job: currentEntityObject.job,
        job_position: currentEntityObject.job_position,
        slave_id: currentEntityObject.slave_id,
      });
    }
  }, [currentEntityObject]);

  const handleChangeEditMode = () => {
    setEditMode(true);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    let data = {};

    if (userData.role && userData.role !== "teenager") {
      data = {
        user_id: userData.user_id,
        name: userData.name,
        role: userData.role,
        phone: userData.phone,
        email: userData.email,
        password: userData.password,
        job: userData.job,
        job_position: userData.job_position,
        teenager_registered_date: "",
        teenager_birthday: "",
        teenager_record_type: "",
        teenager_education: "",
        teenager_adress: "",
        teenager_representative: "",
        teenager_representative_phone: "",
        owner_id: "",
        slave_id: userData.slave_id,
      };
    }

    if (userData.role && userData.role === "teenager") {
      data = {
        user_id: userData.user_id,
        name: userData.name,
        role: userData.role,
        phone: userData.phone,
        email: userData.email,
        password: userData.password,
        job: "",
        job_position: "",
        owner_id: userData.owner_id,
        slave_id: "",
        teenager_registered_date: userData.teenager_registered_date,
        teenager_birthday: userData.teenager_birthday,
        teenager_record_type: userData.teenager_record_type,
        teenager_education: userData.teenager_education,
        teenager_adress: userData.teenager_adress,
        teenager_representative: userData.teenager_representative,
        teenager_representative_phone: userData.teenager_representative_phone,
      };
    }

    handleSubmitEditFn(data, userData.user_id);
  };

  return (
    <>
      <Form onSubmit={submitFormHandler}>
        <>
          <fieldset disabled={!editMode}>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Роль пользователя</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="role"
                value={userData.role}
                onChange={handleInputChange}
                required
              >
                {userData.role === "minor" && (
                  <option value="minor">Наставник</option>
                )}
                {userData.role === "teenager" && (
                  <>
                    <option value="teenager">Несовершеннолетний</option>
                  </>
                )}
                {userData.role !== "minor" && userData.role !== "teenager" && (
                  <>
                    <option value="">Выберите роль</option>
                    <option value="organizer">Организатор</option>
                    <option value="coordinator">Координатор</option>
                    <option value="curator">Куратор</option>
                    <option value="executor">Исполнитель</option>
                  </>
                )}
              </Form.Select>
            </Form.Group>
            {userData.role === "minor" && (
              <Form.Group className="mb-3" controlId="formBasicTeenagerLinked">
                <Form.Label>Привязанный несовершеннолетний</Form.Label>
                {users
                  .filter((user) => user.owner_id === userData.user_id)
                  .map((user) => (
                    <Form.Control
                      type="text"
                      disabled="true"
                      value={user.name}
                    />
                  ))}
              </Form.Group>
            )}
            {userData.role === "teenager" && (
              <Form.Group className="mb-3" controlId="formBasicTeenagerLinked">
                <Form.Label>Привязанный наставник</Form.Label>
                {users
                  .filter((user) => user.slave_id === userData.user_id)
                  .map((user) => (
                    <Form.Control
                      type="text"
                      disabled="true"
                      value={user.name}
                    />
                  ))}
              </Form.Group>
            )}
            {userData.role && userData.role !== "teenager" && (
              <AllRoles
                handleInputChange={handleInputChange}
                userData={userData}
                currentRole={currentRole}
              />
            )}
            {userData.role === "teenager" && (
              <TeenagersRoles
                handleInputChange={handleInputChange}
                userData={userData}
                currentRole={currentRole}
              />
            )}
          </fieldset>
          <div className="d-flex justify-content-end">
            <Button
              onClick={handleCloseFn}
              className="me-2"
              variant="secondary"
            >
              Отменить
            </Button>
            {!editMode && currentRole === "organizer" && (
              <Button onClick={handleChangeEditMode} variant="primary">
                Редактировать пользователя
              </Button>
            )}
            {editMode && (
              <Button type="submit" variant="primary">
                Сохранить изменения
              </Button>
            )}
          </div>
        </>
      </Form>
    </>
  );
};
