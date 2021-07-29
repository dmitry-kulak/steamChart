import React, { useState } from "react";
// import { useEffect, useContext } from "react";
import { Redirect } from "react-router";

const Login = ({
  isLogged,
  setIsLogged,
}: {
  isLogged: boolean;
  setIsLogged: any;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          throw new Error(
            `HTTP ошибка! Пользователь не авторизован. Status: ${response.status}`
          );
        } else {
          throw new Error(`HTTP ошибка! Status: ${response.status}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLogged) return <Redirect push to="/" />;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Логин"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;
