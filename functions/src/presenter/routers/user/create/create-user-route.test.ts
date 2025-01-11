/* eslint-disable max-len */
import {describe, it, beforeEach, after, before} from "node:test";
import assert = require("node:assert");
import crypto = require("node:crypto");
import * as httpMocks from "node-mocks-http";
import {CreateUserRoute} from "./create-user-express-router";
import {User} from "../../../../domain/entity/user/UserEntity";
import {CreateUserUsecase} from "../../../../usecase/user/create/create-user-usecase";

describe("#Create user route", () => {
  const idFixed = "5c484254-c10c-43e6-b252-fcbe2a42c90e";
  const createUserUsecaseMock = {
    execute: async ({
      name,
      lastName,
      birthdate,
      cpf,
      email,
      address,
      typeUser,
    }: User) => {
      const user = User.create({
        name,
        lastName,
        birthdate,
        cpf,
        email,
        address,
        typeUser,
      });
      return {
        message: "Create User Success",
        id: user.id,
      };
    },
  };

  before(() => {
    crypto.randomUUID = () => idFixed;
  });

  after(async () => {
    crypto.randomUUID = (await import("node:crypto")).randomUUID;
  });

  let route: CreateUserRoute;

  beforeEach(() => {
    route = CreateUserRoute.create(
      createUserUsecaseMock as unknown as CreateUserUsecase,
    );
  });

  it("should return an object with message and id if user creation is successful", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/user",
      body: {
        name: "John",
        lastName: "Doe",
        birthdate: "1990-01-01",
        cpf: "405.967.938-04",
        email: "john.doe@example.com",
        address: {
          street: "Rua Exemplo",
          numberHome: "123",
          district: "Centro",
          state: "SP",
          city: "São Paulo",
          country: "Brasil",
        },
        typeUser: "admin",
      },
    });
    const res = httpMocks.createResponse();
    const handler = route.getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 201);
    const data = res._getData();
    const expected = {
      message: "Create User Success",
      id: "5c484254-c10c-43e6-b252-fcbe2a42c90e",
    };
    assert.deepStrictEqual(data, JSON.stringify(expected));
  });

  it("should return 500 for an unexpected error", async () => {
    const createUserUsecaseMock = {
      execute: async () => {
        throw new Error("Unexpected error");
      },
    };
    route = CreateUserRoute.create(
      createUserUsecaseMock as unknown as CreateUserUsecase,
    );
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/user",
      body: {
        name: "John",
        lastName: "Doe",
        birthdate: "1990-01-01",
        cpf: "405.967.938-04",
        email: "john.doe@example.com",
        address: {
          street: "Rua Exemplo",
          numberHome: "123",
          district: "Centro",
          state: "SP",
          city: "São Paulo",
          country: "Brasil",
        },
        typeUser: "admin",
      },
    });
    const res = httpMocks.createResponse();
    const handler = route.getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 500);
    const data = res._getJSONData();
    assert.strictEqual(data.message, "Unexpected error");
  });

  it("should return 400 if one or more fields are invalid", async () => {
    const createUserUsecaseMock = {
      execute: async ({
        name,
        lastName,
        birthdate,
        cpf,
        email,
        address,
        typeUser,
      }: User) => {
        const user = User.create({
          name,
          lastName,
          birthdate,
          cpf,
          email,
          address,
          typeUser,
        });
        return {
          message: "Create User Success",
          id: user.id,
        };
      },
    };
    route = CreateUserRoute.create(
      createUserUsecaseMock as unknown as CreateUserUsecase,
    );
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/user",
      body: {
        lastName: "Doe",
        birthdate: "1990-01-01",
        cpf: "405.967.938-04",
        email: "john.doe@example.com",
        address: {
          street: "Rua Exemplo",
          numberHome: "123",
          district: "Centro",
          state: "SP",
          city: "São Paulo",
          country: "Brasil",
        },
        typeUser: "admin",
      },
    });
    const res = httpMocks.createResponse();
    const handler = route.getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 400);
    const data = res._getData();
    const expected = {name: "name is a required field"};
    assert.strictEqual(data, JSON.stringify(expected));
  });

  it("should return 400 if birthdate is invalid", async () => {
    const createUserUsecaseMock = {
      execute: async ({
        name,
        lastName,
        birthdate,
        cpf,
        email,
        address,
        typeUser,
      }: User) => {
        const user = User.create({
          name,
          lastName,
          birthdate,
          cpf,
          email,
          address,
          typeUser,
        });
        return {
          message: "Create User Success",
          id: user.id,
        };
      },
    };
    route = CreateUserRoute.create(
      createUserUsecaseMock as unknown as CreateUserUsecase,
    );
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/user",
      body: {
        name: "Joe",
        lastName: "Doe",
        birthdate: "1231241241241",
        cpf: "405.967.938-04",
        email: "john.doe@example.com",
        address: {
          street: "Rua Exemplo",
          numberHome: "123",
          district: "Centro",
          state: "SP",
          city: "São Paulo",
          country: "Brasil",
        },
        typeUser: "admin",
      },
    });
    const res = httpMocks.createResponse();
    const handler = route.getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 400);
    const data = res._getData();
    const expected = {message: "Invalid date format"};
    assert.strictEqual(data, JSON.stringify(expected));
  });

  it("should return 400 if birthdate is in the future", async () => {
    const createUserUsecaseMock = {
      execute: async ({
        name,
        lastName,
        birthdate,
        cpf,
        email,
        address,
        typeUser,
      }: User) => {
        const user = User.create({
          name,
          lastName,
          birthdate,
          cpf,
          email,
          address,
          typeUser,
        });
        return {
          message: "Create User Success",
          id: user.id,
        };
      },
    };
    route = CreateUserRoute.create(
      createUserUsecaseMock as unknown as CreateUserUsecase,
    );
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/user",
      body: {
        name: "Joe",
        lastName: "Doe",
        birthdate: "2030-01-01",
        cpf: "405.967.938-04",
        email: "john.doe@example.com",
        address: {
          street: "Rua Exemplo",
          numberHome: "123",
          district: "Centro",
          state: "SP",
          city: "São Paulo",
          country: "Brasil",
        },
        typeUser: "admin",
      },
    });
    const res = httpMocks.createResponse();
    const handler = route.getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 400);
    const data = res._getData();
    const expected = {message: "Invalid date of birth"};
    assert.strictEqual(data, JSON.stringify(expected));
  });

  it("should return 400 if cpf is invalid", async () => {
    const createUserUsecaseMock = {
      execute: async ({
        name,
        lastName,
        birthdate,
        cpf,
        email,
        address,
        typeUser,
      }: User) => {
        const user = User.create({
          name,
          lastName,
          birthdate,
          cpf,
          email,
          address,
          typeUser,
        });
        return {
          message: "Create User Success",
          id: user.id,
        };
      },
    };
    route = CreateUserRoute.create(
      createUserUsecaseMock as unknown as CreateUserUsecase,
    );
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/user",
      body: {
        name: "Joe",
        lastName: "Doe",
        birthdate: "1990-01-01",
        cpf: "123.234.571-04",
        email: "john.doe@example.com",
        address: {
          street: "Rua Exemplo",
          numberHome: "123",
          district: "Centro",
          state: "SP",
          city: "São Paulo",
          country: "Brasil",
        },
        typeUser: "admin",
      },
    });
    const res = httpMocks.createResponse();
    const handler = route.getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 400);
    const data = res._getData();
    const expected = {message: "Invalid CPF"};
    assert.strictEqual(data, JSON.stringify(expected));
  });

  it("should return 400 if email is invalid", async () => {
    const createUserUsecaseMock = {
      execute: async ({
        name,
        lastName,
        birthdate,
        cpf,
        email,
        address,
        typeUser,
      }: User) => {
        const user = User.create({
          name,
          lastName,
          birthdate,
          cpf,
          email,
          address,
          typeUser,
        });
        return {
          message: "Create User Success",
          id: user.id,
        };
      },
    };
    route = CreateUserRoute.create(
      createUserUsecaseMock as unknown as CreateUserUsecase,
    );
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/user",
      body: {
        name: "Joe",
        lastName: "Doe",
        birthdate: "1990-01-01",
        cpf: "405.967.938-04",
        email: "gabriel@.com",
        address: {
          street: "Rua Exemplo",
          numberHome: "123",
          district: "Centro",
          state: "SP",
          city: "São Paulo",
          country: "Brasil",
        },
        typeUser: "admin",
      },
    });
    const res = httpMocks.createResponse();
    const handler = route.getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 400);
    const data = res._getData();
    const expected = {message: "Invalid email"};
    assert.strictEqual(data, JSON.stringify(expected));
  });
});
