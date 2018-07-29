"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var neo4j_driver_1 = require("neo4j-driver");
var config_1 = require("../config");
var Neo4j = /** @class */ (function () {
    function Neo4j() {
        this.db = config_1.default.db;
    }
    /**
     * Create a Person node
     * @param {string} personName
     * @param {function} callback
     */
    Neo4j.prototype.createPerson = function (personName, callback) {
        this.runQuery("CREATE (a:Person {name: $name}) RETURN a", { name: personName }, function (records, error) {
            if (!error) {
                if (records && records[0]) {
                    var singleRecord = records[0];
                    var node = singleRecord.get(0);
                    callback(node.properties, error);
                }
                else {
                    callback(null, { records: "none found" });
                }
            }
            else {
                callback(null, error);
            }
        });
    };
    /**
     * Read a Person node
     * @param personName
     * @param callback
     */
    Neo4j.prototype.readPerson = function (personName, callback) {
        this.runQuery("MATCH (a:Person {name: $name}) RETURN a", { name: personName }, function (records, error) {
            if (!error) {
                if (records && records[0]) {
                    var singleRecord = records[0];
                    var node = singleRecord.get(0);
                    callback(node.properties, error);
                }
                else {
                    callback(null, { records: "none found" });
                }
            }
            else {
                callback(null, error);
            }
        });
    };
    /**
     * Run query against database
     * @param {string} statement
     * @param {object} parameters
     * @param {function} callback
     */
    Neo4j.prototype.runQuery = function (statement, parameters, callback) {
        var db = this.db;
        var driver = neo4j_driver_1.default.driver(db.host, neo4j_driver_1.default.auth.basic(db.user, db.password));
        var session = driver.session();
        session.run(statement, parameters)
            .then(function (result) {
            // Close session
            session.close();
            // Close connection
            driver.close();
            // Operate on result
            callback(result.records, null);
        })
            .catch(function (error) {
            callback(null, error);
        });
    };
    return Neo4j;
}());
exports.Neo4jModel = Neo4j;
//# sourceMappingURL=neo4j.js.map