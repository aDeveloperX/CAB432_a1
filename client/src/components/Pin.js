import React, { useState, useEffect } from "react";
import imgpin from "../imgs/imgpin.png";
import DetailView from "./DetailView";
import axios from "axios";

const Pin = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [weather, setWeather] = useState();
  const pinClickHandler = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/tests/weather?lat=${props.business.coordinates.latitude}&lon=${props.business.coordinates.longitude}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return isExpanded ? (
    <DetailView
      business={props.business}
      weather={weather}
      dismiss={pinClickHandler}
    ></DetailView>
  ) : (
    <img
      style={{ width: "15px", height: "25px" }}
      src={imgpin}
      onClick={pinClickHandler}
    ></img>
  );
};

export default Pin;
