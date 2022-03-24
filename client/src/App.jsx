import "./App.css";
import React, { useEffect } from "react";
function App() {
  const callApi = async () => {
    const response = await fetch("/highscore");
    const body = await response.json();
    console.log(body, "hellooooo");
  };
  useEffect(() => {
    callApi();
  }, []);
  return <h1>hello</h1>;
}

export default App;
