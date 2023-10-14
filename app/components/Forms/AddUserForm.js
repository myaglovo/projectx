"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { generate } from "short-uuid";

const AllRoles = ({ handleInputChange, users, userData }) => {
  return (
    <>
      {userData.role === "executor" && (
        <Form.Group className="mb-3" controlId="formOwner">
          <Form.Label>Выберите куратора</Form.Label>
          <Form.Select onChange={handleInputChange} name="owner_id" required>
            <option value="">Выберите роль</option>
            {users
              .filter((user) => user.role === "curator")
              .map((user) => (
                <option value={user.user_id}>{user.name}</option>
              ))}
          </Form.Select>
        </Form.Group>
      )}
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Электронная почта для входа</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="email"
          required
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Пароль для входа в систему</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="password"
          type="password"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Ф.И.О.</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="name"
          type="text"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Мобильный номер</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="phone"
          type="number"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formWork">
        <Form.Label>Место работы</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="job"
          type="text"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPosition">
        <Form.Label>Должность</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="job_position"
          type="text"
          required
        />
      </Form.Group>
    </>
  );
};

const TeenagersRoles = ({ handleInputChange }) => {
  return (
    <>
      <Form.Text>Данные наставника</Form.Text>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Электронная почта для входа</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="email"
          required
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль для входа в систему</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="password"
          type="password"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Ф.И.О.</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="name"
          type="text"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Мобильный номер</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="phone"
          type="number"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicWork">
        <Form.Label>Место работы</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="job"
          type="text"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPosition">
        <Form.Label>Должность</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="job_position"
          type="text"
          required
        />
      </Form.Group>

      <Form.Text>Данные несовершеннолетнего</Form.Text>

      <Form.Group className="mb-3" controlId="formBasicEmailTeenager">
        <Form.Label>Электронная почта для входа</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_email"
          required
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPasswordTeenager">
        <Form.Label>Пароль для входа</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_password"
          type="password"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNameTeenager">
        <Form.Label>Ф.И.О Несовершеннолетнего</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_name"
          type="text"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBirthdayTeenager">
        <Form.Label>Дата рождения</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_birthday"
          type="date"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDateTeenager">
        <Form.Label>Дата включения в проект</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_registered_date"
          type="date"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTypeTeenager">
        <Form.Label>Вид учета</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_record_type"
          type="text"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEduTeenager">
        <Form.Label>Учебное заведение</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_education"
          type="text"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhoneTeenager">
        <Form.Label>Мобильный номер</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_phone"
          type="number"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAdressTeenager">
        <Form.Label>Адрес проживания</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_adress"
          type="text"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRepresentativeTeenager">
        <Form.Label>Ф.И.О законного представителя</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="teenager_representative"
          type="text"
          required
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
        />
      </Form.Group>
    </>
  );
};

export const AddUserForm = ({
  handleSubmitFn,
  handleCloseFn,
  users,
  setError,
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
    owner_id: "",
  });

  const submitFormHandler = (e) => {
    e.preventDefault();
    let data = {};
    const userId = generate();
    const teenagerId = generate();

    try {
      if (userData.role && userData.role === "executor") {
        data = {
          user_id: userId,
          name: userData.name,
          role: userData.role,
          phone: userData.phone,
          email: userData.email,
          password: userData.password,
          job: userData.job,
          job_position: userData.job_position,
          slave_id: "",
          teenager_id: "",
          teenager_name: userData.teenager_name,
          teenager_registered_date: userData.teenager_registered_date,
          teenager_birthday: userData.teenager_birthday,
          teenager_email: userData.teenager_email,
          teenager_password: userData.teenager_password,
          teenager_role: "",
          teenager_record_type: userData.teenager_record_type,
          teenager_education: userData.teenager_education,
          teenager_phone: userData.teenager_phone,
          teenager_adress: userData.teenager_adress,
          teenager_representative: userData.teenager_representative,
          teenager_representative_phone: userData.teenager_representative_phone,
          owner_id: userData.owner_id,
        };

        handleSubmitFn(data);
        return;
      }

      if (userData.role && userData.role !== "minor") {
        data = {
          user_id: userId,
          name: userData.name,
          role: userData.role,
          phone: userData.phone,
          email: userData.email,
          password: userData.password,
          job: userData.job,
          job_position: userData.job_position,
          slave_id: "",
          teenager_id: "",
          teenager_name: userData.teenager_name,
          teenager_registered_date: userData.teenager_registered_date,
          teenager_birthday: userData.teenager_birthday,
          teenager_email: userData.teenager_email,
          teenager_password: userData.teenager_password,
          teenager_role: "",
          teenager_record_type: userData.teenager_record_type,
          teenager_education: userData.teenager_education,
          teenager_phone: userData.teenager_phone,
          teenager_adress: userData.teenager_adress,
          teenager_representative: userData.teenager_representative,
          teenager_representative_phone: userData.teenager_representative_phone,
          owner_id: "",
        };

        handleSubmitFn(data);
      }

      if (userData.role && userData.role === "minor") {
        data = {
          user_id: userId,
          name: userData.name,
          role: userData.role,
          phone: userData.phone,
          email: userData.email,
          password: userData.password,
          job: userData.job,
          job_position: userData.job_position,
          slave_id: teenagerId,
          teenager_id: "",
          teenager_name: "",
          teenager_registered_date: "",
          teenager_birthday: "",
          teenager_email: "",
          teenager_password: "",
          teenager_role: "",
          teenager_record_type: "",
          teenager_education: "",
          teenager_phone: "",
          teenager_adress: "",
          teenager_representative: "",
          teenager_representative_phone: "",
          owner_id: "",
        };

        const teenagerData = {
          user_id: teenagerId,
          name: userData.teenager_name,
          role: "teenager",
          phone: userData.teenager_phone,
          email: userData.teenager_email,
          password: userData.teenager_password,
          job: "",
          job_position: "",
          slave_id: "",
          teenager_registered_date: userData.teenager_registered_date,
          teenager_birthday: userData.teenager_birthday,
          teenager_role: "teenager",
          teenager_record_type: userData.teenager_record_type,
          teenager_education: userData.teenager_education,
          teenager_adress: userData.teenager_adress,
          teenager_representative: userData.teenager_representative,
          teenager_representative_phone: userData.teenager_representative_phone,
          owner_id: userId,
        };

        handleSubmitFn(data, teenagerData);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setError("");
    }
  };

  return (
    <Form onSubmit={submitFormHandler}>
      <fieldset>
        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>Роль пользователя</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Выберите роль</option>
            <option value="organizer">Организатор</option>
            <option value="coordinator">Координатор</option>
            <option value="curator">Куратор</option>
            <option value="executor">Исполнитель</option>
            <option value="minor">Наставник / Несовершеннолетний</option>
          </Form.Select>
        </Form.Group>
        {userData.role && userData.role !== "minor" && (
          <AllRoles
            handleInputChange={handleInputChange}
            users={users}
            userData={userData}
          />
        )}
        {userData.role === "minor" && (
          <TeenagersRoles handleInputChange={handleInputChange} />
        )}
        <div className="d-flex justify-content-end">
          <Button onClick={handleCloseFn} className="me-2" variant="secondary">
            Отменить
          </Button>
          <Button type="submit" variant="primary">
            Добавить пользователя
          </Button>
        </div>
      </fieldset>
    </Form>
  );
};
