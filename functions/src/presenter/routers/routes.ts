/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from "express";

export type HttpMethod = "get" | "post" | "put" | "delete";

export const HttpMethod = {
  GET: "get" as HttpMethod,
  POST: "post" as HttpMethod,
  PUT: "put" as HttpMethod,
  DELETE: "delete" as HttpMethod,
} as const;

export interface IRoute {
  getHandler(): (req: Request, res: Response) => Promise<any>;
  getPath(): string;
  getMethod(): HttpMethod;
}
