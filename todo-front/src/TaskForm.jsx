import { useReducer, useRef } from "react";

export default function TaskForm({
  setNewTaskActive,
  projectID,
  setNeedsRefresh,
}) {
  const form = useRef(null);
  console.log(projectID);

  const submit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9000/Tasks/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.current.title.value,
        prio: form.current.prio.value,
        details: form.current.details.value,
        projects_id: projectID,
      }),
    }).then(() => {
      setNewTaskActive(false);
      setNeedsRefresh(true);
    });
  };
  return (
    <>
      <form
        className="task-form todo-line"
        ref={form}
        onSubmit={submit}
        action=""
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="todo-line todo-line-input"
        />
        <input
          name="prio"
          type="text"
          placeholder="Priority"
          className="todo-line todo-line-input"
        />
        <input
          name="details"
          type="text"
          placeholder="Details"
          className="todo-line todo-line-input"
        />
        <input type="submit" value="Create" className="form-submit"></input>
      </form>
    </>
  );
}
