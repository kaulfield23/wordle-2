import "./App.css";
import React, { useEffect } from "react";
function App() {
  const callApi = async () => {
    const response = await fetch("/api");
    const body = await response.json();
    console.log(body, "hellooooo");
  };
  useEffect(() => {
    callApi();
  }, []);
  return <h1>hello ssibal</h1>;
}

export default App;
