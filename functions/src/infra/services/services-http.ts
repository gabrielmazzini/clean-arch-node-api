/* eslint-disable max-len */
import {DocumentData} from "firebase-admin/firestore";
import {RepositoryFactory} from "../factorys/repository-factory";
/**
 */
export class ServiceHttp {
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
  async create<T extends DocumentData>(
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
  async read<T extends DocumentData>(
    type: string,
    id: string,
  ): Promise<T | null> {
    const repository = this.repositoryFactory.getRepository<T>(type);
    return repository.findById(id);
  }
  /**
   * @param {string} type
   * @return {T[]}
   */
  async readAll<T extends DocumentData>(type: string): Promise<T[]> {
    const repository = this.repositoryFactory.getRepository<T>(type);
    return repository.findAll();
  }
  /**
   * @param {string} type
   * @param {string} id
   * @param {T} data
   * @return {Promise<boolean>}
   */
  async update<T extends DocumentData>(
    type: string,
    id: string,
    data: T,
  ): Promise<boolean> {
    const repository = this.repositoryFactory.getRepository<T>(type);
    return repository.update(id, data);
  }
  /**
   * @param {string} type
   * @param {string} id
   * @return {Promise<boolean>}
   */
  async delete<T extends DocumentData>(
    type: string,
    id: string,
  ): Promise<boolean> {
    const repository = this.repositoryFactory.getRepository<T>(type);
    return repository.delete(id);
  }
}
