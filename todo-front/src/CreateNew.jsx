import { useRef } from "react";

export default function CreateNew({ setModal }) {
  const form = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    var formData = new FormData(form.current);
    console.log(formData);
    fetch(`http://localhost:9000/Projects/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.current.title.value,
        prio: form.current.prio.value,
        description: form.current.description.value,
      }),
    }).then(() => setModal(false));
  };

  return (
    <div className="background">
      <div className="field-container">
        <h2>Add New Project</h2>
        <form ref={form} onSubmit={submit} className="new-project-form">
          <div className="title field">
            <label htmlFor="">Title</label>
            <input name="title" type="text" />
          </div>
          <div className="prio field">
            <label htmlFor="">Priority</label>
            {/* change type to select element for dropdown */}
            <select required name="prio" type="text">
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="description field">
            <label htmlFor="">Description</label>
            <textarea name="description" />
          </div>
          <button onClick={() => setModal(false)}>Back</button>
          <input type="submit" value="Create" className="form-submit"></input>
        </form>
      </div>
    </div>
  );
}
