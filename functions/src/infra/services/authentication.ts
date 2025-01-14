/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {NextFunction, RequestHandler, Response} from "express";
import admin = require("firebase-admin");
import {AuthenticatedRequest} from "../../domain/interfaces/autenticate-request";
/**
 */
export class Autentication {
  /**
   * @param {AuthenticatedRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Response}
   */
  public static autentication: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({message: "Invalid token"});
    }
    try {
      const decodedIdToken = await admin.auth().verifyIdToken(token, true);
      if (!decodedIdToken) return res.status(401).json("Not authorized");
      req.user = {
        uid: decodedIdToken.sub,
        email: decodedIdToken.email,
      };
      return next();
    } catch (error) {
      res.status(401).json({error: error});
    }
  };
}
