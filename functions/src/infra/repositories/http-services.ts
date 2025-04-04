/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CollectionReference,
  Firestore,
  DocumentData,
} from "firebase-admin/firestore";
import {IHttpService} from "../../domain/repositories/http-services";
/**
 */
export class HttpServer<T extends DocumentData> implements IHttpService<T> {
  protected collection: CollectionReference<T>;
  /**
   * @param {Firestore} db
   * @param {string} collectionName
   */
  constructor(db: Firestore, collectionName: string) {
    this.collection = db.collection(collectionName) as CollectionReference<T>;
  }
  /**
   * @param {T} data
   * @return {boolean}
   */
  async create(data: T): Promise<boolean> {
    try {
      const doc = JSON.parse(JSON.stringify(data));
      await this.collection.doc(doc.id).create(doc);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  /**
   * @param {string} id
   * @return {T | null}
   */
  async findById(id: string): Promise<T | null> {
    try {
      const doc = await this.collection.doc(id).get();
      const data = doc.data();
      if (data === undefined) {
        return null;
      }
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  /**
   * @return {T[]}
   */
  async findAll(): Promise<T[]> {
    try {
      const collection = await this.collection.get();
      const data = collection.docs.map((data: any) => {
        return data;
      });
      if (data === null) {
        return [];
      }
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  /**
   * @param {string} id
   * @param {Partial<T>} input
   * @return {Promise<boolean>}
   */
  async update(id: string, input: Partial<T>): Promise<boolean> {
    try {
      const data = await this.collection.doc(id).get();
      if (!data.exists) {
        return false;
      }
      const updatedObjectToJson = JSON.parse(JSON.stringify(input));
      await this.collection.doc(id).update(updatedObjectToJson);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  /**
   * @param {string} id
   * @return {Promise<boolean>}
   */
  async delete(id: string): Promise<boolean> {
    try {
      const data = await this.collection.doc(id).get();
      if (!data.exists) {
        return false;
      }
      await this.collection.doc(id).delete();
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
