"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    app: {
        env: process.env.NODE_ENV || "development",
        port: process.env.PORT || 3000,
    },
    db: {
        host: "bolt://localhost:",
        password: "password",
        port: 7687,
        user: "neo4j",
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map