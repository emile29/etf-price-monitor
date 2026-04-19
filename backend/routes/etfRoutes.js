const express = require("express");
const router = express.Router();
const { 
  loadEtfFile, 
  getLatestPrice, 
  getEtfPriceByTime, 
  getLatestTop5Holdings 
} = require("../services/etfService");

const fs = require("fs");
const csv = require("csv-parser");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/uploadEtfFile", upload.single("file"), (req, res) => {
  const etfData = [];
  const file = req.file.path;
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (data) => etfData.push(data))
    .on("end", () => {
      // delete temp file
      fs.unlinkSync(file);

      try {
        loadEtfFile(etfData);
        for (let c of etfData) {
          c["latestClosePrice"] = getLatestPrice(c.name);
        }

        res.json({ statusCode: 200, message: "ETF File processed successfully", data: etfData });
      } catch (error) {
        res.status(400).json({ statusCode: 400, message: "Error: " + error.message });
      }
    })
    .on("error", (err) => {
      res.status(500).json({ statusCode: 500, message: "Error while processing ETF file!" });
    });
});

router.get("/getEtfPriceByTime", (req, res) => {
  try {
    let result = getEtfPriceByTime();
    res.json({ statusCode: 200, message: "Successfully retrieved ETF price over time", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, message: "Error while retrieving ETF price over time!" });
  }
});

router.get("/getLatestTop5Holdings", (req, res) => {
  try {
    let result = getLatestTop5Holdings();
    res.json({ statusCode: 200, message: "Successfully retrieved latest top 5 holdings", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, message: "Error while retrieving latest top 5 holdings!" });
  }
});

module.exports = router;