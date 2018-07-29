import {Request, Response} from "express";

/**
 * GET /
 * Home page.
 */
export let home = (req: Request, res: Response) => {
    res.render("home", {
        page: "Home",
    });
};

export default home;
