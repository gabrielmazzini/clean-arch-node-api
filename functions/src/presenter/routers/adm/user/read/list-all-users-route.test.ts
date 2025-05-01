/* eslint-disable max-len */
import {describe, it, beforeEach} from "node:test";
import assert = require("node:assert");
import {GetAllUsersUsecase} from "../../../../../usecase/adm/user/read/list-all-users-usecase";
import {GetAllUsersRoute} from "./list-all-users-route";
import * as httpMocks from "node-mocks-http";

describe("#Adm route", () => {
  let route: GetAllUsersRoute;

  describe("list all users", () => {
    const getAllUsersUsecaseMock = {
      execute: () => {
        return [
          {
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
          },
          {
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
          },
        ];
      },
    };

    beforeEach(() => {
      route = GetAllUsersRoute.create(
        getAllUsersUsecaseMock as unknown as GetAllUsersUsecase,
      );
    });

    it("should return the user list if it exists", async () => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/user",
      });
      const res = httpMocks.createResponse();
      const handler = route.getHandler();
      await handler(req, res);
      assert.strictEqual(res.statusCode, 200);
      const data = res._getJSONData();
      const expected = [
        {
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
        },
        {
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
        },
      ];
      assert.deepStrictEqual(data, expected);
    });
  });

  describe("List empty array if users empty", () => {
    const getAllUsersUsecaseMock = {
      execute: () => {
        return [];
      },
    };

    beforeEach(() => {
      route = GetAllUsersRoute.create(
        getAllUsersUsecaseMock as unknown as GetAllUsersUsecase,
      );
    });

    it("should return an empty array if there are no users", async () => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/user",
      });
      const res = httpMocks.createResponse();
      const handler = route.getHandler();
      await handler(req, res);
      assert.strictEqual(res.statusCode, 200);
      const data = res._getJSONData();
      const expected: [] = [];
      assert.deepStrictEqual(data, expected);
    });
  });
});
