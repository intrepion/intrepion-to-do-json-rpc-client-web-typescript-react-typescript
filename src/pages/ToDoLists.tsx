import React, { useEffect, useRef, useState } from "react";
import { AllToDoListsResultType } from "../types/apiTypes";
import { useAuth } from "../context/auth";

type ToDoListType = {
  guid: string;
  title: string;
};

const ToDoLists: React.FC = () => {
  const [loadingNewToDoList, setLoadingNewToDoList] = useState(false);
  const mounted = useRef(true);
  const [title, setTitle] = useState("");
  const [toDoLists, setToDoLists] = useState<ToDoListType[]>([]);
  const { allToDoLists, newToDoList } = useAuth();

  useEffect(() => {
    if (loadingNewToDoList) {
      return;
    }
    mounted.current = true;
    allToDoLists()
      .then((response) => {
        if (response.result) {
          const result = response.result;
          if (mounted.current) {
            const allToDoListsResult = result as AllToDoListsResultType;
            setToDoLists(allToDoListsResult.to_do_lists);
          }
        } else if (response.error) {
          console.error(response.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [allToDoLists, loadingNewToDoList]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const callNewToDoList = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLoadingNewToDoList(true);
    mounted.current = true;
    newToDoList({ title })
      .then((response) => {
        if (response.result) {
          if (mounted.current) {
            setLoadingNewToDoList(false);
            setTitle("");
          }
        } else if (response.error) {
          console.error(response.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>To Do Lists</h2>
      <label htmlFor="title">
        Title: <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      {!loadingNewToDoList && (
        <button onClick={callNewToDoList}>Add New To Do List</button>
      )}
      <p>Previous To Do Lists</p>
      <ul>
        {toDoLists.map((toDoList) => (
          <li key={toDoList.guid}>
            {toDoList.guid} - {toDoList.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoLists;
