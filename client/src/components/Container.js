import React, { useState } from "react";
import Map from "./Map";
import Input from "./Input";

const Container = () => {
  const [results, setResults] = useState([]);
  const [center, setCenter] = useState();
  console.log("rerender", center);
  return (
    <div style={{ textAlign: "center" }}>
      <Input setCenter={setCenter} setResults={setResults}></Input>
      <Map results={results} center={center}></Map>
    </div>
  );
};

export default Container;
