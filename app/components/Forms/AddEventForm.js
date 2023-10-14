"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useRef } from "react";
import { generate } from "short-uuid";
import ImageComponent from "../ImageComponent/ImageComponent";

export const AddEventForm = ({
  handleSubmitFn,
  handleCloseFn,
  users,
  currentUser,
}) => {
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [roleData, setRoleData] = useState({});
  const [fileError, setFileError] = useState("");
  const [imageURL, setImage] = useState("");
  const [formData, setFormData] = useState({
    event_image: null,
    event_title: "",
    event_group: "",
    event_curator_id: "",
    event_executor_id: "",
    event_adress: "",
    event_date: "",
    event_time: "",
    event_max_members: "",
    event_description: "",
  });

  const submitFormHandler = (e) => {
    e.preventDefault();
    const file = formData.event_image;
    let data = {};
    const eventId = generate();

    if (currentUser.role === "executor") {
      data = {
        event_id: eventId,
        event_title: formData.event_title,
        event_group: formData.event_group,
        event_curator_id: roleData.user_id,
        event_executor_id: currentUser.user_id,
        event_adress: formData.event_adress,
        event_date: formData.event_date,
        event_time: formData.event_time,
        event_max_members: formData.event_max_members,
        event_description: formData.event_description,
      };
    }

    if (currentUser.role === "curator") {
      data = {
        event_id: eventId,
        event_title: formData.event_title,
        event_group: formData.event_group,
        event_curator_id: currentUser.user_id,
        event_executor_id: formData.event_executor_id,
        event_adress: formData.event_adress,
        event_date: formData.event_date,
        event_time: formData.event_time,
        event_max_members: formData.event_max_members,
        event_description: formData.event_description,
      };
    }

    if (currentUser.role === "organizer") {
      data = {
        event_id: eventId,
        event_title: formData.event_title,
        event_group: formData.event_group,
        event_curator_id: formData.event_curator_id,
        event_executor_id: formData.event_executor_id,
        event_adress: formData.event_adress,
        event_date: formData.event_date,
        event_time: formData.event_time,
        event_max_members: formData.event_max_members,
        event_description: formData.event_description,
      };
    }

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", file);
      handleSubmitFn(formData);
    } catch (e) {
      console.error(e);
    }
  };

  const handlerFileUpload = (e) => {
    const currentFile = e.target.files?.[0];
    if (currentFile) {
      const maxSize = 1 * 1024 * 1024;

      if (currentFile.size > maxSize) {
        setFileError("Файл слишком большой. Максимальный размер: 1MB");
        fileInputRef.current.value = null;
      } else {
        const blob = new Blob([currentFile], { type: currentFile.type });
        setImage(URL.createObjectURL(blob));
        setFileError("");
        setFormData((prevState) => ({
          ...prevState,
          event_image: currentFile,
        }));
      }
    }
  };

  const fetchUserInfo = async (id) => {
    try {
      const userData = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const res = await await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/users/${id}`,
        userData
      );
      const { currentUser } = await res.json();
      return currentUser;
    } catch (error) {
      console.error(error);
    }
  };

  const loadRole = async (id) => {
    const roleUser = await fetchUserInfo(id);
    setRoleData(roleUser);
  };

  useEffect(() => {
    if (currentUser.role === "executor") {
      loadRole(currentUser.owner_id);
    }
  }, []);

  return (
    <Form onSubmit={submitFormHandler}>
      <fieldset>
        {imageURL && (
          <div className="mb-3">
            <ImageComponent imageURL={imageURL} aspectRatio="21x9" />
          </div>
        )}
        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Изображение для мероприятия</Form.Label>
          <Form.Control
            onChange={handlerFileUpload}
            name="event_image"
            accept=".jpeg, .jpg, .png"
            type="file"
            ref={fileInputRef}
          />
          {fileError && (
            <Form.Text className="text-danger">
              {fileError}
              <br></br>
              <a
                href="https://www.iloveimg.com/ru/compress-image"
                target="_blank"
              >
                Сжать изображение можно тут
              </a>
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Наименование мероприятия</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="event_title"
            required
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formThematic">
          <Form.Label>Тематическая группа мероприятия</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="event_group"
            onChange={handleInputChange}
            required
          >
            <option value="">Выберите тематическую группу</option>
            <option value="culture">Культура</option>
            <option value="sport">Спорт</option>
            <option value="education">Образование</option>
          </Form.Select>
        </Form.Group>

        {currentUser.role === "executor" && (
          <>
            <Form.Group className="mb-3" controlId="formCurator">
              <Form.Label>Куратор мероприятия</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="event_curator_id"
                onChange={handleInputChange}
                required
                disabled
                value={roleData.user_id}
              >
                <option value={roleData.user_id}>{roleData.name}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExecutor">
              <Form.Label>Исполнитель мероприятия</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                disabled
                value={currentUser.job}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExecutorHidden">
              <Form.Label hidden={true}>Исполнитель мероприятия</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                disabled
                hidden={true}
                required
                name="event_executor_id"
                value={currentUser.user_id}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Мобильный номер исполнителя</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="phone"
                disabled
                value={currentUser.phone}
                type="number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email исполнителя</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="email"
                disabled
                value={currentUser.email}
                type="text"
              />
            </Form.Group>
          </>
        )}

        {currentUser.role === "curator" && (
          <>
            <>
              <Form.Group className="mb-3" controlId="formCuratorCheck">
                <Form.Label>Куратор мероприятия</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="event_curator_id"
                  onChange={handleInputChange}
                  required
                  disabled
                >
                  <option value={currentUser.user_id}>
                    {currentUser.name}
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formExecutorList">
                <Form.Label>Исполнитель мероприятия</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="event_executor_id"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Выберите исполнителя</option>
                  {users
                    .filter(
                      (user) =>
                        user.role === "executor" &&
                        user.owner_id === currentUser.user_id
                    )
                    .map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Мобильный номер исполнителя</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="phone"
                  disabled
                  value={
                    formData.event_executor_id &&
                    users.filter(
                      (user) => user.user_id === formData.event_executor_id
                    )[0].phone
                  }
                  type="number"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email исполнителя</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="email"
                  disabled
                  value={
                    formData.event_executor_id &&
                    users.filter(
                      (user) => user.user_id === formData.event_executor_id
                    )[0].email
                  }
                  type="text"
                />
              </Form.Group>
            </>
          </>
        )}
        {currentUser.role === "organizer" && (
          <>
            <>
              <Form.Group className="mb-3" controlId="formCuratorforAdmin">
                <Form.Label>Куратор мероприятия</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="event_curator_id"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Выберите куратора</option>
                  {users
                    .filter((user) => user.role === "curator")
                    .map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formExecutorList">
                <Form.Label>Исполнитель мероприятия</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="event_executor_id"
                  onChange={handleInputChange}
                  disabled={!formData.event_curator_id}
                  required
                >
                  <option value="">Выберите исполнителя</option>
                  {formData.event_curator_id &&
                    users
                      .filter(
                        (user) =>
                          user.role === "executor" &&
                          user.owner_id === formData.event_curator_id
                      )
                      .map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.name}
                        </option>
                      ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Мобильный номер исполнителя</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="phone"
                  disabled
                  value={
                    formData.event_executor_id &&
                    users.filter(
                      (user) => user.user_id === formData.event_executor_id
                    )[0].phone
                  }
                  type="number"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email исполнителя</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="email"
                  disabled
                  value={
                    formData.event_executor_id &&
                    users.filter(
                      (user) => user.user_id === formData.event_executor_id
                    )[0].email
                  }
                  type="text"
                />
              </Form.Group>
            </>
          </>
        )}

        <Form.Group className="mb-3" controlId="formAdress">
          <Form.Label>Адрес проведения мероприятия</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="event_adress"
            required
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Дата проведения мероприятия</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="event_date"
            required
            type="date"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTime">
          <Form.Label>Время проведения мероприятия</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="event_time"
            required
            type="time"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMembers">
          <Form.Label>Максимальное кол-во участников</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="event_max_members"
            required
            type="number"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Описание мероприятия</Form.Label>
          <Form.Text> (Максимум 2000 символов)</Form.Text>
          <Form.Control
            as="textarea"
            rows={6}
            aria-label="With textarea"
            onChange={handleInputChange}
            name="event_description"
            required
            type="text"
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button onClick={handleCloseFn} className="me-2" variant="secondary">
            Отменить
          </Button>
          <Button type="submit" variant="primary">
            Добавить мероприятие
          </Button>
        </div>
      </fieldset>
    </Form>
  );
};
