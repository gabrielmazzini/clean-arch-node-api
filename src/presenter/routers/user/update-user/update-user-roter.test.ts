import { describe, it, beforeEach} from "node:test";
import assert from "node:assert";
import { UpdateUserUsecase } from "../../../../usecase/user/update-user/update-user-usecase";
import { UpdateUserRoute } from "./update-user-router-express";
import * as httpMocks from "node-mocks-http";
import { ErrorUserNotFound } from "../../../../errors/errors";

describe("#Update user route", () => {
    const updateUserUsecaseMock = {
      execute: async ({id}: {id: string}) => {
        if (id === '1') {
          return true;
        };
        throw new ErrorUserNotFound('User not found');
      },
    };

    let route: UpdateUserRoute;
  
    beforeEach(() => {
      route = UpdateUserRoute.create(updateUserUsecaseMock as unknown as UpdateUserUsecase);
    });
  
    it('should return 200 if successful', async () => {
      const req = httpMocks.createRequest({
        method: 'PUT',
        url: '/user/1',
        params: {
          id: '1',
        },
        body: {
            name: 'John',
            lastName: 'John',
            birthdate: "12/02/1992",
            cpf: "405.967.938-04",
            email: "gabriel@gabriel.com",
        },
      });
      const res = httpMocks.createResponse();
      const handler = route.getHandler();
      await handler(req, res);
      assert.strictEqual(res.statusCode, 200);
      const data = res._getJSONData();
      const expected = true;
      assert.deepStrictEqual(data, expected);
    });
  
    it('should return 404 when user is not found', async () => {
      const req = httpMocks.createRequest({
        method: 'PUT',
        url: '/user/2',
        params: {
          id: '2',
        },
        body: {
            name: 'John',
            lastName: 'John',
            birthdate: "12/02/1992",
            cpf: "405.967.938-04",
            email: "gabriel@gabriel.com",
        },
      });
      const res = httpMocks.createResponse();
      const handler = route.getHandler();
      await handler(req, res);
      assert.strictEqual(res.statusCode, 404);
      const data = res._getJSONData();
      assert.strictEqual(data.message, 'User not found');
    });
  
    it('should return 500 for an unexpected error', async () => {
      const getUserUsecaseErrorMock = {
        execute: async () => {
          throw new Error('Unexpected error');
        },
      };
      route = UpdateUserRoute.create(getUserUsecaseErrorMock as unknown as UpdateUserUsecase);
      const req = httpMocks.createRequest({
        method: 'PUT',
        url: '/user/3',
        params: {
          id: '3',
        },
        body: {
            name: 'John',
            lastName: 'John',
            birthdate: "12/02/1992",
            cpf: "405.967.938-04",
            email: "gabriel@gabriel.com",
        },
      });
      const res = httpMocks.createResponse();
      const handler = route.getHandler();
      await handler(req, res);
      assert.strictEqual(res.statusCode, 500);
      const data = res._getJSONData();
      assert.strictEqual(data.message, 'Unexpected error');
    });
});



