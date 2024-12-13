import * as Loki from 'lokijs';
import { User } from '../domain/entity/user/UserEntity';

export class HttpServer<T extends object & {id: string}> {
    protected collection: Collection<T>;

    constructor(db: Loki, collectionName: string) {
        this.collection = db.addCollection<T>(collectionName);
    };

    async create(data: T): Promise<boolean> {
        try {
            this.collection.insert(data);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    async findById(id: any): Promise<T | null> {
        try {
            const data = this.collection.findOne({id});
            console.log("data", data);
            if (data === null) {
                return null;
            };
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        };
    };

    async findAll(): Promise<T[]> {
        const data = this.collection.find().map((data) => {
            return data;
        });
        if (data === null) {
            return [];
        };
        return data;
    };

    async update<T extends object & { id: string }>(
        id: any,
        input: Partial<T>,
        EntityClass: new (data: T) => T
      ): Promise<boolean> {
        try {
          const data = this.collection.findOne({ id });
          if (data === null) {
            return false;
          }
          const { $loki, meta, ...cleanData } = data;
          const updatedObject: { [key: string]: any } = {};
          for (const [key, value] of Object.entries(input)) {
            if (value !== undefined && key !== "_id") {
              updatedObject[key] = value;
            }
          }
          const updatedData = {...data, ...updatedObject};
          this.collection.update(updatedData);
          return true;
        } catch (error: any) {
          throw new Error(error.message);
        }
      }

    async delete(id: any): Promise<boolean> {
        try {
            const data = this.collection.findOne({id});
            if(data === null) {
                return false;
            };
            this.collection.remove(data);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        };
    };
};