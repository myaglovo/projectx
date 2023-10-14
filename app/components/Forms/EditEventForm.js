"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useRef } from "react";
import ImageComponent from "../ImageComponent/ImageComponent";

export const EditEventForm = ({
  handleSubmitEditFn,
  handleCloseFn,
  currentEntityObject,
  currentRole,
  data,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [currentEventData, setCurrentEventData] = useState(false);
  const [fileError, setFileError] = useState("");
  const [imageURL, setImageURL] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    event_image: null,
    event_title: "",
    event_group: "",
    event_adress: "",
    event_date: "",
    event_time: "",
    event_max_members: "",
    event_description: "",
    event_id: "",
  });

  const fileInputRef = useRef(null);

  const handleChangeEditMode = () => {
    setEditMode(true);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const file = formData.event_image;
    data = {
      event_id: formData.event_id,
      event_title: formData.event_title,
      event_group: formData.event_group,
      event_adress: formData.event_adress,
      event_date: formData.event_date,
      event_time: formData.event_time,
      event_max_members: formData.event_max_members,
      event_description: formData.event_description,
    };
    try {
      const newFormData = new FormData();
      newFormData.append("data", JSON.stringify(data));
      newFormData.append("file", file);
      handleSubmitEditFn(newFormData, formData.event_id);
    } catch (e) {
      console.error(e);
    }
  };

  const handlerFileMount = () => {
    const image = data.find(
      (event) => event.event_id === currentEntityObject.event_id
    ).event_image;

    if (image) {
      const uint8Array = new Uint8Array(image.data);
      const blob = new Blob([uint8Array], { type: "image/jpg" });
      const url = URL.createObjectURL(blob);
      setImageURL(url);
      return () => {
        URL.revokeObjectURL(url);
      };
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
        setImageURL(URL.createObjectURL(blob));
        setFileError("");
        setFormData((prevState) => ({
          ...prevState,
          event_image: currentFile,
        }));
      }
    }
  };

  useEffect(() => {
    if (currentEntityObject) {
      const eventDate = currentEntityObject.event_date;
      const eventDateObject = new Date(eventDate);
      const year = eventDateObject.getFullYear();
      const month = String(eventDateObject.getMonth() + 1).padStart(2, "0");
      const day = String(eventDateObject.getDate()).padStart(2, "0");
      const formattedEventDateObject = `${year}-${month}-${day}`;

      setCurrentEventData(
        data.find((event) => event.event_id === currentEntityObject.event_id)
      );
      handlerFileMount();

      setFormData({
        ...formData,
        event_title: currentEntityObject.event_title,
        event_group: currentEntityObject.event_group,
        event_adress: currentEntityObject.event_adress,
        event_date: formattedEventDateObject,
        event_time: currentEntityObject.event_time,
        event_max_members: currentEntityObject.event_max_members,
        event_description: currentEntityObject.event_description,
        event_id: currentEntityObject.event_id,
      });
    }
  }, [currentEntityObject]);

  console.log(formData);

  return (
    <Form onSubmit={submitFormHandler}>
      <fieldset disabled={!editMode}>
        {imageURL && (
          <>
            <div className="mb-3">
              <ImageComponent imageURL={imageURL} aspectRatio="21x9" />
            </div>
          </>
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
        <Form.Group className="mb-3" controlId="formCuratorName">
          <Form.Label>ФИО куратора</Form.Label>
          <Form.Control
            name="event_curator_name"
            required
            disabled
            value={currentEventData.curatorData?.name}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formExecutorName">
          <Form.Label>ФИО исполнителя</Form.Label>
          <Form.Control
            name="event_executor_name"
            required
            disabled
            value={currentEventData.executorData?.name}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Наименование мероприятия</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="event_title"
            required
            value={formData.event_title}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formThematic">
          <Form.Label>Тематическая группа мероприятия</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="event_group"
            onChange={handleInputChange}
            value={formData.event_group}
            required
          >
            <option value="">Выберите тематическую группу</option>
            <option value="culture">Культура</option>
            <option value="sport">Спорт</option>
            <option value="education">Образование</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAdress">
          <Form.Label>Адрес проведения мероприятия</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="event_adress"
            required
            value={formData.event_adress}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Дата проведения мероприятия</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="event_date"
            value={formData.event_date}
            required
            type="date"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTime">
          <Form.Label>Время проведения мероприятия</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="event_time"
            value={formData.event_time}
            required
            type="time"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMembers">
          <Form.Label>Максимальное кол-во участников</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="event_max_members"
            value={formData.event_max_members}
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
            value={formData.event_description}
            required
            type="text"
          />
        </Form.Group>
      </fieldset>
      <div className="d-flex justify-content-end">
        <Button onClick={handleCloseFn} className="me-2" variant="secondary">
          Отменить
        </Button>
        {!editMode && currentRole !== "coordinator" && (
          <Button onClick={handleChangeEditMode} variant="primary">
            Редактировать мероприятие
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
};
