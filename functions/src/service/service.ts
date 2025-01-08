/* eslint-disable max-len */
import {RepositoryFactory} from "./repository-factory";
/**
 */
export class Service {
  private repositoryFactory: RepositoryFactory;
  /**
   * @param {RepositoryFactory} repositoryFactory
   */
  constructor(repositoryFactory: RepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }
  /**
   * @param {string} type
   * @param {T} data
   * @return {Promise<boolean>}
   */
  async create<T extends {id: string}>(
    type: string,
    data: T,
  ): Promise<boolean> {
    const repository = this.repositoryFactory.getRepository<T>(type);
    return repository.create(data);
  }
  /**
   * @param {string} type
   * @param {string} id
   * @return {T | null}
   */
  async read<T extends {id: string}>(
    type: string,
    id: string,
  ): Promise<T | null> {
    const repository = this.repositoryFactory.getRepository<T>(type);
    console.log(repository.findById(id));
    return repository.findById(id);
  }
  /**
   * @param {string} type
   * @return {T[]}
   */
  async readAll<T extends {id: string}>(type: string): Promise<T[]> {
    const repository = this.repositoryFactory.getRepository<T>(type);
    return repository.findAll();
  }
  /**
   * @param {string} type
   * @param {T} data
   * @return {Promise<boolean>}
   */
  async update<T extends {id: string}>(
    type: string,
    data: T,
  ): Promise<boolean> {
    const repository = this.repositoryFactory.getRepository<T>(type);
    return repository.update(data.id, data);
  }
  /**
   * @param {string} type
   * @param {string} id
   * @return {Promise<boolean>}
   */
  async delete<T extends {id: string}>(
    type: string,
    id: string,
  ): Promise<boolean> {
    const repository = this.repositoryFactory.getRepository<T>(type);
    return repository.delete(id);
  }
}
