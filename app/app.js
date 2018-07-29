"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var compression = require("compression");
var express = require("express");
var path = require("path");
// Controllers (route handlers)
var home_1 = require("./controllers/home");
var person_1 = require("./controllers/person");
var App = /** @class */ (function () {
    function App() {
        // Get express app
        var app = express();
        // Add statics folder
        var publicPath = path.join(__dirname, "public");
        app.use(express.static(publicPath, { maxAge: 31557600000 }));
        // Compress response
        app.use(compression());
        // support application/json type post data
        app.use(bodyParser.json());
        // Support application/x-www-form-urlencoded post data
        app.use(bodyParser.urlencoded({ extended: true }));
        // Set view engine
        app.set("views", path.join(__dirname, "../views"));
        app.set("view engine", "ejs");
        // Add home routes
        app.use("/api/person", person_1.default);
        app.use("/api", home_1.default);
        app.use("/", home_1.default);
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error("Not Found");
            err.message = "404";
            next(err);
        });
        // error handler
        app.use(function (err, req, res) {
            res.status(err.message || 500);
            res.render("error", { status: err.status, message: err.message });
        });
        // Export app
        this.app = app;
    }
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=app.js.map