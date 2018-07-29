import app from "./app";
import config from "./config";

// Get app configuration
const appConfig = config.app;

// Start Express server
app.listen(appConfig.port, () => {
    console.log(
        "  app is running at http://localhost:%d in %s mode",
        appConfig.port,
        appConfig.env,
    );
    console.log("  Press CTRL-C to stop\n");
});
