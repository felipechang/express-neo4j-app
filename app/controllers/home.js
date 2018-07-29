"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * GET /
 * Home page.
 */
exports.home = function (req, res) {
    res.render("home", {
        page: "Home",
    });
};
exports.default = exports.home;
//# sourceMappingURL=home.js.map