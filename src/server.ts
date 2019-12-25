import express = require("express");
import { MetricsHandler } from "./metrics";

const mongoose = require('mongoose');
const app = express(),
  handles = require("./handles"),
  path = require("path"),
  metrics = require("./metrics"),
  secur = require("./secur");
const port: string = process.env.PORT || "8080";
var User = require('./user');


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

  app.post('/item/add', (req:any,res:any) => {
    console.log(req.body.email);
    var pwd = secur.encrypt(JSON.stringify(req.body.password));
    var tabpwd = [];
    tabpwd.push(pwd.iv);
    tabpwd.push(pwd.encryptedData);
    console.log(pwd.iv)

    let iv = Buffer.from(pwd.iv, 'hex');
    let encryptedText = Buffer.from(pwd.encryptedData, 'hex');
    var decripted = secur.decrypt(iv,encryptedText);
    console.log("decripted :::::" + decripted);

    User.create({
      email: req.body.email,
      password : tabpwd,
      firstName : req.body.firstname,
      lastName : req.body.lastname
    }).then(()=>
      res.redirect('/')
    );
  });

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


