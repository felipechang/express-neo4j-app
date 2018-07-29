import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";

// Controllers (route handlers)
import homeController from "./controllers/home";
import personController from "./controllers/person";

class App {

    public app: express.Express;

    constructor() {

        // Get express app
        const app = express();

        // Add statics folder
        const publicPath = path.join(__dirname, "public");
        app.use(express.static(publicPath, {maxAge: 31557600000}));

        // Compress response
        app.use(compression());

        // support application/json type post data
        app.use(bodyParser.json());

        // Support application/x-www-form-urlencoded post data
        app.use(bodyParser.urlencoded({extended: true}));

        // Set view engine
        app.set("views", path.join(__dirname, "../views"));
        app.set("view engine", "ejs");

        // Add home routes
        app.use("/api/person", personController);
        app.use("/api", homeController);
        app.use("/", homeController);

        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            const err = new Error("Not Found");
            err.message = "404";
            next(err);
        });

        // error handler
        app.use((err, req, res) => {
            res.status(err.message || 500);
            res.render("error", {status: err.status, message: err.message});
        });

        // Export app
        this.app = app;
    }
}

export default new App().app;
