export default function Project({
  project,
  setActiveProject,
  index,
  projData,
  setProjData,
}) {
  return (
    <div>
      <div id="a4" className="list-block">
        <div className="date">Deadline: {project.due_date}</div>
        <div className="list-name">{project.title}</div>
        <div className="button-container">
          <button
            className="delete"
            onClick={() => {
              fetch(`http://localhost:9000/Projects/${project.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: project.id }),
              })
                .then((res) => res.json())
                .then((res) => {
                  fetch("http://localhost:9000/Projects")
                    .then((res) => res.json())
                    .then((res) => {
                      console.log(res);
                      setProjData(res);
                    });

                  console.log(projData);
                })
                .catch((error) => console.log(error));
            }}
          >
            DELETE
          </button>
          <button
            className="view"
            onClick={() => {
              setActiveProject(projData[index]);
            }}
          >
            VIEW
          </button>
        </div>
      </div>
    </div>
  );
}
