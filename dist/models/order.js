"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderStore = void 0;
// @ts-ignore
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders;';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Could not get orders Error: ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders WHERE id=($1);';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Could not find order ".concat(id, " Error: ").concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, order, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *;';
                        return [4 /*yield*/, conn.query(sql, [o.user_id, o.status])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        order = result.rows[0];
                        return [2 /*return*/, order];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Could not add a new order  ".concat(o.user_id, "  Error: ").concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.update = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'UPDATE orders SET user_id=($2), status=($3) WHERE id=($1) RETURNING *;';
                        return [4 /*yield*/, conn.query(sql, [o.id, o.user_id, o.status])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Could not update order  ".concat(o.user_id, "  Error: ").concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM orders WHERE id=($1);';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("Could not delete order  ".concat(id, " Error: ").concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.addProduct = function (quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersql, conn, result, order, err_1, sql, conn, result, order, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        ordersql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(ordersql, [orderId])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        if (order.status !== "active") {
                            throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, " because order status is ").concat(order.status));
                        }
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("".concat(err_1));
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 5:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [quantity, orderId, productId])];
                    case 6:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 7:
                        err_2 = _a.sent();
                        throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, ": ").concat(err_2));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getUserActiveOrder = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var order, userActiveOrder, ordersql, conn, result, err_3, sql, conn, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        ordersql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(ordersql, [userId, 'active'])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        if (order === undefined) {
                            throw new Error("Could not read user ".concat(userId, " active orders because order status isn't active "));
                        }
                        else {
                            console.log(" ***getUserActiveOrder: order_id: ".concat(order.id, ", status: ").concat(order.status, ", user_id ").concat(order.user_id, " "));
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("".concat(err_3));
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        sql = 'SELECT * FROM order_products WHERE order_id=($1)';
                        return [4 /*yield*/, database_1["default"].connect()
                            //@ts-ignore
                        ];
                    case 5:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [order.id])];
                    case 6:
                        result = _a.sent();
                        userActiveOrder = result.rows;
                        console.log("userActiveOrder: ".concat(userActiveOrder, " :: length ").concat(userActiveOrder.length));
                        conn.release();
                        if (userActiveOrder.length !== 0)
                            userActiveOrder.map(function (item) {
                                item.id = order.id;
                            });
                        return [2 /*return*/, userActiveOrder];
                    case 7:
                        err_4 = _a.sent();
                        throw new Error("Could not user ".concat(userId, " active order: ").concat(err_4));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
