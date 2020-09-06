import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Pin from "./Pin";
import axios from "axios";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const apiKey = "AIzaSyAoV6Q1CZGGGahEeCKSjTJpnHzRvf9vDBE";
const Map = (props) => {
  const [center, setCenter] = useState();

  useEffect(() => {
    axios.get("http://localhost:3000/tests/coordinates").then((response) => {
      console.log(response.data);
      setCenter({ lat: response.data.latitude, lng: response.data.longitude });
    });
  }, []);

  const results = props.results.map((each) => (
    <Pin
      business={each}
      key={each.id}
      lat={each.coordinates.latitude}
      lng={each.coordinates.longitude}
    />
  ));

  return center === undefined ? null : (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        defaultZoom={12}
      >
        {results}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
