"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var verifyAuthToken = function (req, res, next) {
    try {
        // console.log(` userStoreHandler:verifyAuthToken `)
        var authorizationHeader = req.headers.authorization;
        // @ts-ignore
        var token = authorizationHeader.split(' ')[1].replace(/['"]+/g, '');
        // console.log(` userStoreHandler:verifyAuthToken Autenticate token ${token}, Secret ${process.env.TOKEN_SECRET}`)
        // console.log(` userStoreHandler:verifyAuthToken body token ${req.body.token}, Secret ${process.env.TOKEN_SECRET}`)
        // jwt.verify(req.body.token, process.env.TOKEN_SECRET)
        // @ts-ignores
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        // console.log(` userStoreHandler:verifyAuthToken token ${token} verification done`)
        res.locals.userData = decoded;
        next();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
};
exports.verifyAuthToken = verifyAuthToken;
