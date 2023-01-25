"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var order_1 = __importDefault(require("./api/handlers/order"));
var product_1 = __importDefault(require("./api/handlers/product"));
var user_1 = __importDefault(require("./api/handlers/user"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
app.use(body_parser_1["default"].json());
// enable cors
var corsOption = {
    optionsSuccessStatus: 200 // for some lagacy browsers
};
app.use((0, cors_1["default"])(corsOption));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
(0, order_1["default"])(app);
(0, product_1["default"])(app);
(0, user_1["default"])(app);
exports["default"] = app;
