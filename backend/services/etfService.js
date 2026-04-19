const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
const ETF = require("../models/ETF");

let loadedEtf;
const historicalData = [];
let historicalDataByLatestTimestamp = [];
const historicalDataFileLocation = path.join(__dirname, '../assets/etf-prices.csv');

function loadHistoricalData() {
  fs.createReadStream(historicalDataFileLocation)
    .pipe(csv())
    .on("data", (data) => historicalData.push(data))
    .on("end", () => {
      // console.log(historicalData);
      historicalDataByLatestTimestamp = historicalData.toSorted((a, b) => new Date(b.DATE) - new Date(a.DATE));
      console.log("Historical data loaded successfully");
    })
    .on("error", (err) => {
      console.log("Error while loading historical data", err);
    });
}

function loadEtfFile(data) {
  let etfData = structuredClone(data);
  loadedEtf = new ETF(etfData);
  console.log('loadedEtf', loadedEtf.toString());
}

function getLatestPrice(constituent) {
  return historicalDataByLatestTimestamp[0][constituent];
}

function getEtfPriceByTime() {
  let historicalDataSorted = historicalData.toSorted((a, b) => new Date(a.DATE) - new Date(b.DATE));
  let result = [];
  for (let etf of historicalDataSorted) {
    let totalPrice = 0;
    for (let [c, price] of Object.entries(etf)) {
      if (c !== "DATE") {
        totalPrice += price * loadedEtf.getWeight(c);
      }
    }
    result.push({ timestamp: etf.DATE, price: totalPrice })
  }
  return result;
}

function getLatestTop5Holdings() {
  let holdings = Array.from({ length: 5 });

  let heap = new MinPriorityQueue((e) => e.size);
  let latestMarketClose = historicalDataByLatestTimestamp[0];
  for (let [c, price] of Object.entries(latestMarketClose)) {
    if (c !== "DATE") {
      let weightedPrice = price * loadedEtf.getWeight(c);
      heap.enqueue({ name: c, price: price, size: weightedPrice });

      if (heap.size() > 5) {
          heap.dequeue();
      }
    }
  }

  for (let i = holdings.length - 1; i >= 0; i--) {
    holdings[i] = heap.dequeue();
  }

  return holdings;
}

module.exports = { 
  loadHistoricalData, 
  loadEtfFile, 
  getLatestPrice,
  getEtfPriceByTime,
  getLatestTop5Holdings
};