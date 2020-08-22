const axios = require("axios");
var express = require("express");
var router = express.Router();

router.get("/symbols", async function (req, res) {
  await axios
    .get("https://api.yelp.com/v3/businesses/search", {
      params: {
        limit: 2,
        term: "chicken",
        location: "brisbane",
      },
      headers: {
        Authorization:
          "Bearer FRctOPFioCkEGcaF8pBiMh6ymEeSSEyBzJvJyWazLN_aKIS1J4bQcwsYEKKDgpIVg037FfMyN3rHrRTmDftDHsI3SZfXuPp5B8Ol0I7KEPROaYhOTy4LfqTOAvHqXXYx",
      },
    })
    .then((response) => {
      console.log(response);
      res.json(response.data);
    });
});

module.exports = router;
