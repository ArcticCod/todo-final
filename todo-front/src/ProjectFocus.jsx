import { useDebugValue, useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";

export default function ProjectFocus({ setActiveProject, activeProject }) {
  console.log(activeProject);
  const [taskData, setTaskData] = useState();
  const [newTaskActive, setNewTaskActive] = useState(false);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9000/Tasks")
      .then((res) => res.json())
      .then((res) => {
        setTaskData(res);
        setNeedsRefresh(false);
      });
  }, [needsRefresh]);
  return (
    <div className="todo-content">
      <div className="todo-container">
        <div className="todo-header">
          {activeProject.title}
          <button
            className="close-list"
            onClick={() => {
              setActiveProject();
            }}
          >
            &lt;-{" "}
          </button>
        </div>
        <div className="task-holder">
          <div className="todo-line">
            <p className="task-title task-header">Task:</p>
            <div className="task-prio">Priority:</div>
          </div>
          {taskData &&
            taskData.map((task, index) => {
              if (task.projects_id === activeProject.id) {
                return (
                  <Task
                    setNeedsRefresh={setNeedsRefresh}
                    projectID={activeProject.id}
                    key={task.id}
                    task={task}
                    index={index}
                    setTaskData={setTaskData}
                  />
                );
              }
            })}
        </div>
        {newTaskActive ? (
          <TaskForm
            setNeedsRefresh={setNeedsRefresh}
            setNewTaskActive={setNewTaskActive}
            projectID={activeProject.id}
          />
        ) : (
          <div className="new-todo todo-line">
            <button
              onClick={() => setNewTaskActive(true)}
              className="new-todo-marker "
            >
              +
            </button>
            <button
              onClick={() => setNewTaskActive(true)}
              className="new-todo-button"
            >
              Add new Todo
            </button>
          </div>
        )}

        <button
          className="delete proj-delete-todo"
          onClick={() => {
            const myTest = (project) => project.id === activeProject.id;
            let index = projectsArr.findIndex(myTest);
            projectsArr.splice(index, 1);
            setActiveProject();
          }}
        >
          Delete Project Not Working
        </button>
      </div>
    </div>
  );
}
