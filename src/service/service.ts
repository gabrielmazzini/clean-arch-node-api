import { RepositoryFactory } from "./repository-factory";

export class Service {
    private repositoryFactory: RepositoryFactory;
  
    constructor(repositoryFactory: RepositoryFactory) {
      this.repositoryFactory = repositoryFactory;
    }
  
    async create<T extends object & {id: string}>(type: string, data: T): Promise<boolean> {
      const repository = this.repositoryFactory.getRepository<T>(type);
      return repository.create(data);
    }
  
    async read<T extends object & {id: string}>(type: string, id: string): Promise<T | null> {
      const repository = this.repositoryFactory.getRepository<T>(type);
      console.log(repository.findById(id));
      return repository.findById(id);
    }

    async readAll<T extends object & {id: string}>(type: string): Promise<T[]> {
      const repository = this.repositoryFactory.getRepository<T>(type);
      return repository.findAll();
    }
  
    async update<T extends object & { id: string }>(
      type: string,
      data: T,
      EntityClass: new (data: T) => T
    ): Promise<boolean> {
      const repository = this.repositoryFactory.getRepository<T>(type);
      const instance = new EntityClass(data);
      return repository.update(instance.id, instance, EntityClass);
    }
  
    async delete<T extends object & {id: string}>(type: string, id: string): Promise<boolean> {
      const repository = this.repositoryFactory.getRepository<T>(type);
      return repository.delete(id);
    }
  }
  