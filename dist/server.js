"use strict";
var express = require("express");
var metrics_1 = require("./metrics");
var mongoose = require('mongoose');
var app = express(), handles = require("./handles"), path = require("path"), metrics = require("./metrics"), secur = require("./secur");
var port = process.env.PORT || "8080";
var User = require('./user');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://mongodb:27017/mydb', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () {
    var iduser;
    app.set("views", __dirname + "/views");
    app.use(express.static(path.join(__dirname, "public")));
    app.use(express.urlencoded({ extended: true }));
    app.use("/", handles);
    app.get("/metrics.json", function (req, res) {
        metrics_1.MetricsHandler.get(function (err, result) {
            if (err) {
                throw err;
            }
            res.json(result);
        });
    });
    var MetricsSchema = new mongoose.Schema({
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
    app.get("/hello", function (req, res, any) {
        console.log("id :: " + iduser);
        Metrics.find(function (err, metrics) {
            if (err)
                throw err;
            res.render("hello", { metrics: metrics, iduser: iduser });
        });
    });
    app.post('/metric/add', function (req, res) {
        var newMetric = new Metrics({
            timestamp: req.body.timestamp,
            value: req.body.value,
            userid: iduser
        });
        newMetric.save().then(function (met) { return res.redirect('/hello'); });
    });
    exports.test = function (req, res) {
        res.render('test');
    };
    app.post('/item/add', function (req, res) {
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
            password: tabpwd,
            firstName: req.body.firstname,
            lastName: req.body.lastname
        }).then(function () {
            return res.redirect('/');
        }).catch(function (err) {
            res.status(400).send(err.message);
        });
    });
    app.post('/signin_verif', function (req, res) {
        var mail = req.body.email;
        console.log("verification mail");
        User.find({ "email": mail }).then(function (result) {
            console.log("mail trouvé ---- verification pwd");
            User.find({ "email": mail }, { "password": 1 }).then(function (pwd) {
                var iv1 = pwd[0].password[0].toString('hex');
                var encdata = pwd[0].password[1].toString('hex');
                var key1 = pwd[0].password[2].toString('hex');
                var iv = Buffer.from(iv1, 'hex');
                var encryptedText = Buffer.from(encdata, 'hex');
                var key = Buffer.from(key1, 'hex');
                var decripted = secur.decrypt(iv, encryptedText, key);
                decripted = decripted.toString();
                var password = req.body.password.toString();
                password = "\"" + password + "\"";
                if (decripted == password) {
                    console.log("pwd :: ok");
                    console.log(pwd[0]._id);
                    iduser = pwd[0]._id;
                    res.redirect("/hello");
                    var id = pwd[0]._id;
                    console.log(id);
                }
                else {
                    console.log("pwd :: not ok");
                }
            }).catch(function (err) {
                res.status(400).send(err.message);
            });
        }).catch(function (err) {
            err.message = "email :: not find";
            res.status(400).send(err.message);
        });
    });
    app.get("/hello", function (req, res) {
        res.render("hello");
    });
    app.listen(port, function (err) {
        if (err) {
            throw err;
        }
        console.log("server's listening on http://localhost:" + port);
    });
}).catch(function (err) {
    throw err;
});
module.exports = {};
