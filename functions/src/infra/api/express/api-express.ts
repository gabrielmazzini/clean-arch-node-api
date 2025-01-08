/* eslint-disable valid-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {IApi} from "../api";
import {Express} from "express";
import * as express from "express";
import {IRoute} from "../../../presenter/routers/routes";
import * as cors from "cors";
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
    this.app.use(cors({origin: true}));
    this.app.use(express.urlencoded({extended: true}));
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
    this.listRoutes();
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
  public getApp() {
    return this.app;
  }
}
