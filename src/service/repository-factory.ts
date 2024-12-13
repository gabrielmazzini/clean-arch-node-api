import * as Loki from 'lokijs';
import { HttpServer } from './http-services';
import { UserRepository } from '../infra/repositories/lokiJs/user-repository-lokijs';
import { AdminRespositoryLokijs } from '../infra/repositories/lokiJs/adm-repository-loki';

export class RepositoryFactory {
    private db: Loki;

    constructor(db: Loki) {
        this.db = db;
    };

    getRepository<T extends object & {id: string}>(type: string): HttpServer<T> {
        switch (type) {
            case "user":
                return UserRepository.create(this.db) as unknown as HttpServer<T>;
            case "admin":
                return AdminRespositoryLokijs.create(this.db) as unknown as HttpServer<T>;
            default:
                throw new Error(`Unknown repository type: ${type}`);
        };
    };
};