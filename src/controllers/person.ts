import {NextFunction, Request, Response, Router} from "express";
import {Neo4jModel} from "../models/neo4j";

class Person {

    public router;
    private neo4j: Neo4jModel;

    constructor() {
        this.router = Router();
        this.mountRoutes();
        this.neo4j = new Neo4jModel();
    }

    public mountRoutes(): void {

        // Find name on body
        this.router.use((req: Request, res: Response, next: NextFunction) => {

            if (!req.name && req.body.name) {
                req.name = req.body.name;
            }
            next();
        });

        // Find name on uri
        this.router.param("name", (req, res, next, name) => {

            if (name) {
                req.name = name;
            }
            next();
        });

        // Define Person route
        this.router
            .get("/:name", (req: Request, res: Response) => {
                this.neo4j.readPerson(req.name, (person, error) => {

                    if (!error) {
                        res.json({
                            message: person,
                        });
                    } else {
                        res.json(error);
                    }
                });
            })
            .get("/", (req: Request, res: Response) => {
                res.json({
                    message: "name needs to be provided",
                });
            })
            .post("/", (req: Request, res: Response) => {
                this.neo4j.createPerson(req.name, (person, error) => {
                    if (!error) {
                        res.json({
                            message: person,
                        });
                    } else {
                        res.json(error);
                    }
                });
            });
    }
}

export default new Person().router;
