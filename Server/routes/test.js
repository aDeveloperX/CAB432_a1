const axios = require("axios");
var express = require("express");
var router = express.Router();
const publicIp = require("public-ip");

const token =
  "FRctOPFioCkEGcaF8pBiMh6ymEeSSEyBzJvJyWazLN_aKIS1J4bQcwsYEKKDgpIVg037FfMyN3rHrRTmDftDHsI3SZfXuPp5B8Ol0I7KEPROaYhOTy4LfqTOAvHqXXYx";

const apiKey = "AIzaSyDJKoVIlwxHJiMd1ARDZ_WVnwvj18Y0uug";

const getIpAddress = async () => {
  return await publicIp.v4();
};

const getCity = async () => {
  let detail;
  let ipAddress = await getIpAddress();
  let url = `http://ip-api.com/json/${ipAddress}`;
  await axios.get(url).then((response) => {
    detail = response;
  });
  return detail.data.city;
};

router.get("/symbols", async function (req, res) {
  let city = await getCity();
  await axios
    .get("https://api.yelp.com/v3/businesses/search", {
      params: {
        limit: 10,
        term: "chicken",
        location: city,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      //debug
      console.log(response.data.businesses[1]);
      res.json(response.data.businesses);
    });
});

router.get("/google", async function (req, res) {
  const googleURL = `https://maps.googleapis.com/maps/api/directions/json?origin=
    -27.4732, 153.0215
  &destination=
    -27.471204, 153.025268
  &key=AIzaSyDJKoVIlwxHJiMd1ARDZ_WVnwvj18Y0uug`;
  await axios.get(googleURL).then((response) => {
    console.log(response);
  });
});

module.exports = router;
