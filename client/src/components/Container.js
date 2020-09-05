import React, { useState } from "react";
import Map from "./Map";
import Input from "./Input";

const Container = () => {
  const [results, setResults] = useState([]);
  console.log(results);
  return (
    <div style={{ textAlign: "center" }}>
      <Input setResults={setResults}></Input>
      <Map results={results}></Map>
    </div>
  );
};

export default Container;
