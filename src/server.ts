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
const bodyParser = require('body-parser');




mongoose.connect('mongodb://mongodb:27017/mydb', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  var iduser : string;

  app.set("views", __dirname + "/views");

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

  const MetricsSchema = new mongoose.Schema({
    timestamp: {
      type: String
    },
    value: {
      type: Number,
      required: true
    },
    userid: {
      type: String,
      required: true
    }
  });

  var Metrics = mongoose.model('metric', MetricsSchema);
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/hello", (req:any,res,any) => {
    console.log("id :: " + iduser);
    
    Metrics.find((err:any,metrics:any) => {
      if(err) throw err;
      res.render("hello", {metrics,iduser})
    })
  })

  app.post('/metric/add', (req:any, res:any) => {
    const newMetric = new Metrics({
      timestamp: req.body.timestamp,
      value: req.body.value,
      userid: iduser
    });
  
    newMetric.save().then((met:any) => res.redirect('/hello'));
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
    tabpwd.push(pwd.key);
    console.log(pwd.iv);
    console.log(pwd.key);
    

    // let iv = Buffer.from(pwd.iv, 'hex');
    // let encryptedText = Buffer.from(pwd.encryptedData, 'hex');
    // var decripted = secur.decrypt(iv,encryptedText);
    // console.log("decripted :::::" + decripted);

    User.create({
      email: req.body.email,
      password : tabpwd,
      firstName : req.body.firstname,
      lastName : req.body.lastname
    }).then(()=>
      res.redirect('/')
    ).catch((err:any) => {
      res.status(400).send(err.message);
    });
  });

  app.post('/signin_verif', (req:any,res:any)=> {
    const mail = req.body.email;
    console.log("verification mail")

    User.find({"email":mail}).then((result:any) => {
      console.log("mail trouvé ---- verification pwd");
      
      User.find({"email":mail},{"password":1}).then((pwd:any) => {
        var iv1 = pwd[0].password[0].toString('hex');
        var encdata = pwd[0].password[1].toString('hex');
        var key1 = pwd[0].password[2].toString('hex');

        let iv = Buffer.from(iv1, 'hex');
        let encryptedText = Buffer.from(encdata, 'hex');
        let key =Buffer.from(key1,'hex');

        var decripted = secur.decrypt(iv,encryptedText,key);
        decripted = decripted.toString();
        var password = req.body.password.toString();
        password = "\""+password+"\""

        if(decripted == password){
          console.log("pwd :: ok");
          console.log(pwd[0]._id);
          iduser = pwd[0]._id;
          res.redirect("/hello");
          const id=pwd[0]._id;
          console.log(id);
        }else{
          console.log("pwd :: not ok");
          
        }

      }).catch((err:any)=>{
        res.status(400).send(err.message);
      })

    }).catch((err:any) => {
      err.message = "email :: not find";
      res.status(400).send(err.message);
    });
  });
  

  app.get("/hello", (req:any,res:any) => {
    res.render("hello");
  })

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


