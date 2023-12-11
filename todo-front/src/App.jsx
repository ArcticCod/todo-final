import { Component, useState } from "react";
import "./App.css";
import ContentContainer from "./ContentContainer";
import Sidebar from "./Sidebar";
import { useEffect } from "react";

function App() {
  const [projData, setProjData] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9000/Projects")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProjData(res);
      });
  }, [modal]);

  return (
    <>
      <div className="main">
        <div className="left">
          <Sidebar />
        </div>
        <div className="content">
          <ContentContainer
            modal={modal}
            setModal={setModal}
            projData={projData}
            setProjData={setProjData}
          />
        </div>
      </div>
    </>
  );
}

export default App;
