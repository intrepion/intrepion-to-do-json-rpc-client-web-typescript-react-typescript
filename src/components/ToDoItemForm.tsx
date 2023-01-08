import React, { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { v4 } from "uuid";
import { ToDoItemType } from "../types/ToDoTypes";

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? "http://localhost:3000";

const ToDoItemForm: React.FC = () => {
  const [toDoItems, setToDoItems] = useState<ToDoItemType[]>([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("Hello, world!");

  useEffect(() => {
    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: v4(),
        jsonrpc: "2.0",
        method: "get_all_to_do_items",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result) {
          const result = responseJson.result;
          setToDoItems(result.to_do_items);
        } else if (responseJson.error) {
          console.error(responseJson.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [message]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const callToDo = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: v4(),
        jsonrpc: "2.0",
        method: "new_to_do_item",
        params: { text },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const result = responseJson.result;
        setMessage(result.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>To Do</h2>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={callToDo}>New To Do</button>
      <div>{message}</div>
      <p>Previous ToDoItems</p>
      <ul>
        {toDoItems.map((toDoItem) => (
          <li key={toDoItem.guid}>
            <ToDoItem
              complete={toDoItem.complete}
              guid={toDoItem.guid}
              text={toDoItem.text}
              visible={toDoItem.visible}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoItemForm;
