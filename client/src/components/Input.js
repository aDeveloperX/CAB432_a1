import React, { useState } from "react";
import axios from "axios";

const Input = (props) => {
  const [value, setValue] = useState("");
  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  const buttonHandler = async () => {
    if (value === "") {
      alert("Search term cannot be empty");
      return;
    }
    await axios
      .get("http://localhost:3000/tests/businesses", {
        params: { term: value },
      })
      .then((response) => props.setResults(response.data));
  };
  return (
    <div>
      <input onChange={inputHandler}></input>
      <button onClick={buttonHandler}>Search</button>
    </div>
  );
};

export default Input;
