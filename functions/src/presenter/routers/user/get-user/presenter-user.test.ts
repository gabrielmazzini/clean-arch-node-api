/* eslint-disable max-len */
import {describe, it, beforeEach} from "node:test";
import assert = require("node:assert");
import {GetUserUsecase} from "../../../../usecase/user/list-user/list-user-usecase";
import {GetUsersRoute} from "./get-user-express-route";
import * as httpMocks from "node-mocks-http";
import {ErrorUserNotFound} from "../../../../errors/errors";

describe("#Get user route", () => {
  const getUserUsecaseMock = {
    execute: async ({id}: {id: string}) => {
      if (id === "1") {
        return {
          id: "1",
          name: "John",
          lastName: "Doe",
          birthdate: "1990-01-01",
          cpf: "123.456.789-00",
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
        };
      }
      throw new ErrorUserNotFound("User not found");
    },
  };

  let route: GetUsersRoute;

  beforeEach(() => {
    route = GetUsersRoute.create(
      getUserUsecaseMock as unknown as GetUserUsecase,
    );
  });

  it("should return 200 and user data when user is found", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/user/1",
      params: {
        id: "1",
      },
    });
    const res = httpMocks.createResponse();
    const handler = route.getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 200);
    const data = res._getJSONData();
    const expected = {
      id: "1",
      name: "John",
      lastName: "Doe",
      birthdate: "1990-01-01",
      cpf: "123.456.789-00",
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
    };
    assert.deepStrictEqual(data, expected);
  });

  it("should return 404 when user is not found", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/user/2",
      params: {
        id: "2",
      },
    });
    const res = httpMocks.createResponse();
    const handler = route.getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 404);
    const data = res._getJSONData();
    assert.strictEqual(data.message, "User not found");
  });

  it("should return 500 for an unexpected error", async () => {
    const getUserUsecaseErrorMock = {
      execute: async () => {
        throw new Error("Unexpected error");
      },
    };
    route = GetUsersRoute.create(
      getUserUsecaseErrorMock as unknown as GetUserUsecase,
    );
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/user/3",
      params: {
        id: "3",
      },
    });
    const res = httpMocks.createResponse();
    const handler = route.getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 500);
    const data = res._getJSONData();
    assert.strictEqual(data.message, "Unexpected error");
  });
});
