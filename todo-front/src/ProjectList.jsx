import AddNew from "./AddNew";
import Project from "./Project";
import ProjectFocus from "./ProjectFocus";
import { useState } from "react";

export default function ProjectList({ projData, setProjData, setModal }) {
  const [activeProject, setActiveProject] = useState();

  return (
    <div className="proj-block-container">
      {activeProject ? (
        <ProjectFocus
          setActiveProject={setActiveProject}
          activeProject={activeProject}
        />
      ) : (
        projData &&
        projData.map((project, index) => {
          return (
            <Project
              key={project.id}
              project={project}
              setActiveProject={setActiveProject}
              index={index}
              projData={projData}
              setProjData={setProjData}
            />
          );
        })
      )}
      {activeProject ? "" : <AddNew setModal={setModal} />}
    </div>
  );
}
