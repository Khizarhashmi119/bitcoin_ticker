require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const amt = req.body.amt;
  const crypto = req.body.crypto;
  const fiat = req.body.fiat;
  const option = {
    method: "GET",
    url: "https://pro-api.coinmarketcap.com/v1/tools/price-conversion",
    qs: {
      symbol: crypto,
      amount: amt,
      convert: fiat
    },
    headers: {
      "X-CMC_PRO_API_KEY": process.env.API_KEY
    },
    json: true,
    gzip: true
  };
  request(option, function(error, response, body) {
    if (!error) {
      res.send(body);
    } else {
      console.log(error);
      res.send("Error!, something went wrong please try again later");
    }
  });
});

app.listen(3000, function() {
  console.log("Server has been started at port no. 3000");
});
