/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-empty */
/* eslint-disable max-len */
import * as admin from "firebase-admin";
import {IDatabase} from "../../domain/repositories/database";
import {Firestore} from "firebase-admin/firestore";
const serviceAccount = require("./teste-esqueleton-backend-firebase-adminsdk-f1lva-f845fc0e93.json");
/**
 */
export class Database implements IDatabase {
  /**
   */
  public init(): void {
    try {
      const app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      app.firestore().settings({ignoreUndefinedProperties: true});
    } catch (e) {}
  }
  /**
   * @return {Firestore}
   */
  public static getInstance(): Firestore {
    return new Firestore();
  }
}
