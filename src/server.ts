import express = require("express");
import { MetricsHandler } from "./metrics";
const mongoose = require('mongoose');
const app = express(),
  handles = require("./handles"),
  path = require("path"),
  metrics = require("./metrics");
const port: string = process.env.PORT || "8080";

mongoose.connect('mongodb://mongodb:27017/mydb', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs");

  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.urlencoded({ extended: true }));

  app.use("/", handles);

  app.get("/metrics.json", (req: any, res: any) => {
    MetricsHandler.get((err: Error | null, result?: any) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });

  exports.test = function (req: any, res: any) {
    res.render('test');
  };

app.listen(port, (err: Error) => {
  if (err) {
    throw err;
  }
  console.log(`server's listening on http://localhost:${port}`);
})
}).catch((err: any) => {
  throw err
})

export = {};


