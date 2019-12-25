"use strict";
var express = require("express");
var metrics_1 = require("./metrics");
var mongoose = require('mongoose');
var app = express(), handles = require("./handles"), path = require("path"), metrics = require("./metrics"), secur = require("./secur");
var port = process.env.PORT || "8080";
var User = require('./user');
mongoose.connect('mongodb://mongodb:27017/mydb', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () {
    app.set("views", __dirname + "/views");
    app.set("view engine", "ejs");
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
    exports.test = function (req, res) {
        res.render('test');
    };
    app.post('/item/add', function (req, res) {
        User.create({
            email: 'test@Worklet.com',
            password: req.body.password,
            firstName: 'hello',
            lastName: req.body.name
        }).then(function () {
            return res.redirect('/');
        });
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
