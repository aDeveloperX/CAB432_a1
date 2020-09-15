import React, { useState } from "react";
import axios from "axios";

const Input = (props) => {
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  const buttonHandler = () => {
    if (value === "" || address === "") {
      alert("Search term or address cannot be empty");
      return;
    }

    axios
      .get(`http://localhost:3000/tests/coordinates?address=${address}`)
      .then((response) => {
        if (response) {
          console.log(response);
          if (response.data === "") {
            alert("invalid address");
          } else {
            props.setCenter(response.data.geometry.location);
            return response.data.geometry.location;
          }
        }
      })
      .then((res) => {
        if (!res) {
          return;
        }
        axios
          .get(
            `http://localhost:3000/tests/businesses?term=${value}&latitude=${res.lat}&longitude=${res.lng}`
          )
          .then((response) => {
            if (response.data.length === 0) {
              alert("no restaurant found, try another keyword");
            }
            props.setResults(response.data);
          });
      });
  };
  return (
    <div>
      <input placeholder="Address" onChange={addressHandler}></input>
      <input placeholder="food" onChange={inputHandler}></input>
      <button onClick={buttonHandler}>Search</button>
    </div>
  );
};

export default Input;
