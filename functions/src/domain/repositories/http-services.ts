/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHttpService<T> {
  create(data: T): Promise<boolean>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, input: Partial<T>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
