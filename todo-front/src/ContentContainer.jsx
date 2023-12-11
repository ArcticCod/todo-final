import { useState } from "react";
import Login from "./Login";
import ProjectFocus from "./ProjectFocus";
import ProjectList from "./ProjectList";
import CreateNew from "./CreateNew";

export default function ContentContainer({
  projData,
  setProjData,
  modal,
  setModal,
}) {
  const [loggedIn, setLoggedIn] = useState(true);

  console.log(loggedIn);
  return (
    <div>
      {loggedIn ? (
        modal ? (
          <CreateNew setModal={setModal} />
        ) : (
          <ProjectList
            projData={projData}
            setProjData={setProjData}
            modal={modal}
            setModal={setModal}
          />
        )
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}
