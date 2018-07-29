"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var neo4j_1 = require("../models/neo4j");
var Person = /** @class */ (function () {
    function Person() {
        this.router = express_1.Router();
        this.mountRoutes();
        this.neo4j = new neo4j_1.Neo4jModel();
    }
    Person.prototype.mountRoutes = function () {
        var _this = this;
        // Find name on body
        this.router.use(function (req, res, next) {
            if (!req.name && req.body.name) {
                req.name = req.body.name;
            }
            next();
        });
        // Find name on uri
        this.router.param("name", function (req, res, next, name) {
            if (name) {
                req.name = name;
            }
            next();
        });
        // Define Person route
        this.router
            .get("/:name", function (req, res) {
            _this.neo4j.readPerson(req.name, function (person, error) {
                if (!error) {
                    res.json({
                        message: person,
                    });
                }
                else {
                    res.json(error);
                }
            });
        })
            .get("/", function (req, res) {
            res.json({
                message: "name needs to be provided",
            });
        })
            .post("/", function (req, res) {
            _this.neo4j.createPerson(req.name, function (person, error) {
                if (!error) {
                    res.json({
                        message: person,
                    });
                }
                else {
                    res.json(error);
                }
            });
        });
    };
    return Person;
}());
exports.default = new Person().router;
//# sourceMappingURL=person.js.map