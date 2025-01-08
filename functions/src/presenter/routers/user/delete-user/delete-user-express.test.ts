/* eslint-disable max-len */
import {describe, it, beforeEach} from "node:test";
import assert = require("node:assert");
import {DeleteUserUsecase} from "../../../../usecase/user/delete-user/delete-user-usecase";
import {DeleteUserRoute} from "./delete-user-express-route";
import * as httpMocks from "node-mocks-http";
import {ErrorUserNotFound} from "../../../../errors/errors";

describe("#Delete user route", () => {
  const deleteUserUsecaseMock = {
    execute: async ({id}: {id: string}) => {
      if (id === "1") {
        return true;
      }
      throw new ErrorUserNotFound("User not found");
    },
  };

  let route: DeleteUserRoute;

  beforeEach(() => {
    route = DeleteUserRoute.create(
      deleteUserUsecaseMock as unknown as DeleteUserUsecase,
    );
  });

  it("should return 200 if successful", async () => {
    const req = httpMocks.createRequest({
      method: "DELETE",
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
    const expected = true;
    assert.deepStrictEqual(data, expected);
  });

  it("should return 404 when user is not found", async () => {
    const req = httpMocks.createRequest({
      method: "DELETE",
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
    route = DeleteUserRoute.create(
      getUserUsecaseErrorMock as unknown as DeleteUserUsecase,
    );
    const req = httpMocks.createRequest({
      method: "DELETE",
      url: "/user/3",
      params: {
        id: "1",
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
