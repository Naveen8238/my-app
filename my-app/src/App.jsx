import React, { useState } from "react";

const App = () => {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    id: "",
  });
  const [edit, setEdit] = useState({
    id: "",
    isEditing: false,
  });
  const changeMessage = (e) => {
    setMessage({
      ...message,
      text: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      text: message.text,
      id: new Date().getTime().toString(),
    };
    setList([...list, obj]);
    setMessage({
      text: "",
      id: "",
    });
  };
  const handleDelte = (id) => {
    let newTodo = list.filter((eachItem) => {
      return eachItem.id !== id;
    });
    setList(newTodo);
  };
  const handleEdit = (e, id) => {
    e.preventDefault();
    setEdit({
      ...edit,
      id: id,
      isEditing: true,
    });
    let editItem = list.find((eachItem) => {
      return eachItem.id === id;
    });
    setMessage({
      ...message,
      id: editItem.id,
      text: editItem.text,
    });
  };
  const ChangeEdit = (e) => {
    e.preventDefault();
    let newTodos = list.map((eachItem) => {
      if (eachItem.id === edit.id) {
        return {
          text: message.text,
          id: edit.id,
        };
      } else {
        return eachItem;
      }
    });
    setList(newTodos);
    setMessage({
      ...message,
      id: "",
      text: "",
    });
    setEdit({
      id: "",
      isEditing: false,
    });
  };
  return (
    <>
      <form>
        <input
          text="text"
          name="message"
          id="message"
          value={message.text}
          onChange={changeMessage}
        />
        {edit.isEditing ? (
          <button onClick={ChangeEdit}>Edit</button>
        ) : (
          <button type="submit" onClick={handleSubmit}>
            ADD
          </button>
        )}
        <hr />
        <ul>
          {list.length <= 0 && <h1>There is no items</h1>}
          {list.map((eachItem) => {
            const { text, id } = eachItem;
            return (
              <li key={id}>
                <span>{text}</span>
                <button type="submit" onClick={() => handleDelte(id)}>
                  {" "}
                  DELETE
                </button>
                <button type="submit" onClick={(e) => handleEdit(e, id)}>
                  EDIT
                </button>
              </li>
            );
          })}
        </ul>
      </form>
    </>
  );
};
export default App;
