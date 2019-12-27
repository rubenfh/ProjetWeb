"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        email: req.body.name,
        password: req.body.password,
        firstName: 'hello',
        lastName: 'world'
    }).then(function (result) {
        res.status(200).send("User saved !");
    }).catch(function (err) {
        res.status(400).send(err.message);
    });
});
Router.get("/hello:id", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    return __generator(this, function (_a) {
        userId = request.params.id;
        /*try {
          if (request.query.search) {
            const searchquery = request.query.search;
            const dataUser = await User.find({ id: userId })
            
            response.render('hello.ejs'), {
              firstName: dataUser.firstName,
              lastName: dataUser.lastName,
              email: dataUser.email
            };
          }
        } catch(err){
      throw new Error(err);
        }*/
        User.find({ id: userId }).then(function (result) {
            response.status(200).json(result);
        }).catch(function (err) {
            response.status(400).send(err.message);
        });
        return [2 /*return*/];
    });
}); });
module.exports = Router;
