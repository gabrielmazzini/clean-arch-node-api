"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExpress = void 0;
const express_1 = __importDefault(require("express"));
/**
 */
class ApiExpress {
    app;
    /**
     * @param {Route} routes
     */
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.addRoutes(routes);
    }
    /**
     * @param {Route} routes
     * @return {ApiExpress}
     */
    static create(routes) {
        return new ApiExpress(routes);
    }
    /**
     * @param {Route} routes
     */
    addRoutes(routes) {
        routes.forEach((routes) => {
            const path = routes.getPath();
            const method = routes.getMethod();
            const handler = routes.getHandler();
            this.app[method](path, handler);
        });
    }
    /**
     * @return {Express}
       */
    start() {
        this.listen();
        this.listRoutes();
        return this.app;
    }
    /**
     */
    listRoutes() {
        const routes = this.app._router.stack
            .filter((route) => route.route)
            .map((router) => {
            return {
                path: router.route.path,
                method: router.route.method,
            };
        });
        console.log(routes);
    }
    /**
     */
    listen() {
        this.app.listen(8080, () => {
            console.log("Server Listen on port 8080");
        });
    }
}
exports.ApiExpress = ApiExpress;
