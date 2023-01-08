import React, { useState } from "react";
import { useAuth } from "../context/auth";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login } = useAuth();

  const handleLogin = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await login({ username, password });
    if (response.error) {
      console.error(response.error);
    }
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="username">
        Username:{" "}
        <input
          id="name"
          onChange={handleChangeUsername}
          type="text"
          value={username}
        />
      </label>
      <label htmlFor="password">
        Password:{" "}
        <input
          id="password"
          onChange={handleChangePassword}
          type="password"
          value={password}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
