/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {CollectionReference, Firestore} from "firebase-admin/firestore";
/**
 */
export class HttpServer<T extends {id: string}> {
  protected collection: CollectionReference<T>;
  /**
   * @param {Loki} db
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
      this.collection.doc(doc._id).create(doc);
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
      console.log("data", data);
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
    const collection = await this.collection.get();
    const data = collection.docs.map((data: any) => {
      return data;
    });
    if (data === null) {
      return [];
    }
    return data;
  }
  /**
   * @param {string} id
   * @param {Partial<T>} input
   * @param {any} EntityClass
   * @return {Promise<boolean>}
   */
  async update<T extends object & {id: string}>(
    id: any,
    input: Partial<T>,
  ): Promise<boolean> {
    try {
      const data = this.collection.doc(id).get();
      if (data === undefined) {
        return false;
      }
      const updatedObject: {[key: string]: any} = {};
      for (const [key, value] of Object.entries(input)) {
        if (value !== undefined && key !== "id") {
          updatedObject[key] = value;
        }
      }
      this.collection.doc(id).update(updatedObject);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  /**
   * @param {string} id
   * @return {Promise<boolean>}
   */
  async delete(id: any): Promise<boolean> {
    try {
      const data = this.collection.doc(id);
      if (data === undefined) {
        return false;
      }
      this.collection.doc(id).delete();
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
