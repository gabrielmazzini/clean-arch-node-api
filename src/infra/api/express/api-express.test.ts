import { describe, it } from 'node:test';
import assert from 'node:assert';
import httpMocks from 'node-mocks-http';
import { ApiExpress } from './api-express';
import { HttpMethod } from '../../../presenter/routers/routes';

class MockRoute {
  getPath() {
    return "/mock";
  }

  getMethod() {
    return HttpMethod.GET;
  }

  getHandler() {
    return async (req: any, res: any) => {
      res.status(200).json({ message: "Mock route works!" });
    };
  }
}

describe("ApiExpress Tests with node-mocks-http", () => {
  const routes = [new MockRoute()];
  const app = ApiExpress.create(routes);

  it("should return 200 and the correct response from /mock route", async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/mock',
    });
    const res = httpMocks.createResponse();
    const handler = routes[0].getHandler();
    await handler(req, res);
    assert.strictEqual(res.statusCode, 200);
    const data = res._getJSONData();
    assert.strictEqual(data.message, "Mock route works!");
  });
});
