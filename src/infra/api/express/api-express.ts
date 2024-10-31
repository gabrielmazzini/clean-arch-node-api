/* eslint-disable @typescript-eslint/no-explicit-any */
import {IApi} from "../api";
import express, {Express} from "express";
import {IRoute} from "../../../presenter/routers/routes";

/**
 */
export class ApiExpress implements IApi {
  private app: Express;
  /**
   * @param {Route} routes
   */
  private constructor(routes: IRoute[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  }
  /**
   * @param {Route} routes
   * @return {ApiExpress}
   */
  public static create(routes: IRoute[]) {
    return new ApiExpress(routes);
  }
  /**
   * @param {Route} routes
   */
  private addRoutes(routes: IRoute[]) {
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
  public start() {
    this.listen();
    this.listRoutes();
    return this.app;
  }
  /**
   */
  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((router: any) => {
        return {
          path: router.route.path,
          method: router.route.method,
        };
      });
    console.log(routes);
  }
  /**
   */
  private listen() {
    this.app.listen(8080, () => {
      console.log("Server Listen on port 8080");
    })
  }
}
