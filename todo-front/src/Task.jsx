import { useState } from "react";
import { useReducer, useRef } from "react";

export default function Task({
  setTaskData,
  task,
  index,
  projectID,
  setNeedsRefresh,
}) {
  const [edit, setEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const form = useRef(null);

  const toggleStatus = () => {
    console.log(task.status);
    let newStatus = "";
    newStatus = task.status ? 0 : 1;
    console.log(newStatus);
    fetch(`http://localhost:9000/Tasks/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        details: task.details,
        prio: task.prio,
        status: newStatus,
        id: task.id,
      }),
    }).then(() => {
      setNeedsRefresh(true);
      newStatus ? setIsChecked(true) : setIsChecked(false);
    });
  };

  const deleteTask = () => {
    console.log("tried");
    fetch(`http://localhost:9000/Tasks/${task.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id }),
    })
      .then((res) => res.json())
      .then(setNeedsRefresh(true))
      .catch((error) => console.log(error));
  };

  const submit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9000/Tasks/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.current.title.value,
        prio: form.current.prio.value,
        details: form.current.details.value,
        status: task.status,
        id: task.id,
      }),
    }).then(() => {
      setEdit(false);
      setNeedsRefresh(true);
    });
  };
  return (
    <div>
      {edit ? (
        <>
          <form className="task-form" ref={form} onSubmit={submit} action="">
            <input
              name="title"
              type="text"
              defaultValue={task.title}
              placeholder={task.title}
              className="todo-line todo-line-input"
            />
            <input
              name="prio"
              type="text"
              defaultValue={task.prio}
              placeholder={task.prio}
              className="todo-line todo-line-input"
            />
            <input
              name="details"
              type="text"
              defaultValue={task.details}
              placeholder={task.details}
              className="todo-line todo-line-input"
            />
            <input type="submit" value="Create" className="form-submit"></input>
          </form>
        </>
      ) : (
        <div className="todo-line">
          {task.status && task.status ? (
            <button
              onClick={toggleStatus}
              className="todo-check-mark-checked"
            ></button>
          ) : (
            <button onClick={toggleStatus} className="todo-check-mark-empty" />
          )}

          <p className="task-title">{task.title}:</p>
          <div className="task-prio">{task.prio}</div>
          <button className="task-edit" onClick={() => setEdit(true)}>
            EDIT
          </button>
          <button className="task-delete" onClick={deleteTask}>
            DELETE
          </button>
        </div>
      )}
    </div>
  );
}
