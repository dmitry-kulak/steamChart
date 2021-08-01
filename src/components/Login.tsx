import React, { useState } from "react";
import { Redirect } from "react-router";

import "./Login.css";

const Login = ({
  isLogged,
  setIsLogged,
}: {
  isLogged: boolean;
  setIsLogged: any;
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",

      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    try {
      let response = await fetch("/api/login", options);
      if (response.status === 200) setIsLogged(true);

      if (!response.ok) {
        if (response.status === 401) {
          setIsLogged(false);
          setError("user");
          throw new Error("Неправильное имя пользователя или пароль");
        } else {
          throw new Error(`HTTP ошибка! Response status: ${response.status}`);
        }
      }
    } catch (err) {
      setError(err.message);
      console.log(err)
    }
  };

  const renderError = () => {
    switch (error) {
      case "user":
        return <span>Неправильное имя пользователя или пароль</span>;
      case "":
        return null;
      default:
        return <span>{error}</span>;
    }
  };

  if (isLogged) return <Redirect push to="/" />;

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Вход</h1>
        {renderError()}
        <input
          type="text"
          placeholder="Логин"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
