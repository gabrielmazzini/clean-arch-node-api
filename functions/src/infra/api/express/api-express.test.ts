/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {describe, it} from "node:test";
import assert = require("node:assert");
import * as httpMocks from "node-mocks-http";
import {HttpMethod} from "../../../presenter/routers/routes";
/**
 */
class MockRoute {
  /**
   * @return {string}
   */
  getPath() {
    return "/mock";
  }
  /**
   * @return {HttpMethod}
   */
  getMethod() {
    return HttpMethod.GET;
  }
  /**
   * @return {function}
   */
  getHandler() {
    return async (req: any, res: any) => {
      res.status(200).json({message: "Mock route works!"});
    };
  }
}

describe("ApiExpress Tests with node-mocks-http", () => {
  const routes = [new MockRoute()];

  it("should return 200 and the correct response from /mock route", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/mock",
    });
    const res = httpMocks.createResponse();
    const handler = routes[0].getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 200);
    const data = res._getJSONData();
    assert.strictEqual(data.message, "Mock route works!");
  });
});
