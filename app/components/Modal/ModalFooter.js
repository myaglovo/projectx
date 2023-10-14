"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalFooterEdit = ({ handleCloseFn, handleSubmitFn }) => {
  return (
    <Modal.Footer>
      <Button type="submit" variant="secondary" onClick={handleCloseFn}>
        Отменить
      </Button>
      <Button
        type="submit"
        variant="primary"
        onClick={(e) => handleSubmitFn(e)}
      >
        Добавить
      </Button>
    </Modal.Footer>
  );
};

export const ModalFooterAdd = ({ handleCloseFn, handleSubmitFn }) => {
  return (
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseFn}>
        Отменить
      </Button>
      <Button variant="primary" onClick={handleSubmitFn}>
        Сохранить изменения
      </Button>
    </Modal.Footer>
  );
};
