const axios = require("axios");
var express = require("express");
var router = express.Router();
const publicIp = require("public-ip");

const yelp_token =
  "FRctOPFioCkEGcaF8pBiMh6ymEeSSEyBzJvJyWazLN_aKIS1J4bQcwsYEKKDgpIVg037FfMyN3rHrRTmDftDHsI3SZfXuPp5B8Ol0I7KEPROaYhOTy4LfqTOAvHqXXYx";

const ipstackKey = "081d8a6d9ce66db11bbed6952d026c6c";
const getIpAddress = async () => {
  return await publicIp.v4();
};

const getCoordiates = async () => {
  let coorindates;
  let ipAddress = await getIpAddress();
  const URL = `http://api.ipstack.com/${ipAddress}?access_key=${ipstackKey}`;
  await axios.get(URL).then((response) => {
    coorindates = response.data;
  });
  return coorindates;
};

const getCity = async () => {
  let detail;
  let ipAddress = await getIpAddress();
  let url = `http://api.ipstack.com/${ipAddress}?access_key=${ipstackKey}`;
  await axios.get(url).then((response) => {
    detail = response;
  });
  return detail.data.city;
};

router.get("/coordinates", async function (req, res) {
  let coordinates = await getCoordiates();

  res.json({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  });
});

router.get("/businesses", async function (req, res) {
  let city = await getCity();
  console.log(req.query);
  axios
    .get("https://api.yelp.com/v3/businesses/search", {
      params: {
        limit: 15,
        term: req.query.term,
        location: city,
      },
      headers: {
        Authorization: `Bearer ${yelp_token}`,
      },
    })
    .then((response) => {
      //debug
      //console.log(response.data.businesses[1]);
      res.json(response.data.businesses);
    });
});

router.get("/weather", function (req, res) {
  console.log(req.query);
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=497120c5cd83232f9fa735837f6399a1`;
  axios.get(URL).then((response) => {
    res.json(response.data);
  });
});

module.exports = router;
