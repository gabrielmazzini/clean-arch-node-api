"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const routes_1 = require("../../../presenter/routers/routes");
class MockRoute {
    getPath() {
        return "/mock";
    }
    ;
    getMethod() {
        return routes_1.HttpMethod.GET;
    }
    ;
    getHandler() {
        return async (req, res) => {
            res.status(200).json({ message: "Mock route works!" });
        };
    }
    ;
}
;
(0, node_test_1.describe)("ApiExpress Tests with node-mocks-http", () => {
    const routes = [new MockRoute()];
    (0, node_test_1.it)("should return 200 and the correct response from /mock route", async () => {
        const req = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/mock',
        });
        const res = node_mocks_http_1.default.createResponse();
        const handler = routes[0].getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 200);
        const data = res._getJSONData();
        node_assert_1.default.strictEqual(data.message, "Mock route works!");
    });
});
