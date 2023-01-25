"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DEV_DB = _a.POSTGRES_DEV_DB, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV;
console.log(POSTGRES_HOST);
console.log(POSTGRES_USER);
console.log(ENV);
console.log(POSTGRES_DEV_DB);
console.log(POSTGRES_TEST_DB);
var Client;
if (ENV === 'dev') {
    try {
        Client = new pg_1.Pool({
            host: POSTGRES_HOST,
            database: POSTGRES_DEV_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD
        });
    }
    catch (error) {
        throw new Error("Can't connect to database ".concat(POSTGRES_DEV_DB));
    }
}
if (ENV === 'test') {
    try {
        Client = new pg_1.Pool({
            host: POSTGRES_HOST,
            database: POSTGRES_TEST_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD
        });
    }
    catch (error) {
        throw new Error("Can't connect to database ".concat(POSTGRES_TEST_DB));
    }
}
exports["default"] = Client;
