var express = require("express");
var router = express.Router();

//get all stocks

router.get("/symbols", function (req, res) {});

router.get("/:symbol", function (req, res) {});

router.get("/authed/:symbol", function (req, res) {});

module.exports = router;
