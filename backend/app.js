const express = require("express");
const cors = require("cors");
const routes = require("./routes/etfRoutes");
const { loadHistoricalData } = require("./services/etfService");

const app = express();
app.use(cors());
app.use(express.json());

app.use('*', function(req, res, next) {
  console.log(req.method + ' ' + req.originalUrl);
  return next();
});

app.use("/api", routes);

loadHistoricalData();

app.listen(3001, () => console.log("Backend running on port 3001"));