"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SpinnerComponent from "../components/Loaders/Spinner";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userInfo.email || !userInfo.password) {
        setError("Все поля обязательные");
        return;
      }

      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
      });

      if (res.error) {
        setError("Неправильные данные");
        return;
      }

      router.replace("events");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centered-form">
      <div className="custom-container">
        <h1 className="mb-3 text-center">Вход в систему</h1>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={userInfo.email}
              onChange={({ target }) => {
                setUserInfo({ ...userInfo, email: target.value });
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              value={userInfo.password}
              onChange={({ target }) => {
                setUserInfo({ ...userInfo, password: target.value });
              }}
            />
          </Form.Group>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
          <Button variant="primary" type="submit">
            {loading ? <SpinnerComponent color="light" /> : "Войти"}
          </Button>
          <Form.Text className="text-center">
            Забыли пароль? Обратитесь на почту example@mail.com
          </Form.Text>
        </Form>
      </div>
    </div>
  );
};

export default Login;
