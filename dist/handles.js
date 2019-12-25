"use strict";
var express = require("express");
var Router = express.Router();
var User = require('./user');
var f_welcome = function () {
    return "\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <meta charset=\"utf-8\" />\n          <title>Welcome !</title>\n        </head>\n        <body>\n          <h1>Welcome !</h1>\n          <p>you can try going to <a href=\"/hello?name=anonymous\" >this page</a> to be welcomed. </br>\n          Or you can enter url to <a href=\"/hello?name=anonymous\" >127.0.0.1:8080/hello?name=name</a> replacing name with your name </p>\n        </body>\n      </html>\n    ";
};
var f_404 = function () {
    return "\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <meta charset=\"utf-8\" />\n        <title>Page not found</title>\n      </head>\n      <body>\n        <h1>Error 404 : Page not found</h1>\n      </body>\n    </html>\n  ";
};
Router.get("/", function (req, res) {
    res
        .type("html")
        .status(200)
        .render("homepage.ejs");
});
Router.get("/signIn", function (req, res) {
    res
        .type("html")
        .status(200)
        .render("signIn.ejs");
});
Router.get("/signUp", function (req, res) {
    res
        .type("html")
        .status(200)
        .render("signUp.ejs");
});
Router.get("/hello", function (req, res) {
    res
        .type("html")
        .status(200)
        .render("hello.ejs");
});
Router.get('/read', function (req, res) {
    User.find({}).then(function (result) {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(400).send(err.message);
    });
});
Router.get('/write', function (req, res) {
    User.create({
        email: 'helo@world.com',
        password: 'password',
        firstName: 'hello',
        lastName: 'world'
    }).then(function (result) {
        res.status(200).send("User saved !");
    }).catch(function (err) {
        res.status(400).send(err.message);
    });
});
Router.get('/item/add', function (req, res) {
    User.create({
        email: 'test@Worklet.com',
        password: req.body.password,
        firstName: 'hello',
        lastName: req.body.name
    }).then(function () {
        return res.redirect('/');
    });
});
module.exports = Router;
