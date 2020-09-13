import React from "react";

const DetailView = ({ business, weather, dismiss }) => {
  const categories = business.categories.map((each) => (
    <p key={each.title}>{"Categories: " + each.title}</p>
  ));
  console.log(weather);
  return (
    <div
      style={{
        borderRadius: "15px",
        textAlign: "center",
        backgroundColor: "white",
        width: "200px",
        height: "300px",
      }}
    >
      <h3>{business.name}</h3>
      <img
        style={{ width: "170px", height: "100px" }}
        src={business.image_url}
      ></img>
      {categories}
      <p>Phone: {business.phone}</p>
      <p>
        Address: {business.location.address1 + " "}
        {business.location.address2}
        {business.location.address3 + " "}
        {business.location.city} {business.location.zip_code}
      </p>
      <p>{weather.name + ": " + weather.weather[0].description}</p>
      <button onClick={dismiss}>Dismiss</button>
    </div>
  );
};

export default DetailView;
