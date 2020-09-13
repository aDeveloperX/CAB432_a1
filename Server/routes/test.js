const axios = require("axios");
var express = require("express");
var router = express.Router();

const yelp_token =
  "FRctOPFioCkEGcaF8pBiMh6ymEeSSEyBzJvJyWazLN_aKIS1J4bQcwsYEKKDgpIVg037FfMyN3rHrRTmDftDHsI3SZfXuPp5B8Ol0I7KEPROaYhOTy4LfqTOAvHqXXYx";

router.get("/coordinates", async function (req, res) {
  const address = req.query.address;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAoV6Q1CZGGGahEeCKSjTJpnHzRvf9vDBE`;
  axios.get(url).then((response) => {
    res.json(response.data.results[0]);
  });
});

router.get("/businesses", async function (req, res) {
  axios
    .get("https://api.yelp.com/v3/businesses/search", {
      params: {
        limit: 15,
        term: req.query.term,
        //location: city,
        latitude: parseFloat(req.query.latitude),
        longitude: parseFloat(req.query.longitude),
      },
      headers: {
        Authorization: `Bearer ${yelp_token}`,
      },
    })
    .then((response) => {
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
