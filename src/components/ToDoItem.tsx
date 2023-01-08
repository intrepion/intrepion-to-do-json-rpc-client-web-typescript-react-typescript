import React from "react";

export interface ToDoItemInterface {
  complete: boolean;
  guid: string;
  text: string;
  visible: boolean;
}

const ToDoItem = (props: ToDoItemInterface) => {
  const { complete, guid, text, visible } = props;

  return (
    <>
      {guid}: {complete}, {text}, {visible}
    </>
  );
};

export default ToDoItem;
