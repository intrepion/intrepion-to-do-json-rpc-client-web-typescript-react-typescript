import React, { useEffect } from "react";
import { redirect } from "react-router-dom";
import { v4 } from "uuid";

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? "http://localhost:3000";

const Logout: React.FC = () => {
  useEffect(() => {
    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: v4(),
        jsonrpc: "2.0",
        method: "logout",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error) {
          console.error(responseJson.error);
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          redirect("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
};

export default Logout;
