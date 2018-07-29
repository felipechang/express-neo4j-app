"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var config_1 = require("./config");
// Get app configuration
var appConfig = config_1.default.app;
// Start Express server
app_1.default.listen(appConfig.port, function () {
    console.log("  app is running at http://localhost:%d in %s mode", appConfig.port, appConfig.env);
    console.log("  Press CTRL-C to stop\n");
});
//# sourceMappingURL=server.js.map