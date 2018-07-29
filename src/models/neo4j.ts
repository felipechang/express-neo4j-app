import v1 from "neo4j-driver";
import config from "../config";
import {INeo4j} from "../types/neo4j";

class Neo4j {

    // Credentials
    private readonly db: INeo4j;

    constructor() {
        this.db = config.db;
    }

    /**
     * Create a Person node
     * @param {string} personName
     * @param {function} callback
     */
    public createPerson(personName: string, callback: (records: object, error: object) => void): void {
        this.runQuery(
            "CREATE (a:Person {name: $name}) RETURN a",
            {name: personName},
            (records, error) => {

                if (!error) {
                    if (records && records[0]) {
                        const singleRecord = records[0];
                        const node = singleRecord.get(0);
                        callback(node.properties, error);
                    } else {
                        callback(null, {records: "none found"});
                    }
                } else {
                    callback(null, error);
                }
            });
    }

    /**
     * Read a Person node
     * @param personName
     * @param callback
     */
    public readPerson(personName: string, callback: (records: object, error: object) => void): void {
        this.runQuery(
            "MATCH (a:Person {name: $name}) RETURN a",
            {name: personName},
            (records, error) => {

                if (!error) {
                    if (records && records[0]) {
                        const singleRecord = records[0];
                        const node = singleRecord.get(0);
                        callback(node.properties, error);
                    } else {
                        callback(null, {records: "none found"});
                    }
                } else {
                    callback(null, error);
                }
            });
    }

    /**
     * Run query against database
     * @param {string} statement
     * @param {object} parameters
     * @param {function} callback
     */
    private runQuery(statement: string, parameters: object, callback: (result: object, error: object) => void): void {
        const db = this.db;
        const driver = v1.driver(db.host, v1.auth.basic(db.user, db.password));
        const session = driver.session();

        session.run(statement, parameters)
            .then((result) => {

                // Close session
                session.close();

                // Close connection
                driver.close();

                // Operate on result
                callback(result.records, null);
            })
            .catch((error) => {
                callback(null, error);
            });
    }
}

export {Neo4j as Neo4jModel};
