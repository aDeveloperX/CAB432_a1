import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Pin from "./Pin";
import axios from "axios";

const apiKey = "AIzaSyAoV6Q1CZGGGahEeCKSjTJpnHzRvf9vDBE";
const Map = (props) => {
  const results = props.results.map((each) => (
    <Pin
      business={each}
      key={each.id}
      lat={each.coordinates.latitude}
      lng={each.coordinates.longitude}
    />
  ));

  const center =
    props.center === undefined
      ? { lat: -27.457371, lng: 153.033438 }
      : props.center;

  console.log("center: ", center);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        center={center}
        defaultZoom={12}
      >
        {results}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
